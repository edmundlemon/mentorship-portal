import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

// Note: The frontend React application is now in the ./frontend directory
// This Vite config is only for Laravel's resources (if any traditional blade views exist)
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css'],
            refresh: true,
        }),
    ],
});
