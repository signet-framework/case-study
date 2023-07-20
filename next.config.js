const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  // images: {
  // unoptimized: true,
  // },
  output: "export",
});

module.exports = withNextra();
