// 维度接口

import request from '../utils/request';
import { AsyncStorage } from 'react-native';

// 登录接口
export function login() {
    return request('http://xdengine-test1.7qjf.com/perJudDocment/verifyCrmLogin.jhtml?staffNumber=mscrmadmin&secretKey=B8CB8B8A472EDD05E7CBFD29963D41A38782DA3356DC0987', {
        method: 'GET',
    });
}

// 拿到用户数据的接口
export function getAllUsers() {
    return request('http://xdengine-test1.7qjf.com/crmSync/queryBodyExistReady.jhtml?projectNo=G20180413004051&queryName=%E6%9D%AD%E5%B7%9E%E9%91%AB%E5%90%88%E6%B1%87%E4%BA%92%E8%81%94%E7%BD%91%E9%87%91%E8%9E%8D%E6%9C%8D%E5%8A%A1%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&queryNumber=&queryType=2&staffNumber=mscrmadmin&staffKey=B8CB8B8A472EDD05E7CBFD29963D41A38782DA3356DC0987', {
        method: 'GET',
    });
}

// 点击每个维度时的请求
const obj = {
    staffKey: 'B8CB8B8A472EDD05E7CBFD29963D41A38782DA3356DC0987',
    staffNumber: 'mscrmadmin',
    projectNo: 'G20180413004051',
}

export function getimensionality(params) {
    const newParams = {...obj, ...params};
    return request('http://xdengine-test1.7qjf.com/web/queryListByPage.jhtml', {
        method: 'Post',
        // body: newParams,
        body: {
            dataDimension: "executive",
            idNo: "330702197910162623",
            projectNo: "G20180413004051",
            queryName: "程奕",
            queryType: 1,
            staffKey: "B8CB8B8A472EDD05E7CBFD29963D41A38782DA3356DC0987",
            staffNumber: 'mscrmadmin',
        }
    });
}


// 列表数据的接口
