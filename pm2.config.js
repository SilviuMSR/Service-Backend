module.exports = {
    apps: process.env.NODE_ENV === 'prod' ? [
        {
            name: 'service',
            script: 'app.js',
            watch: false,
            env: {
                PORT: 9000,
                NODE_ENV: 'prod'
            }
        }
    ] : [
            {
                name: 'service',
                script: 'app.js',
                node_args: [
                    '--inspect=0.0.0.0:9696'
                ],
                watch: true,
                watch_options: {
                    usePolling: true
                },
                ignore_watch: [
                    'node_modules',
                    'package-lock.json',
                    '.history',
                    'files',
                    'nginx',
                    '.dockerignore'
                ],
                env: {
                    PORT: 9000,
                    NODE_ENV: 'dev'
                }
            }]
}