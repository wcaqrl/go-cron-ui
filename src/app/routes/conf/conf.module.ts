import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { ConfAddComponent } from './add/add.component';
import { ConfRoutingModule } from './conf-routing.module';
import { ConfEditComponent } from './edit/edit.component';
import { ConfListComponent } from './list/list.component';

const COMPONENTS: Type<void>[] = [
  ConfEditComponent,
  ConfAddComponent,
  ConfListComponent];

@NgModule({
  imports: [
    SharedModule,
    ConfRoutingModule
  ],
  declarations: COMPONENTS,
})
export class ConfModule { }
