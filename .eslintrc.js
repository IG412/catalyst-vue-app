module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'standard',
    'prettier'
  ],
  plugins: ['standard', 'prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'no-console': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
