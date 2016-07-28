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
    TouchableOpacity
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

    textsty3: {
        fontSize: 60,
        margin:30,
        textAlign: 'center',
        fontFamily: 'Cochin',
        fontWeight:'500',
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
            <TouchableOpacity onPress={this.props.onPress} underlayColor='white'>
                <Image
                    style={{width:200,height:200,marginTop:50}}
                    source={this.props.source}
                />
            </TouchableOpacity>
        );
    },
});

var new_preTest3 = React.createClass({
    getInitialState(){
        return {
            user: [],

            word:'fly',
            pic1:'null',

            word1: 'fly',
            word2: 'null2',
            word3:'null3',
            word4: 'null4',
            word5:'null5',

            flag:0,

            rightnum:0,
            wrongnum:0,

            result1:0,           //选择第一张图片，标志位变动，0为初始状态，显示选项图片，1为正确，显示对勾图片，2位错误显示叉子图片

            firsttime:1,

            wordlength:3,
            newword:'',

            count:0,
            result:'',
        };
    },

    componentDidMount: function() {
        if(this.state.firsttime==1){
            var getfiveword = 'http://172.19.203.125:8080/iqasweb/mobile/pass/wordByGrade.action?grade=4'         //四年级学生！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
            this.setState({
                firsttime:1,
            },function(){
                this.getDateFromServe(getfiveword,1);
            })
        }
        this._updatedata();
    },

    _updatedata(){
        switch (this.state.firsttime){
            case 1:{
                this.setState({
                    firsttime:2,
                    word:this.state.word1,
                },function(){
                    var getresource = 'http://172.19.203.125:8080/iqasweb/mobile/pass/listWordResource.action?content=' + this.state.word;
                    this.getDateFromServe(getresource,2);
                })
                break;
            }
            case 2:{
                this.setState({
                    firsttime:3,
                    word:this.state.word2,
                },function(){
                    var getresource = 'http://172.19.203.125:8080/iqasweb/mobile/pass/listWordResource.action?content=' + this.state.word;
                    this.getDateFromServe(getresource,2);
                })
                break;
            }
            case 3:{
                this.setState({
                    firsttime:4,
                    word:this.state.word3,
                },function(){
                    var getresource = 'http://172.19.203.125:8080/iqasweb/mobile/pass/listWordResource.action?content=' + this.state.word;
                    this.getDateFromServe(getresource,2);
                })
                break;
            }
            case 4:{
                this.setState({
                    firsttime:5,
                    word:this.state.word4,
                },function(){
                    var getresource = 'http://172.19.203.125:8080/iqasweb/mobile/pass/listWordResource.action?content=' + this.state.word;
                    this.getDateFromServe(getresource,2);
                })
                break;
            }
            case 5:{
                this.setState({
                    firsttime:6,
                    word:this.state.word5,
                },function(){
                    var getresource = 'http://172.19.203.125:8080/iqasweb/mobile/pass/listWordResource.action?content=' + this.state.word;
                    this.getDateFromServe(getresource,2);
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
                    case 2: this._handleResponse2(responseText); break;
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
        var nword1=jonstr.result.data[0].word0;
        var nword2=jonstr.result.data[0].word1;
        var nword3=jonstr.result.data[0].word2;
        var nword4=jonstr.result.data[0].word3;
        var nword5=jonstr.result.data[0].word4;
        this.setState({
            word1: nword1,
            word2: nword2,
            word3: nword3,
            word4: nword4,
            word5: nword5,
        },function(){})
    },

    _handleResponse2(responseText) {
        //获取数据
        var jonstr = JSON.parse(responseText);
        var picture1 = 'http://172.19.203.125:8080/iqasweb/'+jonstr.result.data[0].wordpicture;
        var word1 = jonstr.result.data[0].content;
        this.setState({
            pic1:picture1,
            word:word1,
            wordlength:word1.length,
        },function(){
            this.setState({
                pic1:picture1,
                word:word1,
                wordlength:word1.length,
            })
            this._randomword();
        })
    },

    _choose(num) {
        if(this.state.flag==0){
            switch(num) {
                case 1:  //点击点一个图片
                    if(this.state.result==this.state.word) {
                        this.setState({
                            result1: 1,
                            rightnum: this.state.rightnum+1,
                        });
                    }else this.setState({
                        result1:2,
                        wrongnum:this.state.wrongnum+1,
                    });
                    break;
                case 4:
                {
                    this.setState({
                        wrongnum:this.state.wrongnum+1,
                        flag:0,
                        result1:0,
                        count:0,
                        result:'',
                    },function(){
                        this._next();
                    })
                }
            };
            this.setState({
                flag:1
            })
        }
        else {
            this.setState({
                flag:0,
                result1:0,
                count:0,
                result:'',
            },function(){
                this._next();
            })
        }
    },

    _next(){
        if(this.state.rightnum==3&&this.state.wrongnum==0)
        {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'new_preTest4',
                    component: require('./../pretest2/new_preTest4'),
                })
            }
        }
        //不连续答对4道题也可升级前测等级
        else if(this.state.rightnum==4)
        {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'new_preTest4',
                    component: require('./../pretest2/new_preTest4'),
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
                        statelevel:this.state.statelevel,
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

    _randomword(){
        var randomnum;
        var temp = new Array();
        var i;
        var j;
        var lengthword;
        var newword1 = new Array();
        var newword2 = new Array();
        for(var j=0;j<this.state.wordlength;j++)
            temp[j] = this.state.word[j];
        lengthword = this.state.wordlength;
        for(i=0;i<lengthword;i++){
            randomnum = (parseInt(Math.random()*(lengthword-i)));
            newword1[i]=temp[randomnum];
            temp[randomnum]=temp[lengthword-1-i];
        }
        for(j=0,i=0;i<lengthword;i++,j=j+3)
        {
            if(i==lengthword-1){newword2[j]=newword1[i];}
            else {
                newword2[j] = newword1[i];
                newword2[j + 1] = ' ';
                newword2[j + 2] = ' ';
            }
        }

        this.setState({
            newword:newword1,
        })
    },

    _spell(a){
        if(this.state.count == this.state.wordlength){
            this._choose(1);
        }
        this.setState({
            result:this.state.result+a,
            count:this.state.count+1,
        })
        if(this.state.count == this.state.wordlength)
        {
            this._choose(1);
        }
    },

    _tap(){
        if(this.state.count == this.state.wordlength)
        {
            this.setState({
                flag:0,
                result1:0,
                count:0,
                result:'',
            },function(){
                this._next();
            })
        }
    },

    _clear(){
        this.setState({
            result:'',
            count:0,
        })
    },

    /* 渲染函数 ，通过return 返回一个布局 */
    render(){
        if(this.state.result1 == 0) {var picture1 =(<ImageButton source={{uri:this.state.pic1}}/>)}
        else if(this.state.result1 == 1) {var picture1 = (<ImageButton onPress={()=>this._tap()} source={require('./../image/test/right.png')}/>)}
        else if(this.state.result1 == 2) {var picture1 = (<ImageButton onPress={()=>this._tap()} source={require('./../image/test/wrong.png')}/>)}

        var letter = new Array();
        var yourletter = new Array();
        for(var i=0;i<this.state.wordlength;i++)
        {
            letter[i]=( <Text key={i} style={styles.textsty3}  onPress={this._spell.bind(this,this.state.newword[i])}> {this.state.newword[i]} </Text>)
        }
        for(var j=0;j<this.state.count;j++)
        {
            yourletter[j]=( <Text key={j} style={styles.textsty4}> {this.state.result[j]} </Text>)
        }

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/preTest/pretest_background.png') }>

                        <Text style = {styles.topictext}>你能给这些字母排好顺序么？</Text>
                        <Text style = {{marginLeft:200,marginTop:-40}}>按顺序点击字母,提示结果后点击对勾或叉子进入下一题</Text>

                        <View style = {styles. piccontainer}>

                            <View style = {{alignItems: 'center',justifyContent: 'center',flex:1,flexDirection:'row'}}>
                                {letter}
                            </View>

                            <View style={{alignItems: 'center', justifyContent: 'center',flex:2}}>
                                {picture1}
                            </View>

                            <View style = {{alignItems: 'center', justifyContent: 'center',flex:1,flexDirection:'row'}}>
                                {yourletter}
                            </View>

                            <Text onPress = {this._clear()} style = {{marginLeft:200,marginTop:-40}}>重新输入</Text>

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

module .exports=new_preTest3;