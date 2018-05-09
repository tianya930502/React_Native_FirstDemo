import { PanResponder } from "react-native";
import { DrawerNavigator } from 'react-navigation';

// 手指在页面移动时打开DrawerNavigator
const MoveOpenDwrawer = () => {
    let isTrue = true;
    return PanResponder.create({
        // 要求成为响应者：
        onStartShouldSetPanResponder: (evt, gestureState) => true, // 在用户刚开始触摸时成为响应者
        // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true, // 在用触摸点开始移动时成为响应者
        // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        // 用户移动时执行的事件
        onPanResponderMove: (evt, gestureState) => {
            console.log(gestureState.dx); // 用户移动的距离，向右为正，向左为负
            if(isTrue) {
                isTrue = false;
                this.props.navigation.navigate('DrawerOpen');
            }
            // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        },

        onPanResponderRelease: (evt, gestureState) => {
            // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
            // 一般来说这意味着一个手势操作已经成功完成。
            isTrue = true;
        },
    })
}

export {
    MoveOpenDwrawer,
}
