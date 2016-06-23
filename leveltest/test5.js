/**
 * Created by DELL on 2016-1-15.
 * 隐藏关测试
 * 选择十张图片
 * 未完成——全部
 */

'use strict';
var test6 = require('./../test/test5');

var React = require('react-native');
var {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableHighlight
    } = React;

var ImageButton = React.createClass({
    render: function() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor='white'>
                <Image
                    style={{width:180,height:180,marginLeft:20}}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    },
});

//主视图
var test5 = React.createClass({
    getInitialState: function() {
        return {
            user: [],
            word1: 'house',
            word2: 'horse',
            word3: 'mouse',
            pic1: 'http://pic7.nipic.com/20100517/2351483_094149081309_2.jpg',
            pic2: 'http://a2.att.hudong.com/25/28/20300000241358132220287662900_02_250_250.jpg',
            pic3: 'http://a3.att.hudong.com/84/25/01300000556468129298254115888.jpg',
            times: 0,
        };
    },

    componentDidMount: function() {
        this.setState({
            user: this.props.paramsUser
        });
    },

    _choose() {
        if(this.state.times!=2) this.setState({times:this.state.times+1});
        else {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'test6',
                    component: test6,

                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user
                    }
                })
            }
        }
    },

    render: function() {
        var sentance;
        return (
            <View style={styles.container}>


                <View style={styles.content}>
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/test/pretest_background.png') }>
                        <View style={styles.content}>
                            {/*图片上放*/}
                            {/*上侧：对话框*/}
                            <View style={styles.content_top}>
                                <Image style={{width: 800, height: 500, marginLeft:130}} resizeMode='stretch' source={require('./../image/test/dialogue_box.png') }>
                                    <View style={styles.content_text}>
                                        <View style={{flexDirection : 'row'}}>
                                            <View style={{flexDirection : 'column'}}>
                                                <Text style={{fontSize : 30}}>Select the picture </Text>
                                                <Text style={{fontSize : 30}}>according to the order of the recording. </Text>
                                            </View>
                                            <Image source={require('./../image/test/ico_audio.png') } style = {{width:60,height:60,margin:20}} />
                                        </View>
                                        <View style = {styles. piccontainer}>
                                            <View>
                                                <ImageButton onPress={()=>this._choose()} source={{uri:this.state.pic1}}/>
                                                <Text style={{fontSize:30,marginLeft:70}} onPress={()=>this._choose()}>{this.state.word1}</Text>
                                            </View>
                                            <View>
                                                <ImageButton onPress={()=>this._choose()} source={{uri:this.state.pic2}}/>
                                                <Text style={{fontSize:30,marginLeft:70}} onPress={()=>this._choose()}>{this.state.word2}</Text>
                                            </View>
                                            <View>
                                                <ImageButton onPress={()=>this._choose()} source={{uri:this.state.pic3}}/>
                                                <Text style={{fontSize:30,marginLeft:70}} onPress={()=>this._choose()}>{this.state.word3}</Text>
                                            </View>
                                        </View>
                                        <View style = {{justifyContent: 'center',flexDirection : 'row',flex:1}}>
                                            <Image source={require('./../image/test/idontknow.png') } style = {{width:80,height:80}} />
                                            <Text style={{fontSize:25,marginTop:40}} onPress = {()=>this._choose()}>我不认识诶</Text>
                                        </View>
                                    </View>
                                </Image>
                            </View>

                            {/*下侧*/}
                            {/*Peale*/}
                            <View style={styles.content_bottom}>
                                <View style={styles.content_bottom_left}>
                                    <Image source={require('./../image/test/peal.png')} style={{width:200,height:200,marginTop:110}}>
                                    </Image>
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

    piccontainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft:70,
    },
});

module .exports=test5;
