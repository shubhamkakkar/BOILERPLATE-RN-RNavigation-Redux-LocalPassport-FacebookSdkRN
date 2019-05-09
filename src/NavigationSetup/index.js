import React from "react";

import { View, Text } from "react-native";
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer
} from "react-navigation";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AuthScreen from "../screens/LoginLogout/LoginLogout"


class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
            </View>
        );
    }
}


const AppNavigator = createStackNavigator({
    AuthScreen
});

const StackNavigator = createAppContainer(AppNavigator);


const TabNavigator = createBottomTabNavigator({
    Auth: AuthScreen,
    Settings: SettingsScreen,
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Auth') {
                    iconName = `user`;
                    return <SimpleLineIcons name={iconName} size={15} color={tintColor} />;

                } else if (routeName === 'Settings') {
                    iconName = `ios-settings`;
                    return <IconComponent name={iconName} size={15} color={tintColor} />;
                }

            },
        }),
        tabBarOptions: {
            activeTintColor: '#007aff',
            inactiveTintColor: 'gray',
        },
    });

const BottomTabNavigator = createAppContainer(TabNavigator);


export { StackNavigator, BottomTabNavigator }
