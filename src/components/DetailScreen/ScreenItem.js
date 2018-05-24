import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

class ScreenItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            str: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
        })
    }

    // 筛选条件
    ScreenCondition(text) {
        const { value } = this.state;
        // 如果不存在text返回false
        const str = value.some((data, index) => {
            return data === text;
        });
        // 如果text存在删除
        value.forEach((data, index) => {
            if (data === text) {
                value.splice(index, 1);
            }
        });
        if (!str) {
            value.push(text);
        }
        this.props.onScreen(value);
        this.setState({
            value,
        });
    }

    // 判断是否被选中
    isChecked(value, item) {
        const str = value.some((data) => {
            return data === item;
        });
        return str;
    }

    render(){
        const { value } = this.state;
        return(
            <View style={styles.container}>
                <Text style={{fontSize: 14, width: 70, textAlign: 'right', paddingRight: 5}}>{this.props.title}:</Text>
                {
                    this.props.data && this.props.data.length > 0 ? this.props.data.map((item, index) => {
                        return (
                            <Button
                                onPress={this.ScreenCondition.bind(this, item)}
                                title={item} key={index}
                                containerStyle={{ marginRight: 7 }}
                                buttonStyle={this.isChecked(value, item) ? styles.checkedStyle : styles.defaultStyle}
                                titleStyle={{
                                    fontSize: 12,
                                    color: this.isChecked(value, item) ? '#fff' : '#000',
                                }}
                            />
                        )
                    }) : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
    },
    defaultStyle: {
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: '#d9d9d9'
    },
    checkedStyle: {
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: "#1890ff",
    }
});


export default ScreenItem;
