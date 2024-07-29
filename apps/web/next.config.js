const withTM = require('next-transpile-modules')(['apollo-hooks', 'config']);

module.exports = withTM({
  reactStrictMode: true,
});
