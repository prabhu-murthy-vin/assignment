import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        include: ['tests/**/*.{test,spec}.ts', 'src/**/*.{test,spec}.ts'],
        exclude: ['node_modules', 'dist', '.next'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],
            include: ['src/**/*.ts'],
            exclude: ['src/**/*.d.ts', 'src/index.ts', 'tests/**/*'],
            lines: 70,
            functions: 70,
            branches: 70,
            statements: 70,
        },
        setupFiles: ['./tests/setup.ts'],
    },
});
