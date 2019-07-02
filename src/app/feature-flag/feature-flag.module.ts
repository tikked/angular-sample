import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FfDirective } from './ff.directive';
import { FeatureFlagService } from './feature-flag.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    declarations: [
        FfDirective
    ],
    providers: [
        FeatureFlagService
    ],
    exports: [
        FfDirective
    ]
})
export class FeatureFlagModule {}
