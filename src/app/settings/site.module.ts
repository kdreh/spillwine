import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

const siteModule = [ FlexLayoutModule]

@NgModule({
    imports: siteModule,
    exports: siteModule
})

export class SiteModule {}