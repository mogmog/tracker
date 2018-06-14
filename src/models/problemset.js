import { queryProblemSet } from '../services/api';

export default {
  namespace: 'problemset',

  state: {
      list: [],
      pagination: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryProblemSet, payload);
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
        list: action.payload.list,
      };
    },
  },
};
