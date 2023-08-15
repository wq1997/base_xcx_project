module.exports = {
    env: {
        NODE_ENV: '"development"'
    },
    defineConstants: {},
    mini: {},
    h5: {},
    weapp: {
        module: {
          postcss: {
            autoprefixer: {
              enable: true
            },
            url: {
              enable: true,
              config: {
                limit: 10240
              }
            }
          }
        }
    },
};
