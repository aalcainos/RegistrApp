import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisAsisPageRoutingModule } from './vis-asis-routing.module';

import { VisAsisPage } from './vis-asis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisAsisPageRoutingModule
  ],
  declarations: [VisAsisPage]
})
export class VisAsisPageModule {}
