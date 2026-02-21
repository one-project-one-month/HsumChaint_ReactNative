// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const pluginQuery = require("@tanstack/eslint-plugin-query");
const testingLibrary = require("eslint-plugin-testing-library");

module.exports = defineConfig([
  expoConfig,
  ...pluginQuery.configs["flat/recommended"],
  {
    ignores: ["dist/*"],
    plugins: {
      "testing-library": testingLibrary,
    },
  },
]);
