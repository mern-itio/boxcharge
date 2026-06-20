/** PM2 process file — run: pm2 start ecosystem.config.cjs */
module.exports = {
  apps: [
    {
      name: "boxcharge",
      script: "scripts/start-production.mjs",
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOST: "127.0.0.1",
      },
    },
  ],
};
