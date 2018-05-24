import React from 'react';
import { Button, ScrollView, Text, AsyncStorage, StyleSheet } from 'react-native';
import { Pagination } from 'antd-mobile';

import * as Services from '../../services/dimensionality';
import DetailScreen from '../../components/DetailScreen/DetailScreen';
import LoaneeBaseInfo from '../../components/LoaneeBaseInfo';
import Table from '../../components/Table';
import { DealStorageData } from "../../utils/storage";

const layoutData = {
    isHaveSearch: true, // 是否有搜索框
    isHaveDetailScreen: true, // 是否有详细筛选
    dateType: '判决日期', // 日期类型
    startTimeName: 'judgementStartTime', // 要筛选的开始时间字段
    endTimeName: 'judgementEndTime', // 要筛选的结束时间字段
    region: {
        isHave: true, // 是否有省份
        params: {
            dataDimension: 'charge_text', // 'executive'为mock数据，真实数据为维度
        },
    },
    detailScreenCondition: [
        // 详细筛选条件
        {
            title: '渠道来源', // 标题, 用来判断选择的是哪一种类型
            arr: ['正信用', '法海', '汇法'], // 可选择的筛选条件
        },
        {
            title: '案件类型',
            arr: ['刑事', '民事', '商业', '执行', '行政', '其他'],
        },
        {
            title: '角色',
            arr: ['原告', '被告'],
        },
        {
            title: '案由',
            arr: ['金融借贷类纠纷', '其他'],
        },
    ],
};

class RefereeDocumentsScreen extends React.Component{
    static navigationOptions = {
        title: '裁判文书',
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

    componentDidMount() {
        AsyncStorage.multiGet(['staffNumber', 'secretKey', 'projectNo', 'queryName', 'queryNumber', 'queryType']).then(res => {
            const obj = DealStorageData(res);
            Services.getimensionality({...obj, ...{dataDimension: "charge_text", pageSize: 5}}).then(res => {
                if(res.isSuccess) {
                    console.log(res.datas);
                    this.setState({
                        ListData: res.datas.page.dataList,
                        totalPage: res.datas.page.totalPages,
                    })
                }
            })
            Services.getBaseInfoData({...obj, ...{dataDimension: "charge_text"}}).then(res => {
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
            const obj1 = {dataDimension: 'charge_text', pageSize: 5, currentPage: currentPage || 1};
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
                key: 'judgementDate',
                value: '判决日期'
            },
            {
                key: 'caseTypeDes',
                value: '案件类型'
            },
            {
                key: 'role',
                value: '角色'
            },
            {
                key: 'courtName',
                value: '法院'
            },
            {
                key: 'caseReason',
                value: '案由'
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
            <ScrollView style={styles.container}>
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

export default RefereeDocumentsScreen;
