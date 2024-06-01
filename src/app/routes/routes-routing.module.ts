import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JWTGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutBasicComponent } from '../layout/basic/basic.component';
import { LayoutBlankComponent } from '../layout/blank/blank.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [JWTGuard],
    data: {},
    children: [
      { path: '', redirectTo: '/worker', pathMatch: 'full' },
      { path: 'worker', loadChildren: () => import('./worker/worker.module').then((m) => m.WorkerModule) },
      { path: 'conf', loadChildren: () => import('./conf/conf.module').then((m) => m.ConfModule) },
      { path: 'job', loadChildren: () => import('./job/job.module').then((m) => m.JobModule) },
      { path: 'log', loadChildren: () => import('./log/log.module').then((m) => m.LogModule) },
    ],
  },
  // passport
  { path: '', loadChildren: () => import('./passport/passport.module').then((m) => m.PassportModule) },
  { path: 'exception', loadChildren: () => import('./exception/exception.module').then((m) => m.ExceptionModule) },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
