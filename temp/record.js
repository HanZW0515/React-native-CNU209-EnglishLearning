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


var ToastAndroid = NativeModules.ToastAndroid;
import Record from 'react-native-record-sound';
//import {AudioRecorder, AudioUtils} from 'react-native-audio';

var try1 = React.createClass ({

    getInitialState: function() {
        return {
            result: 'No picture taken yet',
            img: 'http://placehold.it/350x350'
        };
    },

    //async takePicture() {
    //    try{
    //        //More Locales will be available upon release.
    //        var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.ENGLISH);
    //        this.setState({
    //            result:spokenText
    //        })
    //    }catch(error){
    //        switch(error){
    //            case SpeechAndroid.E_VOICE_CANCELLED:
    //                this.setState({
    //                    result:'Voice Recognizer cancelled'
    //                })
    //                break;
    //            case SpeechAndroid.E_NO_MATCH:
    //                this.setState({
    //                    result:'No match for what you said'
    //                })
    //                break;
    //            case SpeechAndroid.E_SERVER_ERROR:
    //                this.setState({
    //                    result:'Google Server Error'
    //                })
    //                break;
    //            /*And more errors that will be documented on Docs upon release*/
    //        }
    //    }
    //    this.setState({
    //        result:spokenText,
    //    })
    //},
    //
    _tts(){

//import the module
        let AudioRecorder = require('react-native-audio-android');
        let audioRecorder = new AudioRecorder();

//to start recording audio:
        audioRecorder.startAudioRecording((success) => {
            console.log(success);
        }, (error) => {
            console.log(error);
        });


        //to stop recording audio:

        audioRecorder.stopAudioRecording((result) => console.log(result));
    },
    //
    //recording(){
    //    var path = 'D:/'
    //    if (isRecording === false)
    //        Record.startRecord(path + 'sound.mp4');
    //    else
    //        Record.stopRecord();
    //    isRecording = !isRecording;
    //},
    //
    //record(){
    //    let audioRecorder = new AudioRecorder();
    //    audioRecorder.startAudioRecording((success) => {
    //        this.setState({
    //            result:success
    //        })
    //    }, (error) => {
    //        this.setState({
    //            result:error
    //        })
    //    });
    //},

    render : function () {
        return (
            <View style={styles.container}>
                <Text style = {styles.textsty} onPress={()=>this._tts()}>start recording</Text>
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
