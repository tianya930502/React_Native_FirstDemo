import React from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    PanResponder,
    AsyncStorage
} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import * as Services from '../../services/dimensionality';
import * as Storage from '../../utils/storage';

import LostNoticeScreen from './LostNotice';
import ProceedingsAnnouncementScreen from './ProceedingsAnnouncement';
import RefereeDocumentsScreen from './RefereeDocuments';
import LitigationProcessScreen from './LitigationProcess';
import CourtNoticeScreen from './CourtNotice';
import ExposureStageScreen from './ExposureStage';
import DeliveryNoticeScreen from '../DeliveryNotice';
import LawyerLetterScreen from './LawyerLetter';

class ExecutionAnnouncementScreen extends React.Component{
    static navigationOptions = {
        title: '执行公告',
    }
    componentWillMount() {
        let isTrue = true;
        this._gestureHandlers = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true, // 在用户刚开始触摸时成为响应者
            onMoveShouldSetPanResponder: (evt, gestureState) => true, // 在用触摸点开始移动时成为响应者
            // 用户移动时执行的事件
            onPanResponderMove: (evt, gestureState) => {
                // console.log(gestureState.dx); // 用户移动的距离，向右为正，向左为负
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

    componentDidMount() {
        const { params } = this.props.navigation.state;
        const obj = {
            dataDimension: 'executive',
            queryType: 2,
        }
        AsyncStorage.multiGet(['idNo', 'queryName', 'queryType', 'readStatus']).then(res => {
            const storageObj = Storage.DealStorageData(res);
            console.log({...storageObj, ...obj});
            Services.getimensionality({...obj, ...storageObj}).then(res => {
                console.log(res);
            })
        });
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container} {...this._gestureHandlers.panHandlers}>
                <Text style={{padding:20}}>这是 个人--执行公告 页面</Text>
                <Button onPress={() => navigate('DrawerOpen')} title='打开侧滑菜单' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

const DrawerScreen = DrawerNavigator({
    ExecutionAnnouncement: { // 执行公告
        screen: ExecutionAnnouncementScreen,
    },
    LostNotice: { // 失信公告
        screen: LostNoticeScreen,
    },
    ProceedingsAnnouncement: { // 开庭公告
        screen: ProceedingsAnnouncementScreen,
    },
    RefereeDocuments: { // 裁判文书
        screen: RefereeDocumentsScreen,
    },
    LitigationProcess: { // 诉讼流程
        screen: LitigationProcessScreen,
    },
    CourtNotice: { // 法院公告
        screen: CourtNoticeScreen,
    },
    ExposureStage: { // 曝光台
        screen: ExposureStageScreen,
    },
    DeliveryNotice: { // 送达公告
        screen: DeliveryNoticeScreen,
    },
    LawyerLetter: { // 律师函件
        screen: LawyerLetterScreen,
    },

},{
    drawerWidth: 150, // 抽屉宽
    drawerPosition: 'left', // 抽屉在左边还是右边
    contentOptions: {
        initialRouteName: DrawerScreen, // 默认页面组件
        activeTintColor: '#008AC9',  // 选中文字颜色
        activeBackgroundColor: '#f5f5f5', // 选中背景颜色
        inactiveTintColor: '#000',  // 未选中文字颜色
        inactiveBackgroundColor: '#fff', // 未选中背景颜色
        style: {  // 样式
        }
    }
})

export default DrawerScreen;
