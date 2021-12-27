import svelte from 'rollup-plugin-svelte';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.js',
    output: {
		sourcemap: true,
		name: 'app',
        format: 'iife',
        file: 'public/bundle.js'
    },
    plugins: [
        svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			},
            preprocess: sveltePreprocess({
                sourceMap: !production,
				postcss: {
					plugins: [require('tailwindcss')(), require('autoprefixer')()],
				},
            }),
        }),
		
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

        // In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve('public'),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
    ],
    watch: {
        include: ['src/**'],
        clearScreen: false
    }
};