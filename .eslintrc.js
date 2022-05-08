module.exports = {
  extends: [
    // '@mate-academy/eslint-config-react-typescript',
    'plugin:react/recommended',
  ],
  rules: {
    // React
    'react/prop-types': 0,
    'react/self-closing-comp': 0,
    'react/display-name': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-tabindex': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/role-supports-aria-props': 0,
    'jsx-a11y/label-has-associated-control': 0,

    // JavaScript
    semi: 0,
    'no-proto': 0,
    'no-unused-vars': 0,
    'no-console': 0,
    'no-confusing-arrow': 0,
    'no-shadow': 0,

    // TypeScript
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/no-explicit-any': 0,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
};
