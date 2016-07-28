'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator,
} from 'react-native';
//import Home from './pretest2/new_preTest4';
//import Home from './test/test1'
//import Home from './test/transfer'
//import Home from './leveltest/leveltest_low2'
//import Home from './node_modules/react-native-voise/sample/index'
import Home from './temp/record'
//import Home from './hidetest/welcomehide1'
//import Home from '../../hello/os_test/os_test_1'

var hello = React.createClass ({
    render : function () {
        var defaultName = 'pretestTransfer';
        var defaultComponent =  Home;

        return (
            <Navigator
                initialRoute={{
                name: defaultName,
                component: defaultComponent,
                params:{
                            word1:'apple',
                            word2:'potota',
                            word3:'best',
                            word4:'rice',
                            sentence1:'I like an apple.',
                            sentence2:'I like pototaes.',
                            sentence3:'I like best.'
                }
                }}
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