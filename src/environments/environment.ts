// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { DelonMockModule } from '@delon/mock';
import { Environment } from '@delon/theme';
import * as MOCKDATA from '../../_mock';

export const environment = {
  production: false,
  useHash: true,
  api: {
    baseUrl: 'http://cron.tv-monitor.funshion.com',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh',
  },
  modules: [DelonMockModule.forRoot({ data: MOCKDATA })],
} as Environment;
