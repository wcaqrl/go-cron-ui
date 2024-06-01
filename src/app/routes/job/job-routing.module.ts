import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobAddComponent } from './add/add.component';
import { JobListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'list', component: JobListComponent },
  { path: 'add', component: JobAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
