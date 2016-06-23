/**
 * Created by DELL on 2016-1-19.
 * 合作过关测试
 * 唱歌测试——APPLE TREE
 * 未完成——录音部分不完善、界面没有用弹性盒子
 */

'use strict';
//var test7 = require('./test/test7');

var React = require('react-native');
var Sound = require('react-native-sound');                 //引入播放声音插件
var {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    } = React;

var ImageButton = React.createClass({                       //自定义一个图片按钮插件
    render: function() {
        return (                                           //图片点击后为白色底色
            <TouchableHighlight onPress={this.props.onPress} underlayColor='white'>
                <Image
                    style={{width:100,height:100,margin:20}}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    },
});

var appletree = new Sound('appletree.mp3', Sound.MAIN_BUNDLE, (error) => {        //声音播放插件，第一个参数为歌曲名字，以下都是播放插件的各种参数
    if (error) {
        console.log('failed to load the sound', error);
    } else { // loaded successfully
        console.log('duration in seconds: ' + appletree.duration +
            'number of channels: ' + appletree.numberOfChannels);
    }
});

// Play the sound with an onEnd callback
appletree.play((success) => {                                                  //播放函数
    if (success) {
        console.log('successfully finished playing');
    } else {
        console.log('playback failed due to audio decoding errors');
    }
});

// Reduce the volume by half
appletree.setVolume(0.5);

// Position the sound to the full right in a stereo field
appletree.setPan(1);

// Loop indefinitely until stop() is called
appletree.setNumberOfLoops(-1);

// Seek to a specific point in seconds
appletree.setCurrentTime(2.5);

// Get the current playback point in seconds
appletree.getCurrentTime((seconds) => console.log('at ' + seconds));

// Pause the sound
appletree.pause();

// Stop the sound and rewind to the beginning
appletree.stop();

// Release the audio player resource
appletree.release();



//主视图
var leveltestlow1 = React.createClass({
    getInitialState: function() {        //初始数据
        return {
            user: [],                 //用户ID
            songName: '《Apple tree》',                  //歌曲名字
            songLyric:' Apple round,apple red.\n Apple juicy apple sweet.\n Apple apple I love you,\n Apple sweet I love to eat.',         //歌曲歌词
            flag:1,
        };
    },

    componentDidMount: function() {
        this.setState({
            user: this.props.paramsUser           //接受上个界面的参数
        });
    },

    //应该为录音模块，暂未完成，只实现跳转功能
    _choose() {
        var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/finalScene.html?userName=123&num=1';
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


       // 添加跳转部分
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'leveltest_low2',
                component: require('./leveltest_low2'),

                //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                params: {
                    //user: JSON.stringify(this.state.user)
                    paramsUser: this.state.user
                }
            })
        }
    },

    _board(){
        //播放函数
        if (this.state.flag == 1)        //标志位，为1的时候播放，为0的时候暂停
        {
            appletree.play();
            this.setState({
                flag : 0,
            })
        }
        else
        {
            appletree.pause();
            this.setState({
                flag:1,
            })
        }

    },

    //主视图
    render: function() {
        return (
            <View style={styles.container}>


                <View style={styles.content}>
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/test/pretest_background.png') }>
                        <View style={styles.content}>
                            {/*图片上放*/}
                            {/*上侧：对话框*/}
                            <View style={styles.content_top}>
                                <Text style={styles.textsty}>Let's sing a song!</Text>
                                <View style={{flexDirection: 'row',flex:2}}>
                                    <View>
                                        <Text style={styles.textsty2}>{this.state.songName}</Text>
                                        {/*播放按钮和录音按钮*/}
                                        <View style={{flexDirection: 'row'}}>
                                            <ImageButton onPress={()=>this._board()} source={require('./../image/preTest/ico_audio.png')} />
                                            <ImageButton onPress={()=>this._choose()} source={require('./../image/test/ico_reading.png')} />
                                        </View>
                                    </View>
                                    {/*歌词显示*/}
                                    <View>
                                        <Text style={{fontSize:30,marginLeft:50}}>{this.state.songLyric}</Text>
                                    </View>
                                </View>
                                {/*下方图片*/}
                                <View style={{flex:2,flexDirection: 'row'}}>
                                    <Image source={require('./../image/test/music.jpg')} style={{width:500,height:200}}/>
                                    <Image source={require('./../image/welcome/peal.png')} style={{width:200,height:200,marginTop:0,}}/>
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

    //大标题
    textsty: {
        flex: 1,
        fontSize: 40,
        marginTop:50,
        textAlign: 'center',
        fontFamily: 'Cochin',
        color: 'blue'
    },

    //歌曲名
    textsty2: {
        fontSize: 40,
        marginLeft:0,
        marginTop:0,
        //     textAlign: 'center',
        fontFamily: 'Cochin',
    },

});

module .exports=leveltestlow1;
