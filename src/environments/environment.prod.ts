import { Environment } from '@delon/theme';

export const environment = {
  production: true,
  useHash: true,
  api: {
    baseUrl: 'http://cron.tv-monitor.funshion.com',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh',
  },
} as Environment;
