import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, concat, timer } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, tap, shareReplay, concatMap, filter, retry, retryWhen, delayWhen, delay } from 'rxjs/operators';

@Injectable()
export class FeatureFlagService {
    private url = environment.apiUrl + '/application-environment/st/feature-set';
    private obs: Observable<string[]>;

    constructor(private httpClient: HttpClient) {}

    public HasFeatureFlag(featureFlagName: string): Observable<boolean> {
        return this.GetFeatureSet().pipe(
            tap(console.log),
            filter(ffSet => Array.isArray(ffSet)),
            map(ffSet => ffSet.some(ff => ff === featureFlagName))
        );
    }

    private GetFeatureSet(): Observable<string[]> {
        if (!this.obs) {
            this.obs = concat(
                this.FeatureSet(),
                timer(0, 1).pipe(
                    concatMap(_ => this.FeatureSetWait())
                )
            ).pipe(
                retryWhen(errors => errors.pipe(delay(5000))),
                shareReplay(1)
            );
        }
        return this.obs;
    }

    private FeatureSet(): Observable<string[]> {
        return this.httpClient.get<string[]>(this.url);
    }

    private FeatureSetWait(): Observable<string[]> {
        return this.httpClient.get<string[]>(this.url, {params: {wait: 'true'}});
    }
}
