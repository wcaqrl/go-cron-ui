import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { JobAddComponent } from './add/add.component';
import { JobEditComponent } from './edit/edit.component';
import { JobRoutingModule } from './job-routing.module';
import { JobListComponent } from './list/list.component';

const COMPONENTS: Type<void>[] = [
  JobListComponent,
  JobEditComponent,
  JobAddComponent,
];

@NgModule({
  imports: [
    SharedModule,
    JobRoutingModule,
    NzPaginationModule,
  ],
  declarations: COMPONENTS,
})
export class JobModule { }
