import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.tsx'), // Path to your entry file
			name: 'bricks', // Library name
			formats: ['es', 'umd', 'cjs'],

			fileName: format => `bricks.${format}.js`,
		},
		rollupOptions: {
			// Externalize deps that shouldn't be bundled into the library
			external: [
				'react',
				'react-dom',
				'@mui/material',
				'@emotion/react',
				'@emotion/styled',
			],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'@mui/material': '@mui/material',
					'@emotion/react': '@emotion/react',
					'@emotion/styled': '@emotion/styled',
				},
			},
		},
	},
});
