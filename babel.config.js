module.exports = function getBabelConfig(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};
