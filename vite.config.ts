import {defineConfig} from 'vite';
// import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import {AlkordMappings} from './tasks';
import {splitVendorChunkPlugin} from 'vite';
import {visualizer} from 'rollup-plugin-visualizer';
import path from 'path';
import swc from 'unplugin-swc';
import {swcReactRefresh} from 'vite-plugin-swc-react-refresh';

export default ({mode}) => {
  const modeConfig = mode.split('.');
  const project = modeConfig[0];
  const isDevelopment = (modeConfig.length > 1) && (modeConfig[1] === 'dev');

  AlkordMappings.generate();

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [
      // react({
      //   fastRefresh: true,
      //   babel: {
      //     plugins: [
      //       'babel-plugin-transform-typescript-metadata',
      //       ['@babel/plugin-proposal-decorators', {'legacy': true}],
      //       ['@babel/plugin-proposal-class-properties', {'loose': true}],
      //     ],
      //     parserOpts: {
      //       plugins: ['decorators-legacy'],
      //     },
      //   },
      // }),
      checker({
        typescript: {
          root: path.resolve('.'),
          buildMode: true,
          tsconfigPath: path.resolve(`./apps/${project}/tsconfig.json`),
        },
        enableBuild: false,
        overlay: {
          position: 'tr',
        },
        eslint: {
          lintCommand: `eslint "${path.resolve('.')}/{libs,apps}/**/*.{ts,tsx}"`,
        },
      }),
      !isDevelopment && splitVendorChunkPlugin(),
      !isDevelopment && visualizer(),
      swc.vite({
        jsc: {
          parser: /** @type { import('@swc/core/types').TsParserConfig } */ {
            syntax: 'typescript',
            tsx: true,
            dynamicImport: true,
            decorators: true,
          },
          externalHelpers: false, // TODO voltar para true
          loose: false,
          target: 'es5',
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
            react: {
              runtime: 'classic',
              development: true,
              refresh: false,
            },
          },
        },
      }),
      swcReactRefresh(),
    ].filter(Boolean),
    publicDir: path.resolve(`./apps/${project}/public`),
    server: {
      port: 3000,
      hmr: true,
    },
    resolve: {
      dedupe: AlkordMappings.getDependencies(),
      // dedupe: [
      //   'react',
      //   'react-dom',
      //   'react-router-dom',
      //   'react-router-cache-route',
      //   '@material-ui/core',
      //   '@material-ui/pickers',
      //   '@material-ui/lab',
      //   '@material-ui/styles',
      //   '@material-ui/icons',
      // ],
      alias: [
        ...Object.entries(AlkordMappings.getAlias(project)).map((alias) => ({
          find: alias[0],
          replacement: alias[1],
        })),
        {find: 'lodash', replacement: 'lodash-es'},
      ],
    },
    optimizeDeps: {
      include: [
        // ...AlkordMappings.getDependencies(),
      ],
    },
    esbuild: {
      jsx: 'automatic',
    },
    build: {
      target: 'es5',
      outDir: 'build',
      rollupOptions: {
        external: [
          './libs/*',
        ],
      },
    },
  });
};

