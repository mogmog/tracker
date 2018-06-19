import { queryCards, saveCard } from '../services/card/api';

export default {
  namespace: 'card',

  state: {
    questioncards: [],
  },

  effects: {

    * fetchquestioncards({payload}, {call, put}) {
      const response = yield call(queryCards, payload);
      yield put({
        type: 'savefetchquestioncards',
        payload: response,
      });
    },

    * persistquestioncard({payload}, {call, put}) {
      const response = yield call(saveCard, payload);
      yield put({
        type: 'savepersistquestioncard',
        payload: response,
      });
    },

  },

  reducers: {
    savefetchquestioncards(state, action) {
      return {
        ...state,
        questioncards: action.payload && typeof(action.payload.list === 'Array') ? action.payload.list : [],
      };
    },

    savepersistquestioncard(state, action) {
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
