import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleAsisPageRoutingModule } from './detalle-asis-routing.module';

import { DetalleAsisPage } from './detalle-asis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleAsisPageRoutingModule
  ],
  declarations: [DetalleAsisPage]
})
export class DetalleAsisPageModule {}
