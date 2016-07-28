/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator,
} from 'react-native';

import Home from '../react-native-hzw/hzwProject/os_test/os_test_1'

var hello = React.createClass ({
  render : function () {
    var defaultName = 'ios_test';
    var defaultComponent =  Home;

    return (
        <Navigator
            initialRoute={{name: defaultName, component: defaultComponent}}
            configureScene={ () => {
                return Navigator.SceneConfigs.VerticalDownSwipeJump;
                }}
            renderScene={(route, navigator) => {
                let Component = route.component;
                if(route.component) {
                      return<Component {...route.params } navigator={navigator } />
                }
                }}/>
    );
  }
});
AppRegistry.registerComponent('hello', () =>hello);