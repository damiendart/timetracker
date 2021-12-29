const localStoragePlugin = (store) => {
  store.subscribe(
    (mutation, state) => {
      if (mutation.type === 'INITIALISE_STORE') {
        return;
      }

      localStorage.setItem('store', JSON.stringify(state));
    }
  );
}

export default localStoragePlugin;
