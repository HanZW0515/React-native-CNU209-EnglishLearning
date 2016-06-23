/**
 * Created by DELL on 2016-1-14.
 * 前测——听力三选一
 * 未完成——TTS，STT
 */

'use strict';

var SimpleAlert = require('react-native-simpledialog-android');
var preTestResult = require('./preTestResult');
var pretestTransfer = require('./pretestTransfer');
var React = require('react-native');
var preTestQuestion4 = require('./preTestQuestion4');
var {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput
    } = React;

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
        width:500,
        borderColor: 'gray',
        borderWidth: 10,
        fontSize: 30,
        alignItems: 'center',
        marginTop:80,
    },
    textsty3: {
        fontSize: 40,
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

var preTestQuestion4 = React.createClass({
    getInitialState(){
        return {
            user: [],
            //word:this.props.word,
            sentence:'What is your name ?',
            ans: 'null',

            score:100,


            statelevel:4,
            stateword:this.props.stateword,
            rightnum:this.props.rightnum,
            wrongnum:this.props.wrongnum,

            result1:0,           //选择第一张图片，标志位变动，0为初始状态，显示选项图片，1为正确，显示对勾图片，2位错误显示叉子图片

        };
    },

    componentDidMount: function() {
        //这里获取从Login传递过来的参数: user
        if(!this.state.sentence)
        {
            this.setState({
                sentence:'What is your name',
            })
        }
        else
        {
            var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/SentencesByGrade.html?grade=4';
        }

        if(this.props.statelevel)
        {
            this.setState({
                statelevel:this.props.statelevel,
            })
        }
        if(!this.state.rightnum)
        {
            this.setState({
                rightnum:0,
            })
        }

        if(!this.state.wrongnum)
        {
            this.setState({
                wrongnum:0,
            })
        }

        if(!this.state.stateword)
        {
            this.setState({
                stateword:0,
            })
        }

        this.getDateFromServe(hh,1);
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
        //SimpleAlert.alert('当前正确单词',this.state.word+this.state.newword,[
        //    {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!'}
        //])
    },

    _handleResponse1(responseText) {
        //获取数据
        var jonstr = JSON.parse(responseText);
        var sentence = jonstr.result.data[0].Sentences;
        this.setState({
            sentence:sentence,
        })
    },

    _handleResponse2(responseText) {
        //获取数据
        var jonstr = JSON.parse(responseText);
        var score1 = jonstr.result.data[0].similarityDegree;
        this.setState({
            score:score1,
        })
        SimpleAlert.alert('你真棒！~','获得'+this.state.score+'枚金币',[
            {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._right()}
        ])
    },

    //跳转到下一页
    _choose(num) {
        if(this.state.flag==0) {
            switch (num) {
                case 1:  //点击点一个图片
                    var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/simanswer.html?question=' + this.state.sentence;
                    fetch(hh)
                        .then((response) => response.text())
                        .then(responseText => {
                            switch (id) {
                                case 1:
                                    this._handleResponse2(responseText);
                                    break;
                            }
                        })
                        .catch((error) => {
                            this.setState({
                                Message: "捕获到错误",
                            })
                        });
                    if (this.state.score >= 0.8) {
                        this.setState({
                            result1: 1,
                            rightnum: this.state.rightnum + 1,
                        });
                    } else this.setState({
                        result1: 2,
                        wrongnum: this.state.wrongnum + 1,
                    });
                    const {navigator} = this.props;
                    if (navigator) {
                        navigator.push({
                            name: 'pretestTransfer',
                            component: require('./preTestResult'),
                            //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                            params: {
                                //user: JSON.stringify(this.state.user)
                                paramsUser: this.state.user,
                                wrongnum: this.state.wrongnum,
                                rightnum: this.state.rightnum,
                                statelevel: this.state.statelevel,
                                stateword: this.state.stateword,
                            }
                        })
                    }
                    break;
                case 4:
                {
                    const {navigator} = this.props;
                    if (navigator) {
                        navigator.push({
                            name: 'pretestTransfer',
                            component: require('./preTestResult'),
                            //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                            params: {
                                //user: JSON.stringify(this.state.user)
                                paramsUser: this.state.user,
                                wrongnum: this.state.wrongnum + 1,
                                rightnum: this.state.rightnum,
                                statelevel: this.state.statelevel,
                                stateword: this.state.stateword,
                            }
                        })
                    }
                }
            }
            ;
        }
    },


    /* 渲染函数 ，通过return 返回一个布局 */
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/preTest/pretest_background.png') }>

                        <Text style = {styles.topictext}>你能根据我的答案给出问句么？</Text>

                        <View style = {styles. piccontainer}>

                            <View style = {{alignItems: 'center', justifyContent: 'center',flex:1,flexDirection:'row'}}>
                                 <TextInput
                                 style={styles.inputsty}
                                 onChangeText={(text) => this.setState({ans:text})}
                                 onSubmitEditing={()=>this._choose(1)}
                                 />
                                <Image source={{uri:'http://c.hiphotos.baidu.com/baike/w%3D268/sign=755993d41c4c510faec4e51c58592528/ac345982b2b7d0a2fee94981cdef76094b369a8e.jpg'}} style={{height:100,width:100}}/>
                            </View>

                            <View style = {{alignItems: 'center',justifyContent: 'center',flex:1,flexDirection:'row'}}>
                                <Image source={require('./../image/test/peal.png')} style={{height:100,width:100}}/>
                                <Text style={styles.textsty3}>{this.state.sentence}</Text>
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

module .exports=preTestQuestion4;