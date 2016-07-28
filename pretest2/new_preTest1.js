/**
 * Created by DELL on 2016-7-13.
 */
'use strict';
import React, { Component } from 'react';
import Video from 'react-native-video';
import SimpleAlert from 'react-native-simpledialog-android';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight
} from 'react-native';

var styles;
styles = StyleSheet.create({
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
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
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

var new_preTest1 = React.createClass({
    getInitialState(){
        return {
            user: [],

            word:'boat',
            wrongword1:'null',
            wrongword2:'null',
            pic1:'null',
            pic2:'null',
            pic3:'null',
            sound:'http://up.2d999.com/uploads/201607/2016074d3047e05cec2437f8d6ea2a51675d13.mp3',
            ans:'http://pic7.nipic.com/20100517/2351483_094149081309_2.jpg',

            word1: 'boat',
            word2: 'null2',
            word3:'null3',
            word4: 'null4',
            word5:'null5',

            flag:0,
            flag2:true,           //控制音频停止，播放

            rightnum:0,
            wrongnum:0,

            result1:0,           //选择第一张图片，标志位变动，0为初始状态，显示选项图片，1为正确，显示对勾图片，2位错误显示叉子图片
            result2:0,
            result3:0,

            firsttime:1,
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
        var word2 = jonstr.result.data[0].picwrongcontent1;
        var word3 = jonstr.result.data[0].picwrongcontent2;
        var sound = 'http://172.19.203.125:8080/iqasweb/'+jonstr.result.data[0].audtruepath;
        var randomnum = (parseInt(Math.random()*3)+1);
        switch (randomnum){
            case 1:{
                this.setState({
                    pic1:picture1,
                    pic2:picture2,
                    pic3:picture3,
                    word:word1,
                    wrongword1:word2,
                    wrongword2:word3,
                    ans:picture1,
                    sound:sound,
                },function(){
                    this.setState({
                        pic1:picture1,
                        pic2:picture2,
                        pic3:picture3,
                        word:word1,
                        wrongword1:word2,
                        wrongword2:word3,
                        ans:picture1,
                        sound:sound,
                    })
                })
                break;
            }
            case 2:{
                this.setState({
                    pic1:picture2,
                    pic2:picture1,
                    pic3:picture3,
                    word:word2,
                    wrongword1:word1,
                    wrongword2:word3,
                    ans:picture1,
                    sound:sound,
                },function(){
                    this.setState({
                        pic1:picture2,
                        pic2:picture1,
                        pic3:picture3,
                        word:word2,
                        wrongword1:word1,
                        wrongword2:word3,
                        ans:picture1,
                        sound:sound,
                    })
                })
                break;
            }
            case 3:{
                this.setState({
                    pic1:picture2,
                    pic2:picture3,
                    pic3:picture1,
                    word:word2,
                    wrongword1:word3,
                    wrongword2:word1,
                    ans:picture1,
                    sound:sound,
                },function(){
                    this.setState({
                        pic1:picture2,
                        pic2:picture3,
                        pic3:picture1,
                        word:word2,
                        wrongword1:word3,
                        wrongword2:word1,
                        ans:picture1,
                        sound:sound,
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
                    name: 'new_preTest2',
                    component: require('./../pretest2/new_preTest2'),
                })
            }
        }
        //不连续答对4道题也可升级前测等级
        else if(this.state.rightnum==4)
        {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'new_preTest2',
                    component: require('./../pretest2/new_preTest2'),
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
                        statelevel:1,
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

    _board(){
        //播放函数
        if (this.state.flag2 == true)        //标志位，为1的时候播放，为0的时候暂停
        {
            this.setState({
                flag2: false,
            })
        }
        else
        {
            this.setState({
                flag2:true,
            })
        }
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
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/preTest/pretest_background.png') }>
                        <Text style = {styles.topictext}>点击喇叭按钮，指指最接近你听到的单词的图片</Text>
                        <View style={{flex:1,marginLeft:330,flexDirection: 'row',}}>
                            <ImageButton2 onPress={()=>this._board()} source={require('./../image/preTest/ico_audio.png')}  />
                            <Image source={require('./../image/preTest/audio.png')} style = {{width:500,height:50,marginTop:10}} />
                        </View>
                        <View style = {styles. piccontainer}>
                            <View>
                                {picture1}
                                <Text style={{fontSize:30,marginLeft:100}} onPress={()=>this._choose(1)}>{this.state.word}</Text>
                            </View>
                            <View>
                                {picture2}
                                <Text style={{fontSize:30,marginLeft:100}} onPress={()=>this._choose(2)}>{this.state.wrongword1}</Text>
                            </View>
                            <View>
                                {picture3}
                                <Text style={{fontSize:30,marginLeft:100}} onPress={()=>this._choose(3)}>{this.state.wrongword2}</Text>
                            </View>
                        </View>
                        <View style = {{justifyContent: 'center',flexDirection : 'row',padding:80}}>
                            <Image source={require('./../image/preTest/idontknow.jpg') } style = {{width:80,height:80}} />
                            <Text style={{fontSize:25,marginTop:30}} onPress = {()=>this._choose(4)}>我不认识诶</Text>
                        </View>
                    </Image>
                </View>
                {/*页脚*/}
                <View style={styles.footer}>
                    <Text style={[styles.text,{ color: 'grey'}]}>首都师范大学</Text>
                    <Text>用户信息:{JSON.stringify(this.state.user)}</Text>
                </View>
                <Video source={{uri: this.state.sound}} // Can be a URL or a local file.
                       rate={1.0}                   // 0 is paused, 1 is normal.
                       volume={1.0}                 // 0 is muted, 1 is normal.
                       muted={false}                // Mutes the audio entirely.
                       paused={this.state.flag2}               // Pauses playback entirely.
                       resizeMode="cover"           // Fill the whole screen at aspect ratio.
                       repeat={false}                // Repeat forever.
                       playInBackground={false}     // Audio continues to play when app entering background.
                       playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown.
                       onLoadStart={this.loadStart} // Callback when video starts to load
                       onLoad={this.setDuration}    // Callback when video loads
                       onProgress={this.setTime}    // Callback every ~250ms with currentTime
                       onEnd={this.onEnd}           // Callback when playback finishes
                       onError={this.videoError}    // Callback when video cannot be loaded
                />
            </View>
        );
    }
})

module .exports=new_preTest1;