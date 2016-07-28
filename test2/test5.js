/**
 * Created by DELL on 2016-1-15.
 * 小测试——跟读单词
 * 未完成——TTS、STT
 */


'use strict';
var test5 = require('./../test/test5');
import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
var transfer = require('./../test/test6')
var Voice = require( 'react-native-voice')

//var SpeechAndroid = require('react-native-nadroid-voice')
//var tts = require('react-native-android-speech')
//var {
//    BaiduVoise,
//    SpeechRecognizer
//    }=require('react-native-voise');

var ImageButton = React.createClass({
    render: function() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor='white'>
                <Image
                    style={{width:80,height:80,margin:20}}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    },
});

var ImageButton2 = React.createClass({               //自定义图片按钮插件
    render: function() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor='white'>
                <Image
                    style={{width:35,height:35,marginLeft:80}}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    },
});

//主视图
var test5 = React.createClass({
    getInitialState: function() {
        return {
            user: [],
            //word: this.props.word1,
            word:'love',
            pic1: 'http://pic7.nipic.com/20100517/2351483_094149081309_2.jpg',
            gold:this.props.gold,
            statequestion:this.props.statequestion,
            difficulty:this.props.difficulty,
            flag:1,
            sentence:'',
            tips:0,

            recognized: '',
            pitch: '',
            error: '',
            end: '',
            started: '',
            results: ['123'],
            partialResults: [],
        };
    },

    componentDidMount: function() {
        //这里获取从Login传递过来的参数: user

        var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/listWordResource.action?content=' + this.state.word;
        this.getDateFromServe(hh,1);
        this.setState({
            user: this.props.paramsUser
        });
        if(!this.state.gold)
        {
            this.setState({
                gold:3,
            })
        }
        this.setState({
            user: this.props.paramsUser
        });
    },

    getDateFromServe(url, id) {
        fetch(url)
            .then((response) => response.text())
            .then(responseText => {
                switch(id) {
                    case 1: this._handleResponse1(responseText); break;
                }
            })
            .catch((error) => {
                this.setState({
                    Message: "捕获到错误",
                })
            });
    },

    _handleResponse1(responseText) {

        var jonstr = JSON.parse(responseText);
        //var picture1 = 'http://172.19.203.116:8080/iqasweb/'+jonstr.result.data[0].wordpicture;
        //var word = jonstr.result.data[0].content;
        var picture1 ='http://pic.baike.soso.com/p/20110203/20110203145510-1983833411.jpg';
        var word = 'love';
        this.setState({
            pic1: picture1,
            word: word,
        })

    },

    _wrong(){
        var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/middletest.action?UserId=2141002035&TestKnowledgeId=' + this.state.word + '&TestType=4&TestAspect=4&TestDifficulty='
            + this.state.difficulty + '&Pass=0&tempcoin=' + this.state.gold
        fetch(hh)
            .then((response) => response.text())
            .then(responseText => {
                switch(id) {
                    case 1:  break;
                }
            })
            .catch((error) => {
                this.setState({
                    Message: "捕获到错误",
                })
            });

        if(this.state.gold == 1) {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'test5',
                    component: test5,
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        gold: this.state.gold,
                        statequestion:this.state.statequestion,
                        word1:this.state.word1,
                    }
                })
            }
        }
        else{
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'test5',
                    component: test5,
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        gold: this.state.gold-1,
                        statequestion:this.state.statequestion,
                        word1:this.state.word1,
                    }
                })
            }
        }
    },

    _right(){
        var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/middletest.action?UserId=2141002035&TestKnowledgeId=' + this.state.word + '&TestType=4&TestAspect=4&TestDifficulty='
            + this.state.difficulty + '&Pass=1&tempcoin=' + this.state.gold
        fetch(hh)
            .then((response) => response.text())
            .then(responseText => {
                switch(id) {
                    case 1:  break;
                }
            })
            .catch((error) => {
                this.setState({
                    Message: "捕获到错误",
                })
            });

        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'transfer',
                component: require('./../test2/test6'),
                //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                params: {
                    //user: JSON.stringify(this.state.user)
                    paramsUser: this.state.user,
                    statequestion:this.state.statequestion
                }
            })
        }
    },

    _choose() {
        var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/middletest.action?UserId=2141002035&TestKnowledgeId=' + this.state.word + '&TestType=4&TestAspect=4&TestDifficulty='
            + this.state.difficulty + '&Pass=1&tempcoin=' + this.state.gold
        fetch(hh)
            .then((response) => response.text())
            .then(responseText => {
                switch(id) {
                    case 1:  break;
                }
            })
            .catch((error) => {
                this.setState({
                    Message: "捕获到错误",
                })
            });
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'transfer',
                component: require('./../test2/test6'),

                //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                params: {
                    //user: JSON.stringify(this.state.user)
                    paramsUser: this.state.user,
                    statequestion:this.state.statequestion
                }
            })
        }
    },


    _tipschange()
    {
        this.setState({
            tips:1,
        })
    },

    render: function() {
        if(this.state.tips == 0) {var tipsim = (<ImageButton2 onPress={()=>this._tipschange()} source={require('./../image/test/tips.jpg')}/>)}
        else{var tipsim = (<Text style={{fontSize:20}}>课文原句:{this.state.sentence}</Text>)}
        return (
            <View style={styles.container}>

                <View style={styles.content}>
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/test/pretest_background.png') }>
                        <View style={styles.content}>
                            {/*图片上放*/}
                            {/*上侧：对话框*/}
                            <View style={styles.content_top}>
                                <Image style={{width: 800, height: 500, marginLeft:130}} resizeMode='stretch' source={require('./../image/test/dialogue_box.png') }>
                                    <View style={styles.content_text}>
                                        <Text style = {{fontSize:30,marginLeft: 30}}>Can you read the word aloud? </Text>
                                        <View style = {styles.piccontainer}>
                                            <Image style={styles.picsty} source={{uri:this.state.pic1}} />
                                            <View>
                                                <Text  style = {styles.textsty2}>{this.state.word1}</Text>
                                                <View style={styles.picsty3}>
                                                    <ImageButton source={require('./../image/test/ico_audio.png') } onPress={()=>this._right(this)} />
                                                    <ImageButton source={require('./../image/test/ico_reading.png') }  onPress={()=>this._right(this)}/>
                                                </View>
                                                <Text style={styles.textsty3}>你的声音：</Text>
                                            </View>
                                        </View>
                                        <View style = {{flexDirection : 'row',alignSelf:'center',marginTop:10}}>
                                            {tipsim}
                                        </View>
                                        <View style = {{justifyContent: 'center',flexDirection : 'row',marginTop:-20,marginLeft:70}}>
                                            <Image source={require('./../image/test/idontknow.png') } style = {{width:80,height:80}} />
                                            <Text style={{fontSize:25,marginTop:40}} onPress = {()=>this._choose(4)}>我不认识诶</Text>
                                        </View>

                                    </View>
                                </Image>
                            </View>

                            {/*下侧*/}
                            {/*Peale*/}
                            <View style={styles.content_bottom}>
                                <View style={styles.content_bottom_left}>
                                    <Image source={require('./../image/test/peal.png')} style={{width:200,height:200,marginTop:110}}>
                                    </Image>
                                </View>

                            </View>
                        </View>
                    </Image>
                </View>

                {/*页脚*/}
                <View style={[styles.footer,{height: 40}]}>
                    <Text style={[styles.text,{ color: 'grey'}]}>首都师范大学</Text>
                    <Text>用户信息:{JSON.stringify(this.state.user)}</Text>
                </View>
            </View>
        );
    },


});


//样式
var styles;
styles = StyleSheet.create({
    //大视图整体样式
    container :{
        //borderColor:"#9370DB",//紫色
        //borderWidth:3,

        flexDirection: 'column',//垂直分
        width:1024,
        height:743,
        alignItems: 'center'//水平居中
    },

    //界面
    content : {
        //borderColor:"#FFC0CB",//粉红色
        //borderWidth:3,

        flexDirection: 'column',//垂直分
        flex :19,//占container的19份

        //alignItems: 'center',//水平居中
    },

    //页脚
    footer :{
        borderColor:'#c0c0c0',//灰色色
        borderWidth:1,
        flex:1,//占container的1份

        width: 1024,
        alignItems: 'center',//水平居中
        justifyContent: 'center'//垂直居中
    },

    //界面内上侧
    content_top :{
        //borderColor:'#FFFF00',//黄色
        //borderWidth:3,
        flex:1,//占content的1份

        alignItems: 'center',//水平居中
        marginTop: 50,
        //justifyContent: 'flex-end'//垂直居中
    },

    //对话文字框架
    content_text :{
        //borderColor:'#FFFF00',//黄色
        //borderWidth:3,
        width:500,
        marginTop: 30,
        marginLeft: 130
    },

    //对话文字字体
    content_text_type :{
        fontSize: 30
    },

    //对话文字框架
    content_botton :{
        //borderColor:'#FFFF00',//黄色
        //borderWidth:3,

        justifyContent: 'space-around',//每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
        flexDirection: 'row',//水平分
        marginTop: 30,
        width:500,

    },

    //界面内下侧
    content_bottom : {
        //borderColor:'#006400',//深绿色
        //borderWidth:3,
        flex:1,//占content的1份

        marginBottom: 50,//下侧预留50

    },

    //界面内下左侧
    content_bottom_left : {
        //borderColor:"#9370DB",//紫色
        //borderWidth:3,
        flex:1,//占1份

        marginLeft: 150,//左侧预留50

    },

    //页脚文字格式
    text: {
        fontSize: 15
    },

    textsty2: {
        flex: 1,
        fontSize: 40,
        marginLeft:100,
        marginTop:20,
        textAlign: 'center',
        fontFamily: 'Cochin',
        color: 'blue'
    },

    textsty3: {
        flex: 1,
        fontSize: 30,
        marginLeft:60,
        marginTop:0,
        textAlign: 'center',
        fontFamily: 'Cochin',
    },

    //Let's go 按钮
    button: {
        height: 67,
        width: 200,
        borderRadius:  8,
        //justifyContent: 'center'
    },

    piccontainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    picsty: {
        width: 200,
        height: 200,
        marginTop: 30,
        marginLeft:100,
        justifyContent: 'center',

    },

    picsty3:{
        flexDirection:'row',
        justifyContent: 'center',
        marginLeft:50,
    }
});

module .exports=test5;
