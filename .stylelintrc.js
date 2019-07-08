module.exports = {
  processors: ["stylelint-processor-styled-components"],
  plugins: [
    "stylelint-declaration-use-variable"
  ],
  extends: [
    "stylelint-config-cw",
    "stylelint-config-styled-components"
  ],

  rules: {
    "selector-pseudo-class-no-unknown": [true, {
      ignorePseudoClasses: ["global"]
    }]
  }
};
