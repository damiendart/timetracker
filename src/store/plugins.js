// Copyright (c) 2022 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

const localStoragePlugin = (store) => {
  store.subscribe(
    (mutation, state) => {
      if (mutation.type === 'INITIALISE_STORE') {
        return;
      }

      localStorage.setItem('store', JSON.stringify(state));
    },
  );
};

export default localStoragePlugin;
