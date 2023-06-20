// * Every now and then, take best practices from CRA
// * https://tinyurl.com/yakv4ggx

const targets = 'maintained node versions or >1% in US and not ie 11';

module.exports = {
  parserOpts: { strictMode: true },
  plugins: ['@babel/plugin-proposal-export-default-from'],
  env: {
    // * Used by Jest and `npm test`
    test: {
      sourceMaps: 'both',
      presets: [
        ['@babel/preset-env', { targets: targets }],
        ['@babel/preset-typescript', { allowDeclareFields: true }]
      ]
    },
    // * Used by `npm run build`
    production: {
      presets: [
        ['@babel/preset-env', { targets: targets }],
        ['@babel/preset-typescript', { allowDeclareFields: true }]
      ]
    }
  }
};
