module.exports = {
  extends: [
    'cw'
  ],
  rules: {
    'react/prop-types': [
      'error',
      {
        'ignore': [
          't',
          'i18n',
          'match',
          'location',
          'i18nMessages'
        ],
        'customValidators': []
      }
    ],
    'react/no-danger': 'off',
  }
};
