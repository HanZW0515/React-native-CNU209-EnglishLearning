/**
 * Created by DELL on 2016-4-29.
 */
/**
 * Created by DELL on 2016-1-19.
 * 合作过关测试
 * 唱歌测试——APPLE TREE
 * 未完成——录音部分不完善、界面没有用弹性盒子
 */

'use strict';
//var test7 = require('./test/test7');
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var SimpleAlert = require('react-native-simpledialog-android');
var Cordova = require('react-native-cordova-plugin');

var React = require('react-native');
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
                    style={{width:100,height:100,marginLeft:150,marginTop:20}}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    },
});

//主视图
var leveltestlow2 = React.createClass({
    getInitialState: function() {        //初始数据
        return {
            user: [],                 //用户ID
            word:'apple',
            picture:'http://pic38.nipic.com/20140223/11624852_112807687309_2.jpg',
            result: 'No picture taken yet',
            img: 'http://placehold.it/350x350',
            tips1:0,
        };
    },

    componentDidMount: function() {
        //这里获取从Login传递过来的参数: user

        var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/listWordResource.html?content=' + this.state.word;
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
        var picture1 = 'http://172.19.203.115:8080/iqasweb/'+jonstr.result.data[0].wordpicture;
        var word = jonstr.result.data[0].content;
            this.setState({
                    picture:picture1,
                    word:word,
                })
    },
    takePicture(source) {
        this.setState({
            result: '',
            tips1:1,
        });
        Cordova.navigator.camera.getPicture(
            (img) => this.setState({ img }),
            (result) => this.setState({ result }),
            { sourceType: source }
        );
    },

    //应该为录音模块，暂未完成，只实现跳转功能
    submitchoice() {
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
                name: 'hidetest',
                component: require('./../hidetest/welcomehide1'),

                //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                params: {
                    //user: JSON.stringify(this.state.user)
                    paramsUser: this.state.user
                }
            })
        }
    },

    cancelchoice(){
        this.setState({
            tips1:0,
            result: 'No picture taken yet',
            img: 'http://placehold.it/350x350',
        })
    },


    //主视图
    render: function() {
        var choice;
        var choice2;
        if(this.state.tips1 == 0){
            choice=(
            <Text style={{fontSize:20, textAlign: 'center',margin:20}} name="camera" onPress={() => this.takePicture(Cordova.Camera.PictureSourceType.CAMERA) }>Use the camera</Text>
            )
            choice2=(
                <Text style={{fontSize:20, textAlign: 'center',margin:20}} name="albums" onPress ={() => this.takePicture(Cordova.Camera.PictureSourceType.SAVEDPHOTOALBUM)}>Select a Photo</Text>
            )
        }
        else{
            choice=(
                <Text style={{fontSize:20, textAlign: 'center',margin:20}} name="camera" onPress={() => this.submitchoice() }>submit</Text>
            )
            choice2=(
                <Text style={{fontSize:20, textAlign: 'center',margin:20}} name="albums" onPress ={() => this.cancelchoice()}>cancel</Text>
            )
        }


        return (
            <View style={styles.container}>

                <View style={styles.content}>
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/test/pretest_background.png') }>
                        <View style={styles.content}>
                            {/*图片上放*/}
                            {/*上侧：对话框*/}
                            <View style={styles.content_top}>
                                <Text style={styles.textsty}>Let's print a picture!</Text>
                                <View style={{flexDirection: 'row',flex:3}}>
                                    <View>
                                        <Text style={styles.textsty2}>{this.state.word}</Text>
                                        <View style={{flexDirection: 'row'}}>
                                            <Image source={{uri:this.state.picture}} style={{width:200,height:200}}/>
                                        </View>
                                    </View>

                                    <View>
                                        <View style={{marginLeft:50}}>
                                            {choice}
                                            {choice2}
                                        </View>
                                        <Image
                                            style={styles.icon}
                                            resizeMode="contain"
                                            source={{ uri: this.state.img, isStatic: true }}>
                                        </Image>

                                    </View>

                                </View>
                                {/*下方图片*/}
                                <View style={{flex:2,flexDirection: 'row'}}>
                                    <Image source={require('./../image/welcome/peal.png')} style={{width:200,height:200,}}/>
                                    <Image source={require('./../image/test/printing.jpg')} style={{width:500,height:200}}/>
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
        marginTop:20,
        textAlign: 'center',
        fontFamily: 'Cochin',
        color: 'blue'
    },

    //歌曲名
    textsty2: {
        fontSize: 40,
        marginLeft:50,
        marginBottom:20,
        //     textAlign: 'center',
        fontFamily: 'Cochin',
    },

    avatarContainer: {
        borderColor: '#9B9B9B',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 75,
        width: 250,
        height: 250
    },
    icon: {
        alignItems: 'stretch',
        height: 150,
        marginLeft:50,
    },
});

module .exports=leveltestlow2;
