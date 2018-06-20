import {  queryCardPositions } from '../services/cardpositions/api';

export default {
  namespace: 'cardpositions',

  state: {
    cardpositions: {},
    ispositionempty : true
  },

  effects: {

    * fetchcardpositions({payload}, { call, put }) {
      const response = yield call(queryCardPositions, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * fetchisempty({payload}, { call, put }) {
      const response = yield call(queryCardPositions, payload);
      yield put({
        type: 'saveisempty',
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

    saveisempty(state, action) {
      return {
        ...state,
        ispositionempty: action.payload.list.length === 0 ,
      };
    },

  },
};
