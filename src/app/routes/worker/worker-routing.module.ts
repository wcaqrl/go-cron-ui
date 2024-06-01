import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerListComponent } from './list/list.component';

const routes: Routes = [

  { path: 'list', component: WorkerListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkerRoutingModule { }
