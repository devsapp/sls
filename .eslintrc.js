module.exports = {
  extends: 'eslint-config-ali/typescript',
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-await-in-loop': 'off',
    'max-len': 'off',
    '@typescript-eslint/ban-ts-comment': 'off'
  },
};
