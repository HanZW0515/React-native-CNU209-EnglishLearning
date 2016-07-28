/**
 * Created by DELL on 2016-7-19.
 */
'use strict';
import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight
} from 'react-native';

var styles= StyleSheet.create({

    //总框架
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
        flex: 19,//占19份
        //width:1024,
        alignItems: 'center',//水平居中
        justifyContent: 'center'//垂直居中
    },

    //页脚
    footer :{
        borderColor:'#c0c0c0',//灰色
        borderWidth:1,
        flex:1,//占1份
        width: 1024,
        //height: 40,

        alignItems: 'center',//水平居中
        justifyContent: 'center'//垂直居中
    },

    //页脚文字格式
    text: {
        fontSize: 15
    },

    //大标题文字
    topictext: {
        flex: 1,
        fontSize: 30,
        textAlign: 'left',
        marginLeft: 200,
        marginTop: 50,
        fontFamily: 'Cochin',
    },


    //图片框架
    piccontainer: {
        flex: 4,
        justifyContent: 'center',
    },

    inputsty:{
        height:50,
        width:125,
        borderColor: 'gray',
        borderWidth: 10,
        fontSize: 30,
        alignItems: 'center',
        marginTop:10,
    },
    textsty3: {
        fontSize: 30,
        margin:30,
        textAlign: 'center',
        fontFamily: 'Cochin',
        fontWeight:'500',
    },
    textsty3r: {
        fontSize: 30,
        margin:30,
        textAlign: 'center',
        fontFamily: 'Cochin',
        fontWeight:'500',
        color:'green',
    },
    textsty3w: {
        fontSize: 30,
        margin:30,
        textAlign: 'center',
        fontFamily: 'Cochin',
        fontWeight:'500',
        color:'red',
    },
    textsty4: {
        fontSize: 50,
        marginTop:100,
        textAlign: 'center',
        fontFamily: 'Cochin',
        fontWeight:'100',
    },

});

var ImageButton = React.createClass({               //自定义图片按钮插件
    render: function() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor='white'>
                <Image
                    style={{width:200,height:200,margin:30}}
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
                    style={{width:70,height:70,margin:0}}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    },
});

var new_preTest4 = React.createClass({
    getInitialState(){
        return {
            user: [],

            question:null,
            newquestion:null,
            newwhat:null,
            ans: null,
            what:'What',

            flag:0,

            rightnum:0,
            wrongnum:0,

            result1:0,           //选择第一张图片，标志位变动，0为初始状态，显示选项图片，1为正确，显示对勾图片，2位错误显示叉子图片

            firsttime:1,
        };
    },

    componentDidMount: function() {
        this._updatedata();
    },

    _updatedata(){
        switch (this.state.firsttime){
            case 1:{
                this.setState({
                    firsttime:2,
                },function(){
                    var getresource = 'http://172.19.203.116:8080/iqasweb/mobile/pass/SentencesByGrade.action?grade=4';
                    this.getDateFromServe(getresource,1);
                })
                break;
            }
            case 2:{
                this.setState({
                    firsttime:3,
                },function(){
                    var getresource = 'http://172.19.203.116:8080/iqasweb/mobile/pass/SentencesByGrade.action?grade=4';
                    this.getDateFromServe(getresource,1);
                })
                break;
            }
            case 3:{
                this.setState({
                    firsttime:4,
                },function(){
                    var getresource = 'http://172.19.203.116:8080/iqasweb/mobile/pass/SentencesByGrade.action?grade=4';
                    this.getDateFromServe(getresource,1);
                })
                break;
            }
        }
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
        //获取数据
        var jonstr = JSON.parse(responseText);
        var sentence = jonstr.result.data[0].Answers;
        var question = jonstr.result.data[0].Questions;
        var temparr = question.split(" ");
        var newstr=question.replace(temparr[0],"");

        this.setState({
            question:question,
            newquestion:newstr,
            newwhat:temparr,
            ans: sentence,
        })
    },

    //跳转到下一页
    _choose(num) {
        if(this.state.flag==0) {
            switch (num) {
                case 1:  //点击点一个图片
                {
                    if (this.state.what == this.state.newwhat) {
                        this.setState({
                            result1: 1,
                            rightnum: this.state.rightnum + 1,
                        });
                    } else this.setState({
                        result1: 2,
                        wrongnum: this.state.wrongnum + 1,
                    });
                    break;
                }
                case 4:
                {
                    this.setState({
                        wrongnum:this.state.wrongnum+1,
                        flag:0,
                        result1:0,
                    },function(){
                        this._next();
                    })
                    break;
                }
                }
            this.setState({
                flag:1
            })
            }
        else {
            this.setState({
                flag:0,
                result1:0,
            },function(){
                this._next();
            })
        }
    },

    _next(){
        if(this.state.rightnum==2)
        {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'preTestResult',
                    component: require('./../temp/preTestResult'),
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        statelevel:5,
                    }
                })
            }
        }
        //错两道题即结束测试
        else if(this.state.wrongnum == 2)
        {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'preTestResult',
                    component: require('./../pretest/preTestResult'),
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        statelevel:4,
                    }
                })
            }
        }
        //其他情况正常测试，跳转到合适他难度的题型
        else
        {
            this._updatedata();
        }
    },

    /* 渲染函数 ，通过return 返回一个布局 */
    render(){
        if(this.state.result1 == 0) {var text =(<Text style={styles.textsty3}>{this.state.ans}</Text>)}
        else if(this.state.result1 == 1) {var text = (<Text style={styles.textsty3r}>{this.state.ans}</Text>)}
        else if(this.state.result1 == 2) {var text = (<Text style={styles.textsty3w}>{this.state.ans}</Text>)}

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/preTest/pretest_background.png') }>

                        <Text style = {styles.topictext}>你能根据我的答案给出疑问词么？（记得首字母大写哟）</Text>

                        <View style = {styles. piccontainer}>

                            <View style = {{alignItems: 'center', justifyContent: 'center',flex:1,flexDirection:'row'}}>
                                <TextInput
                                    style={styles.inputsty}
                                    onChangeText={(text) => this.setState({what:text})}
                                    onSubmitEditing={()=>this._choose(1)}
                                />
                                <Text style={styles.textsty3}>{this.state.newquestion}</Text>
                                <Image source={{uri:'http://c.hiphotos.baidu.com/baike/w%3D268/sign=755993d41c4c510faec4e51c58592528/ac345982b2b7d0a2fee94981cdef76094b369a8e.jpg'}} style={{height:100,width:100}}/>
                            </View>

                            <View style = {{alignItems: 'center',justifyContent: 'center',flex:1,flexDirection:'row'}}>
                                <Image source={require('./../image/test/peal.png')} style={{height:100,width:100}}/>
                                {text}
                            </View>

                        </View>

                        <View style = {{justifyContent: 'center',flexDirection : 'row',padding:80}}>
                            <Image source={require('./../image/preTest/idontknow.jpg') } style = {{width:80,height:80}} />
                            <Text style={{fontSize:25,marginTop:30}} onPress = {()=>this._choose(4)}>我不知道诶</Text>
                        </View>

                    </Image>
                </View>
                {/*页脚*/}
                <View style={styles.footer}>
                    <Text style={[styles.text,{ color: 'grey'}]}>首都师范大学</Text>
                    <Text>用户信息:{JSON.stringify(this.state.user)}</Text>
                </View>
            </View>
        );
    }
})

module .exports=new_preTest4;