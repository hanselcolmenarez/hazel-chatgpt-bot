module.exports = {
    apps: [
      {
        name: 'hazel-chatgpt-bot',
        script: 'npm',
        args: 'start',
        env: {
          PORT: 3000,
          HTTPS: true,
        },
      },
    ],
  };
  