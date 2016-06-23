'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator,
} from 'react-native';
import  Home from './pretest2/preTestQuestion4';
//import  Home from './test/test1'
//import Home from './test/test1'
//import Home from './leveltest/leveltest_low2'
//import Home from './node_modules/react-native-voice/VoiceTest/index.android'
//import Home from './temp/record'
//import Home from './hidetest/welcomehide1'

var hello = React.createClass ({
    render : function () {
        var defaultName = 'pretestTransfer';
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