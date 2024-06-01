import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfAddComponent } from './add/add.component';
import { ConfListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'add', component: ConfAddComponent },
  { path: 'list', component: ConfListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfRoutingModule { }
