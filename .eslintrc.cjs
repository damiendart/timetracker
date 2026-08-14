// Copyright (C) Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

module.exports = {
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  env: {
    'es2021': true,
  },
  rules: {
    indent: 'off',
    'no-alert': 'off',
    'no-bitwise': 'off',
  },
};
