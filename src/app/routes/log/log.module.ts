import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { LogListComponent as HttpLogListComponent } from './http/list/list.component';
import { LogListComponent as JobLogListComponent } from './job/list/list.component';
import { LogRoutingModule } from './log-routing.module';

const COMPONENTS: Type<void>[] = [
  JobLogListComponent,
  HttpLogListComponent,
];

@NgModule({
  imports: [
    SharedModule,
    LogRoutingModule
  ],
  declarations: COMPONENTS,
})
export class LogModule { }
