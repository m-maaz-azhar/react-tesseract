import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: true
    },
    plugins: [
        json(),
        resolve({
            browser: true,
            preferBuiltins: false,
        }),
        commonjs({
            include: /node_modules/,
            transformMixedEsModules: true,
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: ['@babel/preset-env', '@babel/preset-react']
        }),
    ],
    external: ['react'],
    context: 'this'
};