import Vuex from 'vuex';

import icons from '../static/dist/icons.json';

const createStore = () => new Vuex.Store({
  searchTerm: '',
  icons,
});

export default createStore;
