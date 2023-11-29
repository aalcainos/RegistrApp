import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisAsisPage } from './vis-asis.page';

const routes: Routes = [
  {
    path: '',
    component: VisAsisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisAsisPageRoutingModule {}
