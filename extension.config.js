const typescript = require("rollup-plugin-typescript2");
const yaml = require("@rollup/plugin-yaml");
const {nodeResolve} = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");

module.exports = {
    plugins: [typescript({abortOnError: false}), yaml()],
};