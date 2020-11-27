import resolve from '@rollup/plugin-node-resolve'
import copy from 'rollup-plugin-copy'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'


export default {
	input: 'src/index.ts',
	output: { dir: 'dist', format: 'es' },
	plugins: [
		
		resolve(),
		json({compact: true}),
		typescript(),
		copy( {targets: [ { src: 'assets/i18n', dest: 'dist/assets/' } ] } )
	]
}