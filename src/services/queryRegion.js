import { stringify } from 'qs';
import request from '../utils/request';

/**
 * @explain  获取省份.
 * @author  czh~varrant.
 * @Create  2018/4/8~上午10:31.
 */

export async function queryRegion(params) {
    const url = `https://xd-yw1.7qjf.com/web/queryRegion.jhtml?${stringify(params)}`;
  return request(url,{
    method: 'GET'
  });
}
