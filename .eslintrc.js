/* eslint-env node */
module.exports = {
  extends: [
    'plugin:@shopify/typescript',
    'plugin:@shopify/react',
    'plugin:@shopify/prettier',
    // 'plugin:@shopify/polaris',
    'plugin:react/jsx-runtime',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // temporary overrides
        '@shopify/strict-component-boundaries': 'off',

        // allow Record<K,V>
        '@typescript-eslint/consistent-indexed-object-style': [
          'error',
          'record',
        ],

        // cloned from node_modules/@shopify/eslint-plugin/lib/config/rules/typescript.js
        // keep camelCase naming convention and PascalCase class
        // toss interface names
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'default',
            filter: {
              match: true,
              // Allow double underscores and React UNSAFE_ (for lifecycle hooks that are to be deprecated)
              regex: '^(__|UNSAFE_).+$',
            },
            format: null,
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          // {
          //   selector: 'typeParameter',
          //   format: ['PascalCase'],
          //   prefix: ['T'],
          // },
          // {
          //   selector: 'interface',
          //   format: ['PascalCase'],
          //   custom: {
          //     regex: '^I[A-Z]',
          //     match: false,
          //   },
          // },
        ],
      },
    },
    {
      // this file is auto generated, so we want to disable any offending rules
      files: ['next-env.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off',
        'spaced-comment': 'off',
      },
    },
  ],
}
