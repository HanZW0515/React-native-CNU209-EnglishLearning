/**
 * Created by DELL on 2016-7-14.
 */
'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Image,
    StyleSheet,
    NativeModules,
    TextInput,
    PanResponder,
} from 'react-native';

var record = require('react-native-record-sound');
import SpeechAndroid from 'react-native-android-voice';
var ToastAndroid = NativeModules.ToastAndroid;
import Record from 'react-native-record-sound';
let isRecording = false;
let AudioRecorder = require('react-native-audio-android');
var tts = require('react-native-android-speech')
import SimpleAlert from 'react-native-simpledialog-android';
import test1 from './secjs';
import { drag, pinch, GestureView } from 'react-native-gestures';

var try1 = React.createClass ({

    getInitialState: function() {
        return {
            result: 'No picture taken yet',
            img: 'http://placehold.it/350x350',
            ans:'',
            bg: 'white',
            top: 0,
            left: 0
        };
    },
    componentWillMount(){
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: ()=> true,
            onPanResponderGrant: ()=>{
                //滑动开始时，获取矩形的左上坐标，并设置背景为红色
                this._top = this.state.top
                this._left = this.state.left
                this.setState({bg: 'red'})
            },
            onPanResponderMove: (evt,gs)=>{
                console.log(gs.dx+' '+gs.dy)
                //随着手势滑动，相应的改变矩形的位置
                this.setState({
                    top: this._top+gs.dy,
                    left: this._left+gs.dx
                })
            },
            onPanResponderRelease: (evt,gs)=>{
                //活动结束后，还原背景为白色
                this.setState({
                    bg: 'white',
                    top: this._top+gs.dy,
                    left: this._left+gs.dx
                })}
        })
    },

    _choose(e){
        var m = e._top;
        var t=e.offsetTop;
        var l=e.offsetLeft;
        var height=e.offsetHeight;
        while(e=e.offsetParent) {
            t+=e.offsetTop;
            l+=e.offsetLeft;
        }
        SimpleAlert.alert('你真棒！~','获得'+this._top+'     '+l+'枚金币',[
            {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!'}
        ])
    },

    render : function () {
        return (
            <View style={styles.container}>
                <Text style = {styles.textsty} onPress={()=>this._tts()}>start recording</Text>
                <Text style = {styles.textsty}>stop recording</Text>
                <Text style = {styles.textsty}>{this.state.result}</Text>
                <TextInput
                    style={styles.inputsty}
                    onChangeText={(text) => this.setState({result:text})}
                    onSubmitEditing={()=>this._choose(this)}
                />
                <View{...this._panResponder.panHandlers} style={{backgroundColor:this.state.bg,top:this.state.top,left:this.state.left}}>
                   <Text style = {styles.textsty}> aaaaaaaaaa </Text>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'stretch',
        flexDirection: 'column'
    },
    titleText: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-around'
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#bbbbbb',
        marginTop: 20,
        marginBottom: 20
    },
    icon: {
        alignItems: 'stretch',
        height: 150,
    },
    message: {
        fontSize: 15,
        textAlign: 'center',
        margin: 5
    },
    textsty:{
        fontSize:30,
        textAlign:'center',
        margin:30,
    },
    inputsty:{
        height:50,
        width:120,
        //borderColor: 'gray',
        //borderWidth: 20,
        marginLeft:300,
        marginTop:20,
        fontSize: 35,
    },
});

module .exports=try1;
