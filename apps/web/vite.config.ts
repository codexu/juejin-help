import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import viteSvgIcons from 'vite-plugin-svg-icons';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import viteCompression from 'vite-plugin-compression';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';

import { resolve } from 'path';

export default ({ mode }) => {
  return defineConfig({
    plugins: [
      vue(),
      viteCompression(),
      AutoImport({ dts: './auto-imports.d.ts', imports: ['vue'] }),
      viteSvgIcons({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      vueSetupExtend(),
      Pages(),
      Layouts({ defaultLayout: 'default/index' }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    base: loadEnv(mode, process.cwd()).VITE_PUBLIC_PATH,
    server: {
      port: 8080,
      open: true,
      cors: true,
    },
  });
};
