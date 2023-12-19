module.exports = {
  apps: [
    {
      script: "npm start",
    },
  ],

  deploy: {
    production: {
      key: "nextjsnVirg.pem",
      user: "ubuntu",
      host: "34.207.62.231",
      ref: "origin/main",
      repo: "https://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@github.com/jonathan-dignite/MaidSimpl-Web.git",
      path: "/home/ubuntu",
      "pre-deploy-local": "",
      "post-deploy":
        "source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
      ssh_options: "ForwardAgent=yes",
    },
  },
};
