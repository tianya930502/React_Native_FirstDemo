import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import ExecutionAnnouncementComScreen from './screens/Company/ExecutionAnnouncement';
import ExecutionAnnouncementScreen from './screens/Loanee/ExecutionAnnouncement';
import PasswordLoginScreen from './screens/PasswordLogin';
import SetPasswordScreen from './screens/SetPassword';
import AllUserScreen from './screens/AllUser';
import ChangePassScreen from './screens/ChangePass';
import MineScreen from './screens/Mine';


const TabScreen = TabNavigator({
    Company: {
        screen: AllUserScreen,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({ tintColor }) => <Icon name="perm-identity" size={25} color={tintColor} />,
        }
    },
    People: {
        screen: MineScreen,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor }) => <Icon name="perm-identity" size={25} color={tintColor} />,
        }
    },
});

// 只有AllUser页面才有tab,才能进行tab切换
const TabsScreen = StackNavigator({
    Tab: { screen: TabScreen},
    AllUser: { screen: AllUserScreen },
},{
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false,
    },
})

// 其他页面只能进行页面之间的跳转
const AppNavigator = StackNavigator(
    {
        Login: { screen: LoginScreen },
        Register: { screen: RegisterScreen },
        Home: {screen: TabsScreen},
        ChangePass: {screen: ChangePassScreen},
        ExecutionAnnouncementCom: { screen: ExecutionAnnouncementComScreen },
        ExecutionAnnouncement: { screen: ExecutionAnnouncementScreen },
        SetPassword: { screen: SetPasswordScreen },
        PasswordLogin: { screen: PasswordLoginScreen },
    }
)

export default AppNavigator;
