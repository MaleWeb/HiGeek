import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  favicon: '/favicon.ico',
  history: { type: 'hash' },
  publicPath: './',
});
