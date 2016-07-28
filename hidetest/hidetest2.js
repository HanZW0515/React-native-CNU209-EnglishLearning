/**
 * Created by DELL on 2016-1-14.
 * 前测——听力三选一
 * 未完成——TTS，STT
 */

'use strict';

var hidetest2 = require('./hidetest2');
var hidesuccess2 = require('./hidesuccess2');
var React = require('react-native');
var SimpleAlert = require('react-native-simpledialog-android');
var {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Image
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
        fontSize: 30,
        textAlign: 'left',
        marginLeft: 200,
        marginTop: 50,
        fontFamily: 'Cochin',
    },


    //图片框架
    piccontainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft:40,
    },

});

var ImageButton = React.createClass({
    render: function() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor='white' >
                <Image
                    style={{width:230,height:200,marginLeft:10,marginRight:10}}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    },
});

var ImageButton2 = React.createClass({
    render: function() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor='white' >
                <Image
                    style={{width:80,height:80,margin:20}}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    },
});

//class Login extends  Component {
var hidetest2 = React.createClass({

    getInitialState(){
        return {
            user: [],
            result1:0,
            result2:0,
            result3:0,
            result4:0,

            flag:0,
            number1:0,
            number2:0,
        };
    },

    componentDidMount: function() {
        //这里获取从Login传递过来的参数: user
        this.setState({
            user: this.props.paramsUser
        });
    },

    getDateFromServe(url, id) {

    },


    _choose(num){
        if(this.state.flag==1)
        {
            this.setState({
                flag: 0,
            })
            this._aftchoose(this.state.number1,num)
            return;
        }
        if(this.state.flag==0)
        {
            this.setState({
                flag: 1,
                number1: num,
            });
        }
    },


    _aftchoose(num1,num2){
        if(num1==1&&num2==6)
        {
            this.setState({
                result1:1,
                flag:0
            })
        }
        else if(num1==6&&num2==1)
        {
            this.setState({
                result1:1,
                flag:0,
            })
        }
        else if(num1==2&&num2==7)
        {
            this.setState({
                result2:1,
                flag:0,
            })
        }
        else if(num1==7&&num2==2)
        {
            this.setState({
                result2:1,
                flag:0,
            })
        }
        else if(num1==3&&num2==5)
        {
            this.setState({
                result3:1,
                flag:0,
            })
        }
        else if(num1==5&&num2==3)
        {
            this.setState({
                result3:1,
                flag:0,
            })
        }
        else if(num1==4&&num2==8)
        {
            this.setState({
                result4:1,
                flag:0,
            })
        }
        else if(num1==8&&num2==4)
        {
            this.setState({
                result4:1,
                flag:0,
            })
        }
        else {
            SimpleAlert.alert('不对哟~','好'+this.state.number1+'好想想再来一次吧！',[
                {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._right()}
            ])
        }

        if(this.state.result1==1&&this.state.result2==1&&this.state.result3==1&&this.state.result4==1)
        {
            var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/hideGrade.action?userName=123&num=2';
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
                    name: 'hidesuccess2',
                    component: hidesuccess2,
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user
                    }
                })
            }
        }
    },


    _right(){
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'hidetest2',
                component: hidetest2,
                //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                params: {
                    //user: JSON.stringify(this.state.user)
                    paramsUser: this.state.user
                }
            })
        }
    },


    /* 渲染函数 ，通过return 返回一个布局 */
    render(){
        if(this.state.result1 == 0) {var picture1 =(<ImageButton onPress={()=>this._choose(1)}source={require('./../image/country/Japan.jpg')}/>)}
        else if(this.state.result1 == 1) {var picture1 = (<ImageButton onPress={()=>this._choose(1)} source={require('./../image/test/right.png')}/>)}
        if(this.state.result1 == 0) {var picture6 =(<ImageButton onPress={()=>this._choose(6)} source={require('./../image/country/fuji.jpg')}/>)}
        else if(this.state.result1 == 1) {var picture6 = (<ImageButton onPress={()=>this._choose(6)} source={require('./../image/test/right.png')}/>)}

        if(this.state.result2 == 0) {var picture2 =(<ImageButton onPress={()=>this._choose(2)} source={require('./../image/country/America.jpg')}/>)}
        else if(this.state.result2 == 1) {var picture2 = (<ImageButton onPress={()=>this._choose(2)} source={require('./../image/test/right.png')}/>)}
        if(this.state.result2 == 0) {var picture7 =(<ImageButton onPress={()=>this._choose(7)}  source={require('./../image/country/Liberty.jpg')}/>)}
        else if(this.state.result2 == 1) {var picture7 = (<ImageButton onPress={()=>this._choose(7)} source={require('./../image/test/right.png')}/>)}

        if(this.state.result3 == 0) {var picture3 =(<ImageButton onPress={()=>this._choose(3)} source={require('./../image/country/england.jpg')}/>)}
        else if(this.state.result3 == 1) {var picture3 = (<ImageButton onPress={()=>this._choose(3)} source={require('./../image/test/right.png')}/>)}
        if(this.state.result3 == 0) {var picture5 =(<ImageButton onPress={()=>this._choose(5)} source={require('./../image/country/BigBen.jpg')}/>)}
        else if(this.state.result3 == 1) {var picture5 = (<ImageButton onPress={()=>this._choose(5)} source={require('./../image/test/right.png')}/>)}

        if(this.state.result4 == 0) {var picture4 =( <ImageButton onPress={()=>this._choose(4)} source={require('./../image/country/Australia.jpg')}/>)}
        else if(this.state.result4 == 1) {var picture4 = (<ImageButton onPress={()=>this._choose(4)} source={require('./../image/test/right.png')}/>)}
        if(this.state.result4 == 0) {var picture8 =(<ImageButton onPress={()=>this._choose(8)} source={require('./../image/country/Sydney.jpg')}/>)}
        else if(this.state.result4 == 1) {var picture8 = (<ImageButton onPress={()=>this._choose(8)} source={require('./../image/test/right.png')}/>)}

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/preTest/pretest_background.png') }>
                        <View style={{flex:1,flexDirection: 'row',}}>
                            <Text style = {styles.topictext}>匹配国家和对应国家的著名景点</Text>
                        </View>
                        <View style = {styles. piccontainer}>
                            <View>
                                {picture1}
                            </View>
                            <View>
                                {picture2}
                            </View>
                            <View>
                                {picture3}
                            </View>
                            <View>
                                {picture4}
                            </View>
                        </View>
                        <View style = {styles. piccontainer}>
                            <View>
                                {picture5}
                            </View>
                            <View>
                                {picture6}
                            </View>
                            <View>
                                {picture7}
                            </View>
                            <View>
                                {picture8}
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

module .exports = hidetest2;