import React from 'react';
import { Button, ScrollView, Text, AsyncStorage, StyleSheet } from 'react-native';
import { Pagination } from 'antd-mobile';

import * as Services from '../../services/dimensionality';
import DetailScreen from '../../components/DetailScreen/DetailScreen';
import LoaneeBaseInfo from '../../components/LoaneeBaseInfo';
import Table from '../../components/Table';
import { DealStorageData } from "../../utils/storage";

class DeliveryNoticeScreen extends React.Component{
    static navigationOptions = {
        title: '送达公告',
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
            Services.getimensionality({...obj, ...{dataDimension: "delivery_notice", pageSize: 5}}).then(res => {
                if(res.isSuccess) {
                    console.log(res.datas);
                    this.setState({
                        ListData: res.datas.page.dataList,
                        totalPage: res.datas.page.totalPages,
                    })
                }
            })
            Services.getBaseInfoData({...obj, ...{dataDimension: "delivery_notice"}}).then(res => {
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
            const obj1 = {dataDimension: 'delivery_notice', pageSize: 5, currentPage: currentPage || 1};
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
                key: 'deliveryNo',
                value: '字号'
            },
            {
                key: 'noticeType',
                value: '公告类型'
            },
            {
                key: 'courtName',
                value: '法院'
            },
            {
                key: 'party',
                value: '当事人'
            },
            {
                key: 'apiDataSource',
                value: '详情'
            },
        ];
        return(
            <ScrollView style={styles.container}>
                <LoaneeBaseInfo BaseinfoData={BaseinfoData} />
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

export default DeliveryNoticeScreen;
