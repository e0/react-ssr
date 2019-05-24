import { existsSync } from 'fs';
import {
  sep,
  resolve,
} from 'path';

const cwd: string = process.cwd();

export const getEngine = (): 'jsx'|'tsx' => {
  if (existsSync(resolve(cwd, 'tsconfig.json'))) {
    return 'tsx';
  }
  return 'jsx';
};

export const getPagePath = (file: string, viewsDir: string): string => {
  return file.split(sep + viewsDir + sep)[1];
};

export const hasUserBabelrc = (): boolean => {
  return existsSync(resolve(cwd, '.babelrc')) || existsSync(resolve(cwd, '.babelrc.js')) || existsSync(resolve(cwd, 'babel.config.js'));
};

export const getBabelrc = (): string => {
  if (existsSync(resolve(cwd, '.babelrc'))) return resolve(cwd, '.babelrc');
  if (existsSync(resolve(cwd, '.babelrc.js'))) return resolve(cwd, '.babelrc.js');
  if (existsSync(resolve(cwd, 'babel.config.js'))) return resolve(cwd, 'babel.config.js');
  return resolve(__dirname, '../babel.config.default.js');
};

export const getBabelRule = () => {
  return {
    test: /\.(js|ts)x?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        extends: getBabelrc(),
      },
    },
  };
};