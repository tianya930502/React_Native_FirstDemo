import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Modal, Button } from 'antd-mobile';

class Table extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            ListData: this.props.ListData,
            modal: false,
            modalData: '',
        }
    }

    OpenModal(item) {
        console.log(item);
        this.setState({
            modal: true,
            modalData: item,
        })
    }

    shouldComponentUpdate() {
        return true;
    }

    render(){
        const { title, ListData } = this.props;
        const { modal, modalData } = this.state;
        const arr = [];
        title.forEach(item => {
            arr.push(item.key);
        })
        if(ListData) {
            ListData.forEach(item => {
                item.arr = [];
                arr.forEach(key => {
                    item.arr.push(item[key]);
                })
            })
        }
        console.log(arr);
        console.log(ListData);
        console.log(modalData.arr);
        console.log(modal);
        return(
            <View style={styles.container}>
                <Modal
                    visible={modal}
                    transparent
                    onClose={() => {this.setState({modal: false})}}
                    title="Detail"
                    footer={[{ text: 'Ok', onPress: () => this.setState({modal: true}) }]}
                >
                    <View>
                        {
                            title.map((item, index) => {
                                return (
                                    <View key={index} style={{height: 25, flexDirection: 'row', alignItems:'center'}}>
                                        <Text style={{fontWeight: '800', width: 80}}>{item.value} : </Text>
                                        <Text style={{fontSize: 12}}>{modalData[item.key] || '-'}</Text>
                                    </View>

                                )
                            })
                        }
                    </View>
                </Modal>

                <View style={styles.Title}>
                    {
                        title.map((item, index) => {
                            return (
                                <Text key={index} style={styles.text}>{item.value}</Text>
                            )
                        })
                    }
                </View>
                <View style={styles.TextItem}>
                    {
                        ListData ? ListData.map((item, index) => {
                            return (
                                <View style={styles.Item} key={index}>
                                    <Text style={styles.text}>{item.id}</Text>
                                    <Text style={styles.text}>{item.caseNo}</Text>
                                    <Text style={styles.text}>...</Text>
                                    <Button onClick={this.OpenModal.bind(this, item)} type="primary" inline size="small">查看详情</Button>
                                </View>
                            )
                        }) : ''
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'gray',
        borderWidth: 1,
        margin: 5,
    },
    Title: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 25,

    },
    text: {
        height: 25,
        lineHeight: 25,
    },
    TextItem: {

    },
    Item: {
        flexDirection: 'row',
        borderTopColor: 'gray',
        borderTopWidth: 1,
        justifyContent: 'space-around'
    }

});


export default Table;
