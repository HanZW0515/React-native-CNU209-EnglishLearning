/**
 * Created by DELL on 2016-1-15.
 * 前测句子测试
 * 未完成——TTS，STT
 */


'use strict';
var test7 = require('./../leveltest/leveltest_low1');

var React = require('react-native');
var {
    Image,
    Text,
    View,
    StyleSheet,
    } = React;

//主视图
var sentencetest1 = React.createClass({
    getInitialState: function() {
        return {
            user: [],
            sentence: 'What is your name?',
            result: 'What is your name?',
        };
    },

    componentDidMount: function() {
        var word111 = 'love'
        var hh = 'http://172.19.203.151:8080/iqasweb//mobile/search/sentence.action?text=Execute,Where are you from,ok?';
        this.getDateFromServe(hh,1);
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
        var s1 = jonstr.result.data[0].text;
                this.setState({
                    sentence:s1,
                })

    },

    _choose() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'test7',
                component: test7,

                //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                params: {
                    //user: JSON.stringify(this.state.user)
                    paramsUser: this.state.user
                }
            })
        }
    },

    render: function() {
        var sentance;
        return (
            <View style={styles.container}>


                <View style={styles.content}>
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/test/pretest_background.png') }>
                        <View style={styles.topic_container}>
                            <Text style = {styles.topic}>你能听完句子后大声读出它么？</Text>
                        </View>

                        <View style={{flexDirection: 'row',flex:2,marginLeft:300}}>
                            <Image source={require('./../image/test/ico_audio.png') } style = {{width:80,height:80,margin:30,marginLeft:50}} />
                            <Text style = {styles.textsty2}> {this.state.sentence} </Text>
                        </View>

                        <View style={{flexDirection: 'row',flex:2,marginLeft:300}}>
                            <Image source={require('./../image/test/ico_reading.png') } style = {{width:80,height:80,marginLeft:50}} />
                            <Text style = {styles.textsty3}>your voice:{'\n'} {this.state.result} </Text>
                        </View>

                        <View style = {{justifyContent: 'center',flexDirection : 'row',flex:1,marginLeft:0,}}>
                            <Image source={require('./../image/test/idontknow.png') } style = {{width:80,height:80}} />
                            <Text style={{fontSize:25,marginTop:40}} onPress = {()=>this._choose()}>我不会诶</Text>
                        </View>
                        <View style={{flex:1}}>
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
        marginLeft:200,
        marginTop: 50,
        //justifyContent: 'flex-end'//垂直居中
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
    textsty2: {
        flex: 1,
        fontSize: 30,
        marginLeft:50,
        marginTop:50,
        fontFamily: 'Cochin',
        color: 'blue'
    },

    textsty3: {
        flex: 1,
        fontSize: 30,
        marginLeft:100,
        marginTop:0,
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
    },
    topic_container:{
        flex:1,
        marginLeft:200,
        marginTop:50,
    },
    topic: {
        fontSize: 30,
        textAlign: 'left',
        fontFamily: 'Cochin',
    },

});

module .exports=sentencetest1;
