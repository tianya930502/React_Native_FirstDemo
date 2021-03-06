import React from 'react';
import { Button, ScrollView, Text, AsyncStorage, StyleSheet, PanResponder } from 'react-native';
import { Pagination } from 'antd-mobile';
import { DrawerNavigator } from 'react-navigation';

import * as Services from '../../services/dimensionality';
import LostNoticeScreen from './LostNotice';
import ProceedingsAnnouncementScreen from './ProceedingsAnnouncement';
import RefereeDocumentsScreen from './RefereeDocuments';
import LitigationProcessScreen from './LitigationProcess';
import CourtNoticeScreen from './CourtNotice';
import ExposureStageScreen from './ExposureStage';
import DeliveryNoticeScreen from './DeliveryNotice';
import LawyerLetterScreen from './LawyerLetter';

import DetailScreen from '../../components/DetailScreen/DetailScreen';
import LoaneeBaseInfo from '../../components/LoaneeBaseInfo';
import Table from '../../components/Table';
import { DealStorageData } from "../../utils/storage";

const layoutData = {
    isHaveSearch: true, // 是否有搜索框
    isHaveDetailScreen: true, // 是否有详细筛选
    dateType: '立案日期', // 日期类型
    startTimeName: 'filingStartTime', // 要筛选的开始时间字段
    endTimeName: 'filingEndTime', // 要筛选的结束时间字段
    region: {
        isHave: true, // 是否有省份
        params: {
            dataDimension: 'executive', // 'executive'为mock数据，真实数据为维度
        },
    },
    detailScreenCondition: [
        // 详细筛选条件
        {
            title: '渠道来源', // 标题, 用来判断选择的是哪一种类型
            arr: ['正信用', '法海', '汇法'], // 可选择的筛选条件
        },
    ],
};

class ExecutionAnnouncementScreen extends React.Component{
    static navigationOptions = {
        title: '执行公告',
    }
    constructor(props) {
        super(props);
        this.state = {
            allScreenConditions: '', // 所有筛选条件
            pagination: {
                currentPage: 1,
                pageSize: 5,
            },
            totalPage: 1,
            ListData: '', // 列表数据
            BaseinfoData: '', // 基础信息
        }
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
                if(!gestureState.dy && isTrue) {
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
        AsyncStorage.multiGet(['staffNumber', 'secretKey', 'projectNo', 'queryName', 'queryNumber', 'queryType']).then(res => {
            const obj = DealStorageData(res);
            Services.getimensionality({...obj, ...{dataDimension: "executive", pageSize: 5}}).then(res => {
                if(res.isSuccess) {
                    console.log(res.datas);
                    this.setState({
                        ListData: res.datas.page.dataList,
                        totalPage: res.datas.page.totalPages,
                    })
                }
            })
            Services.getBaseInfoData({...obj, ...{dataDimension: "executive"}}).then(res => {
                if(res.isSuccess) {
                    console.log(res.datas.list);
                    this.setState({
                        BaseinfoData: res.datas.list,
                    })
                }
            })
        });
    }

    fetchList(currentPage, params){
        AsyncStorage.multiGet(['staffNumber', 'secretKey', 'projectNo', 'queryName', 'queryNumber', 'queryType']).then(res => {
            const obj = DealStorageData(res);
            const obj1 = {dataDimension: 'executive', pageSize: 5, currentPage: currentPage || 1};
            Services.getimensionality(Object.assign(obj, obj1, params || {})).then(res => {
                if(res.isSuccess) {
                    this.setState({
                        ListData: res.datas.page.dataList,
                        totalPage: res.datas.page.totalPages,
                        pagination: {
                            currentPage: currentPage,
                        }
                    })
                }
            })
        });
    }
    // 翻页
    Navigation(n) {
        const { allScreenConditions } = this.state;
        this.fetchList(n, allScreenConditions);
    }

    // 案号搜索
    CaseNumSearch(obj) {
        this.setState({
            allScreenConditions: obj,
        })
        this.fetchList(1, obj);
    }

    // 详细筛选搜索
    DetailScreen(obj) {
        this.fetchList(1, obj);
        this.setState({
            allScreenConditions: obj,
        })
    }

    render(){
        const { navigate } = this.props.navigation;
        const { BaseinfoData,  ListData, pagination, totalPage } = this.state;
        const title = [
            {
                key: 'id',
                value: '#'
            },
            {
                key: 'caseNo',
                value: '案号'
            },
            {
                key: 'filingTime',
                value: '立案日期'
            },
            {
                key: 'courtName',
                value: '法院'
            },
            {
                key: 'caseStatusDes',
                value: '案件状态'
            },
            {
                key: 'executes',
                value: '执行标的'
            },
            {
                key: 'region',
                value: '省份'
            },
            {
                key: 'apiDataSource',
                value: '详情'
            },
        ];
        return(
            <ScrollView style={styles.container}  {...this._gestureHandlers.panHandlers}>
                <LoaneeBaseInfo BaseinfoData={BaseinfoData} />
                <DetailScreen layoutData={layoutData} CaseNumSearch={this.CaseNumSearch.bind(this)} DetailScreen={this.DetailScreen.bind(this)}
                />
                <Table title={title} ListData={ListData} />
                <Pagination total={totalPage}
                            className="custom-pagination-with-icon"
                            current={pagination.currentPage}
                            locale={{
                                prevText: (<Text>上一页</Text>),
                                nextText: (<Text>下一页</Text>),
                            }}
                            onChange={this.Navigation.bind(this)}
                />
                <Button onPress={() => navigate('DrawerOpen')} title='打开侧滑菜单' />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainerStyle: {
        height: 30,
        fontSize: 18,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        width: 250,
        marginLeft: 30,
    }
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
