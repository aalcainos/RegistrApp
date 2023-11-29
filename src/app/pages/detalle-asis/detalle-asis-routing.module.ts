import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleAsisPage } from './detalle-asis.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleAsisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleAsisPageRoutingModule {}
