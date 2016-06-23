/**
 * Created by DELL on 2016-3-2.
 */


'use strict';
var hidetest1 = require('./hidetest2');
//var Video = require('react-native-video');
import Video from 'react-native-video';
var SimpleAlert = require('react-native-simpledialog-android');
var React = require('react-native');
var {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    } = React;


//主视图
var hidemovie2 = React.createClass({
    getInitialState: function() {
        return {
            user: [],
            paused:false
        };
    },

    componentDidMount: function() {
        this.setState({
            user: this.props.paramsUser
        });
    },

    onGoPressed(){
        this.setState({
            paused:true,
        })
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'hidetest1',
                component: hidetest1,

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
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/preTest/pretest_background.png') }>
                        <View style={styles.content}>
                            {/*图片上放*/}
                            {/*上侧：对话框*/}

                            <View style={styles.content_top}>
                                <Text style={styles.content_text_type}>隐藏关2——我们一起周游世界！</Text>
                                <Video source={{uri:'travel'}} // Can be a URL or a local file.
                                       rate={1.0}                   // 0 is paused, 1 is normal.
                                       volume={1.0}                 // 0 is muted, 1 is normal.
                                       muted={false}                // Mutes the audio entirely.
                                       paused={this.state.paused}               // Pauses playback entirely.
                                       resizeMode="contain"           // Fill the whole screen at aspect ratio.
                                       repeat={false}                // Repeat forever.
                                       onLoadStart={this.loadStart} // Callback when video starts to load
                                       onLoad={this.setDuration}    // Callback when video loads
                                       onProgress={this.setTime}    // Callback every ~250ms with currentTime
                                       onEnd={this.onEnd}           // Callback when playback finishes
                                       onError={this.videoError}    // Callback when video cannot be loaded
                                       style={styles.backgroundVideo}
                                />
                            </View>

                            {/*下侧*/}
                            {/*Peale*/}
                            <View style={styles.content_bottom}>
                                <View style={styles.content_bottom_left}>
                                    <Image source={require('./../image/preTest/peal.png') }>
                                    </Image>
                                </View>

                                <View style={{marginLeft:900}}>
                                    <TouchableHighlight
                                        style={styles.button}
                                        underlayColor='white'
                                        onPress={() =>this.onGoPressed()}>
                                        <Image source={require('./../image/preTest/Go!.png') }/>
                                    </TouchableHighlight>
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

    //Let's go 按钮
    button: {
        height: 67,
        width: 200,
        borderRadius:  8,
        //justifyContent: 'center'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 400,
        bottom: 0,
        right: 0,
        width:600,
        height:600,
    }

});

module .exports=hidemovie2;
