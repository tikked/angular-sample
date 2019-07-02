import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { FeatureFlagService } from './feature-flag.service';

@Directive({selector: '[ff]'})
export class FfDirective {
    private hasView = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private featureFlagService: FeatureFlagService) {}

    @Input() set ff(flagName: string) {
        this.featureFlagService.HasFeatureFlag(flagName).subscribe(res => {
            if (res && !this.hasView) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.hasView = true;
              } else if (!res && this.hasView) {
                this.viewContainer.clear();
                this.hasView = false;
              }
        })
    }
}
