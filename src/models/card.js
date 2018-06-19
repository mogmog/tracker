import {queryCards} from '../services/card/api';

export default {
  namespace: 'card',

  state: {
    questioncards: [],
  },

  effects: {

    * fetchquestioncards({payload}, {call, put}) {
      const response = yield call(queryCards, payload);
      yield put({
        type: 'savequestioncards',
        payload: response,
      });
    },
  },

  reducers: {
    savequestioncards(state, action) {
      return {
        ...state,
        questioncards: action.payload && typeof(action.payload.list === 'Array') ? action.payload.list : [],
      };
    },

    clearquestioncards(state, action) {
      return {
        ...state,
        questioncards: [],
      };
    },

  },
};
