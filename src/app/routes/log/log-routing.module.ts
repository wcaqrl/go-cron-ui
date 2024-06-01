import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogListComponent as HttpLogListComponent } from './http/list/list.component';
import { LogListComponent as JobLogListComponent } from './job/list/list.component';

const routes: Routes = [
  { path: 'job', component: JobLogListComponent },
  { path: 'http', component: HttpLogListComponent },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }
