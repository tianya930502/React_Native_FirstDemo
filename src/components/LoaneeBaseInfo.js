import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class LoaneeBaseInfo extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        const { BaseinfoData } = this.props;
        return(
            <View style={styles.container}>
                <Text  style={styles.name}>{BaseinfoData.name || '-'}</Text>
                <Text style={styles.text}>身份证号：{BaseinfoData.idNo || '-'}</Text>
                <Text style={styles.text}>地址：{BaseinfoData.address || '-'}</Text>
                <Text style={styles.text}>曾用名：{BaseinfoData.oldName || '-'}</Text>
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
        marginBottom: 15,
    },
    name: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        height: 25,
    },
    text: {
        height: 20,
    }
});


export default LoaneeBaseInfo;
