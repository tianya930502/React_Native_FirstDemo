import { AsyncStorage } from 'react-native';

function clear() {
    return AsyncStorage.clear();
}

export function get(key, defaultValue = null) {
    return (async function () {
        await AsyncStorage.getItem(key).then(value => (value !== null ? JSON.parse(value) : defaultValue));
    })();
}


export function set(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
}

function remove(key) {
    return AsyncStorage.removeItem(key);
}

export function multiGet(...keys) {
    return AsyncStorage.multiGet([...keys]).then((stores) => {
        const data = {};
        stores.forEach((result, i, store) => {
            data[store[i][0]] = JSON.parse(store[i][1]);
        });
        return data;
    });
}



// 处理拿到的Storage的值，以key-value的形式返回
export function DealStorageData(arr) {
    const obj = {};
    arr.forEach(item => {
        if(item[1]) {
            obj[item[0]] = item[1];
        }
    })
    return obj;
}

