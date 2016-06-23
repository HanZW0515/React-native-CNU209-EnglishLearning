'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Image,
    StyleSheet,
    NativeModules,
} from 'react-native';

var record = require('react-native-record-sound');
import SpeechAndroid from 'react-native-android-voice';
var ToastAndroid = NativeModules.ToastAndroid;

var try1 = React.createClass ({

    getInitialState: function() {
        return {
            result: 'No picture taken yet',
            img: 'http://placehold.it/350x350'
        };
    },

    async takePicture() {
        this.setState({
            result:'aaaaa',
        })
        try{
            //More Locales will be available upon release.
            var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.GERMAN);
            ToastAndroid.show(spokenText , ToastAndroid.LONG);
        }catch(error){
            switch(error){
                case SpeechAndroid.E_VOICE_CANCELLED:
                    ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
                    break;
                case SpeechAndroid.E_NO_MATCH:
                    ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
                    break;
                case SpeechAndroid.E_SERVER_ERROR:
                    ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
                    break;
                /*And more errors that will be documented on Docs upon release*/
            }
        }
        this.setState({
            result:spokenText,
        })
    },

    render : function () {
        return (
            <View style={styles.container}>
                <Text style = {styles.textsty} onPress={()=>this.takePicture()}>start recording</Text>
                <Text style = {styles.textsty}>stop recording</Text>
                <Text style = {styles.textsty}>{this.state.result}</Text>
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
    }
});

module .exports=try1;
