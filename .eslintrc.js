module.exports = { /* eslint-env node */
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'computed-property-spacing': ['warn', 'always'],
    'keyword-spacing': ['warn', { 'before': true, 'after': true }],
    'arrow-spacing': ['warn', { 'before': true, 'after': true }],
    'object-curly-spacing': ['warn', 'always', { 'objectsInObjects': true }],
    'jsx-quotes': ['warn', 'prefer-single'],
    'quotes': ['warn', 'single'],
    'indent': ['warn', 2],
    'semi': ['warn', 'always'],
    'semi-spacing': 'warn',
    'space-before-blocks': 'warn'
  },
};