import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryCardPositions(params) {
  return request('/api/real/cardpositions', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

