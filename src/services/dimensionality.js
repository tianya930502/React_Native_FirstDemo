// 维度接口
import { parse, stringify } from 'qs';
import request from '../utils/request';
import { AsyncStorage } from 'react-native';
import { DealStorageData } from '../utils/storage';

// 拿到用户数据的接口
export function getAllUsers() {
    const url = 'projectNo=G20180504002188&queryName=%E7%A8%8B%E5%A5%95&queryNumber=330702197910162623&queryType=1&staffNumber=mscrmadmin&secretKey=B8CB8B8A472EDD05E7CBFD29963D41A38782DA3356DC0987';
    const obj = parse(url);
    AsyncStorage.setItem('staffNumber', obj.staffNumber);
    AsyncStorage.setItem('secretKey', obj.secretKey);
    AsyncStorage.setItem('projectNo', obj.projectNo);
    AsyncStorage.setItem('queryName', obj.queryName);
    AsyncStorage.setItem('queryNumber', obj.queryNumber);
    AsyncStorage.setItem('queryType', obj.queryType);
    return request('https://xd-yw1.7qjf.com/crmSync/queryBodyExistReady.jhtml?projectNo=G20180504002188&queryName=%E7%A8%8B%E5%A5%95&queryNumber=330702197910162623&queryType=1&staffNumber=mscrmadmin&secretKey=B8CB8B8A472EDD05E7CBFD29963D41A38782DA3356DC0987', {
        method: 'GET',
    });
}


// 拿到列表数据
export function getimensionality(params) {
    console.log('params', params);
    return request('http://xdengine-test1.7qjf.com/web/queryListByPage.jhtml', {
        method: 'POST',
        body: params,
    });
}


// 列表基础数据的接口
export function getBaseInfoData(params) {
    return request(`http://xdengine-test1.7qjf.com/baseinfo/getBaseInfo.jhtml?${stringify(params)}`, {
        method: 'GET',
    });
}

// 登录接口，node + mongoose 本地数据库的接口
export function login(params) {
    return request('http://127.0.0.1:3000/user/login', {
        method: 'POST',
        body: params,
    })
}

// 注册接口，node + mongoose 本地数据库的接口
export function register(params) {
    return request('http://127.0.0.1:3000/user/register', {
        method: 'POST',
        body: params,
    })
}

// 修改密码接口,node + mongoose 本地数据库的接口
export function change(params) {
    return request('http://127.0.0.1:3000/user/change', {
        method: 'POST',
        body: params,
    })
}
