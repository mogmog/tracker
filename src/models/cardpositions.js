import {  queryCardPositions, createCardPositions } from '../services/cardpositions/api';

export default {
  namespace: 'cardpositions',

  state: {
    cardpositions: {},
    new : {},
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

    * createcardposition({payload}, { call, put }) {
      const response = yield call(createCardPositions, payload);
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

    savecreatecardposition(state, action) {
      return {
        ...state,
        new: action.payload,
      };
    },


  },
};
