import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'antd-mobile';

class CompanyBaseInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { BaseinfoData } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.name}>
                    <Text style={{ fontSize: 16, fontWeight: '700', }}>
                        {BaseinfoData.corpName || '-'}
                    </Text>
                    {
                        BaseinfoData.approvalStatus ? <Button type='primary' size='small' style={styles.button}>{BaseinfoData.approvalStatus}</Button> : ''
                    }
                </View>

                <Text style={styles.text}>统一社会信用代码：{BaseinfoData.orgCode || '-'}</Text>
                <Text style={styles.text}>法定代表人：{BaseinfoData.legalPerson || '-'}</Text>
                <Text style={styles.text}>地址：{BaseinfoData.address || '-'}</Text>
                <Text style={styles.text}>成立日期：{BaseinfoData.foundDateStr || '-'}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingTop: 10,
        flex: 1,
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'green',
        borderWidth: 0,
        marginLeft: 5,
    },
    name: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
    },
    text: {
        height: 25,
    }
});


export default CompanyBaseInfo;
