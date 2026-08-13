module.exports = {
  apps: [
    {
      name: "zhizhi",
      script: "dist/standalone/server.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        HOST: "127.0.0.1",
        PORT: "3000",
      },
    },
  ],
};
