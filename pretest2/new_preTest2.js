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
        flexDirection: 'column',//垂直分
        width:1024,
        height:743,
        alignItems: 'center'//水平居中
    },

    //界面
    content : {
        flexDirection: 'column',//垂直分
        flex: 19,//占19份
        alignItems: 'center',//水平居中
        justifyContent: 'center'//垂直居中
    },

    //页脚
    footer :{
        borderColor:'#c0c0c0',//灰色
        borderWidth:1,
        flex:1,//占1份
        width: 1024,
        alignItems: 'center',//水平居中
        justifyContent: 'center'//垂直居中
    },

    //页脚文字格式
    text: {
        fontSize: 15
    },

    //本页面内容
    topic_container:{
        flex:1,
        marginLeft:200,
        marginTop:50,
    },

    //词汇界面框架
    word_container:{
        flex:1,
    },

    //标题
    topic: {
        fontSize: 30,
        textAlign: 'left',
        fontFamily: 'Cochin',
    },

    //单词
    word: {
        fontSize: 50,
        textAlign: 'center',
        fontFamily: 'Cochin',
        color: 'blue'
    },

    //图片内容
    pic_container: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf:'center'
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

var new_preTest2 = React.createClass({
    getInitialState(){
        return {
            user: [],

            word:'running',
            pic1:'null',
            pic2:'null',
            pic3:'null',
            sentence:'',
            ans:'http://pic7.nipic.com/20100517/2351483_094149081309_2.jpg',

            word1: 'running',
            word2: 'null2',
            word3:'null3',
            word4: 'null4',
            word5:'null5',

            flag:0,

            rightnum:0,
            wrongnum:0,

            result1:0,           //选择第一张图片，标志位变动，0为初始状态，显示选项图片，1为正确，显示对勾图片，2位错误显示叉子图片
            result2:0,
            result3:0,

            firsttime:1,

            tips:0,
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
        var picture2 = 'http://172.19.203.125:8080/iqasweb/'+jonstr.result.data[0].wordpicture1;
        var picture3 = 'http://172.19.203.125:8080/iqasweb/'+jonstr.result.data[0].wordpicture2;
        var word1 = jonstr.result.data[0].content;
        var sen = jonstr.result.data[0].propertyText;
        if (sen==''){
            sen = '抱歉，知识库中没有对应提示！'
        }
        var randomnum = (parseInt(Math.random()*3)+1);
        switch (randomnum){
            case 1:{
                this.setState({
                    pic1:picture1,
                    pic2:picture2,
                    pic3:picture3,
                    word:word1,
                    ans:picture1,
                    sentence:sen,
                },function(){
                    this.setState({
                        pic1:picture1,
                        pic2:picture2,
                        pic3:picture3,
                        word:word1,
                        ans:picture1,
                        sentence:sen,
                    })
                })
                break;
            }
            case 2:{
                this.setState({
                    pic1:picture2,
                    pic2:picture1,
                    pic3:picture3,
                    word:word1,
                    ans:picture1,
                    sentence:sen,
                },function(){
                    this.setState({
                        pic1:picture2,
                        pic2:picture1,
                        pic3:picture3,
                        word:word1,
                        ans:picture1,
                        sentence:sen,
                    })
                })
                break;
            }
            case 3:{
                this.setState({
                    pic1:picture2,
                    pic2:picture3,
                    pic3:picture1,
                    word:word1,
                    ans:picture1,
                    sentence:sen,
                },function(){
                    this.setState({
                        pic1:picture2,
                        pic2:picture3,
                        pic3:picture1,
                        word:word1,
                        ans:picture1,
                        sentence:sen,
                    })
                })
                break;
            }
        }
    },


    //跳转到下一页
    _choose(num) {
        if(this.state.flag==0){
            switch(num) {
                case 1:  //点击点一个图片
                    if(this.state.pic1==this.state.ans) {
                        this.setState({
                            result1: 1,
                            rightnum: this.state.rightnum+1,
                        });
                    }else this.setState({
                        result1:2,
                        wrongnum:this.state.wrongnum+1,
                    });
                    break;
                case 2:  //点击第二个图片
                {if(this.state.pic2==this.state.ans) this.setState(
                    {
                        result2:1,
                        rightnum:this.state.rightnum+1,
                    }
                )
                else this.setState(
                        {
                            result2:2,
                            wrongnum:this.state.wrongnum+1,
                        }
                    );break;}
                case 3:  //点击第三个图片
                {if(this.state.pic3==this.state.ans) this.setState(
                    {
                        result3:1,
                        rightnum:this.state.rightnum+1,
                    }
                )
                else this.setState(
                        {
                            result3:2,
                            wrongnum:this.state.wrongnum+1,
                        }
                    );break;}
                case 4:
                {
                    this.setState({
                        wrongnum:this.state.wrongnum+1,
                        flag:0,
                        result1:0,
                        result2:0,
                        result3:0,
                        tips:0,
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
                result2:0,
                result3:0,
                tips:0,
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
                    name: 'new_preTest3',
                    component: require('./../temp/new_preTest3'),
                })
            }
        }
        //不连续答对4道题也可升级前测等级
        else if(this.state.rightnum==4)
        {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'new_preTest3',
                    component: require('./../temp/new_preTest3'),
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
                        statelevel:2,
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

    _tipschange()
    {
        this.setState({
            tips:1,
        })
    },

    /* 渲染函数 ，通过return 返回一个布局 */
    render(){
        if(this.state.result1 == 0) {var picture1 =(<ImageButton onPress={()=>this._choose(1)} source={{uri:this.state.pic1}}/>)}
        else if(this.state.result1 == 1) {var picture1 = (<ImageButton onPress={()=>this._choose(1)} source={require('./../image/test/right.png')}/>)}
        else if(this.state.result1 == 2) {var picture1 = (<ImageButton onPress={()=>this._choose(1)} source={require('./../image/test/wrong.png')}/>)}
        if(this.state.result2 == 0) {var picture2 =(<ImageButton onPress={()=>this._choose(2)} source={{uri:this.state.pic2}}/>)}
        else if(this.state.result2 == 1) {var picture2 = (<ImageButton onPress={()=>this._choose(2)} source={require('./../image/test/right.png')}/>)}
        else if(this.state.result2 == 2) {var picture2 = (<ImageButton onPress={()=>this._choose(2)} source={require('./../image/test/wrong.png')}/>)}
        if(this.state.result3 == 0) {var picture3 =(<ImageButton onPress={()=>this._choose(3)} source={{uri:this.state.pic3}}/>)}
        else if(this.state.result3 == 1) {var picture3 = (<ImageButton onPress={()=>this._choose(3)} source={require('./../image/test/right.png')}/>)}
        else if(this.state.result3 == 2) {var picture3 = (<ImageButton onPress={()=>this._choose(3)} source={require('./../image/test/wrong.png')}/>)}

        if(this.state.tips == 0) {var tipsim = (<ImageButton2 onPress={()=>this._tipschange()} source={require('./../image/test/tips.jpg')}/>)}
        else{var tipsim = (<Text style={{fontSize:30}}>课文原句:{this.state.sentence}</Text>)}

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/preTest/pretest_background.png') }>
                        {/*主内容*/}
                        <View style={styles.topic_container}>
                            <Text style = {styles.topic}>你能指出这个单词与那幅图片的意思最相近么？</Text>
                        </View>
                        <View style={styles.word_container}>
                            <Text style = {styles.word}>{this.state.word}</Text>
                        </View>
                        <View style = {styles. pic_container}>
                            {picture1}
                            {picture2}
                            {picture3}
                        </View>
                        <View style = {{flexDirection : 'row',flex:1,alignSelf:'center'}}>
                            {tipsim}
                        </View>
                        <View style = {{flexDirection : 'row',flex:2,alignSelf:'center'}}>
                            <View style={{flex:1,justifyContent: 'center',alignSelf:'center'}}>
                                <Image source={require('./../image/preTest/idontknow.jpg') } style={{width:80,height:80}}  />
                            </View>
                            <View style={{flex:2,marginTop:70}}>
                                <Text style={{fontSize:25}} onPress = {()=>this._choose(4)}>我不认识诶</Text>
                            </View>
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

module .exports=new_preTest2;