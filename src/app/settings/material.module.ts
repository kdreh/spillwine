import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
const materialMod = [MatButtonModule, LayoutModule, MatToolbarModule,MatSidenavModule,MatIconModule,MatListModule]

@NgModule({
    imports: materialMod,
    exports: materialMod
})

export class MaterialModule {}