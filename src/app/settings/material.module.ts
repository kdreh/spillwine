import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

const materialMod = [MatButtonModule]

@NgModule({
    imports: materialMod,
    exports: materialMod
})

export class MaterialModule {}