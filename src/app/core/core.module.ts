import { NgModule } from '@angular/core';
import { FeatureFlagModule } from '../feature-flag/feature-flag.module';

@NgModule({
    imports: [
        FeatureFlagModule
    ],
    exports: [
        FeatureFlagModule
    ]
})
export class CoreModule {}
