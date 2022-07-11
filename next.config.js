const withPlugins = require('next-compose-plugins');
const transpileModules = require('next-transpile-modules');

/** @type {import('next').NextConfig} */
module.exports = withPlugins(
  [transpileModules(['@plutohq/pluto-react'])],
  {
    reactStrictMode: true,
    swcMinify: true,
  },
);
