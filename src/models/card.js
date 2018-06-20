import { queryCards, saveCard, createCard } from '../services/card/api';

export default {
  namespace: 'card',

  state: {
    questioncards: [],
    card : {}
  },

  effects: {

    * fetchquestioncards({payload}, {call, put}) {
      const response = yield call(queryCards, payload);
      yield put({
        type: 'savefetchquestioncards',
        payload: response,
      });
    },

    * createquestioncard({payload}, {call, put}) {
      const response = yield call(createCard, payload);
      yield put({
        type: 'savecreatequestioncard',
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

    savecreatequestioncard(state, action) {
      return {
        ...state,
        card: action.payload,
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
