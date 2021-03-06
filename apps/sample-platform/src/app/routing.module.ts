import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tests',
    loadChildren: () =>
      import('@new-sample-platform/frontend/regression-test').then(
        (mod) => mod.FrontendRegressionTestModule
      ),
  },
  {
    path: 'samples',
    loadChildren: () =>
      import('@new-sample-platform/frontend/samples').then(
        (mod) => mod.FrontendSamplesModule
      ),
  },
  {
    path: 'test-entry',
    loadChildren: () =>
      import('@new-sample-platform/frontend/test-entry').then(
        (mod) => mod.FrontendTestEntryModule
      ),
  },
  {
    path: 'test-runs',
    loadChildren: () =>
      import('@new-sample-platform/frontend/test-runs').then(
        (mod) => mod.FrontendTestRunsModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class RoutingModule {}
