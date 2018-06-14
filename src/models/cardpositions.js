import {  queryCardPositions } from '../services/cardpositions/api';

export default {
  namespace: 'cardpositions',

  state: {
    cardpositions: {},
  },

  effects: {

    * fetchcardpositions({payload}, { call, put }) {
      const response = yield call(queryCardPositions, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        cardpositions: action.payload,
      };
    },
  },
};
