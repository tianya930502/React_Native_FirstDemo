import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
    monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
    monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
    dayNames: ['日','一','二','三','四','五','六'],
    dayNamesShort: ['日','一','二','三','四','五','六']
};

LocaleConfig.defaultLocale = 'fr';

class SelectDate extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            startTime: this.props.startTime,
            endTime: this.props.endTime,
            isOpenStart: false, // 是否打开选择开始时间的弹窗
            isOpenEnd: false, // 是否打开选择结束时间的弹窗
            status: '', // 用来判断选择的是开始时间还是结束时间
            minDate: '', // 可选择的最小日期
            maxDate: '', // 可选择的最大日期
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            startTime: nextProps.startTime,
            endTime: nextProps.endTime,
        });
    }

    // 判断一个字符串是否是标准时间
    IsStandardTime(date){
        return (new Date(date).getDate()==date.substring(date.length-2));
    }

    // 选择开始时间
    selectStartTime(day) {
        console.log(day);
        this.setState({
            startTime: day.dateString,
            isOpenStart: false,
            minDate: day.dateString,
        })
        this.props.getStartTime(day.dateString);
    }

    // 选择结束时间
    selectEndTime(day) {
        this.setState({
            endTime: day.dateString,
            isOpenEnd: false,
            maxDate: day.dateString,
        })
        this.props.getEndTime(day.dateString);
    }

    // 打开选择开始时间的弹窗
    openStartTime() {
        this.setState({
            isOpenStart: true,
            isOpenEnd: false,
        })
    }

    // 打开选择结束时间的弹窗
    openEndTime() {
        this.setState({
            isOpenStart: false,
            isOpenEnd: true,
        })
    }

    // 输入开始时间
    InputStartTime(text) {
        this.setState({
            startTime: text,
            minDate: text,
        })
        this.props.getStartTime(text);
    }
    startTimeBlur() {
        const { startTime, endTime } = this.state;
        if(endTime){
            if(!this.IsStandardTime(startTime) || new Date(startTime) > new Date(endTime)){
                this.props.getStartTime('');
                this.setState({
                    startTime: '',
                    minDate: '',
                })
            }
        } else {
            if(!this.IsStandardTime(startTime)){
                this.props.getStartTime('');
                this.setState({
                    startTime: '',
                    minDate: '',
                })
            }
        }
    }

    // 输入结束时间
    InputEndTime(text) {
        this.setState({
            endTime: text,
            maxDate: text,
        })
        this.props.getEndTime(text);
    }
    endTimeBlur() {
        const { startTime, endTime } = this.state;
        if(startTime){
            if(!this.IsStandardTime(endTime) || new Date(startTime) > new Date(endTime)){
                this.props.getEndTime('');
                this.setState({
                    endTime: '',
                    maxDate: '',
                })
            }
        } else {
            if(!this.IsStandardTime(endTime)){
                this.props.getEndTime('');
                this.setState({
                    endTime: '',
                    maxDate: '',
                })
            }
        }
    }

    shouldComponentUpdate() {
        return true;
    }

    render(){
        const { startTime, endTime, isOpenStart, isOpenEnd, minDate, maxDate } = this.state;
        return(
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <Text style={{fontSize: 14, width: 70, textAlign: 'right', paddingRight: 5}}>{this.props.title}:</Text>
                    <Input
                        inputContainerStyle={styles.inputContainerStyle}
                        placeholder='请选择'
                        inputStyle={{fontSize: 14}}
                        containerStyle={{width: 130}}
                        onBlur={this.startTimeBlur.bind(this)}
                        onFocus={() => this.setState({isOpenEnd: false, isOpenStart: false})}
                        onChangeText={this.InputStartTime.bind(this)}
                        rightIcon={<Icon name='calendar' color='#ccc' size={15} onPress={this.openStartTime.bind(this)}/>}
                        value={startTime}
                    />
                    <Text> -- </Text>
                    <Input
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={{fontSize: 14}}
                        containerStyle={{width: 130}}
                        placeholder='请选择'
                        onBlur={this.endTimeBlur.bind(this)}
                        onFocus={() => this.setState({isOpenEnd: false, isOpenStart: false})}
                        onChangeText={this.InputEndTime.bind(this)}
                        rightIcon={<Icon name='calendar' color='#ccc' size={15} onPress={this.openEndTime.bind(this)} />}
                        value={endTime}
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    {
                        isOpenStart ? <View style={{width: 300}}>
                            <CalendarList
                                markedDates={{
                                    [startTime]: {selected: true, marked: true, selectedColor: '#1890ff'},
                                }} // 选择的日期，背景颜色改变
                                current={startTime}
                                maxDate={maxDate} // 可选的最晚日期
                                onDayPress={this.selectStartTime.bind(this)}
                                horizontal={true} // 触摸滑动
                                pagingEnabled={true}
                                calendarWidth={300}
                            />
                        </View> : ''
                    }
                    {
                        isOpenEnd ? <View style={{width: 300}}>
                            <CalendarList
                                markedDates={{
                                    [endTime]: {selected: true, marked: true, selectedColor: '#1890ff'},
                                }} // 选择的日期，背景颜色改变
                                current={endTime}
                                minDate={minDate} // 可选的最早日期
                                onDayPress={this.selectEndTime.bind(this)}
                                horizontal={true} // 触摸滑动
                                pagingEnabled={true}
                                calendarWidth={300}
                            />
                        </View> : ''
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
    },
    inputContainerStyle: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        width: 130,
        margin: 0,
        paddingLeft: 5,
        paddingRight: 10,
    },
});


export default SelectDate;
