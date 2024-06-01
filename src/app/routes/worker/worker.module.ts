import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { WorkerRoutingModule } from './worker-routing.module';
import { WorkerListComponent } from './list/list.component';

const COMPONENTS: Type<void>[] = [
  WorkerListComponent];

@NgModule({
  imports: [
    SharedModule,
    WorkerRoutingModule
  ],
  declarations: COMPONENTS,
})
export class WorkerModule { }
