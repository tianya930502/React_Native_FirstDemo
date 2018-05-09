import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import LoginScreen from './screens/Login';
import ExecutionAnnouncementComScreen from './screens/Company/ExecutionAnnouncement';
import ExecutionAnnouncementScreen from './screens/Loanee/ExecutionAnnouncement';
import PasswordLoginScreen from './screens/PasswordLogin';
import SetPasswordScreen from './screens/SetPassword';
import AllUserScreen from './screens/AllUser';
import HomeScreen from './screens/Home';
import MineScreen from './screens/Mine';


const TabScreen = TabNavigator({
    Company: {
        screen: HomeScreen,
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

const MainScreen = StackNavigator(
    {
        Tab: { screen: TabScreen},
        AllUser: { screen: AllUserScreen },
        ExecutionAnnouncementCom: { screen: ExecutionAnnouncementComScreen },
        ExecutionAnnouncement: { screen: ExecutionAnnouncementScreen },
    },
)

const AppNavigator = StackNavigator(
    {
        Login: { screen: LoginScreen },
        Main: { screen: MainScreen },
        SetPassword: { screen: SetPasswordScreen },
        PasswordLogin: { screen: PasswordLoginScreen },
    },
    {
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false,
        },
    }
)

export default AppNavigator;
