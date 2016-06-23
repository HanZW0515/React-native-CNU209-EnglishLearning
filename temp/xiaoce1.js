/**
 * Created by 子威 on 2015-12-29.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

/**
 * 韩子威编写——未完成
 * 小测试，看图片判断
 */

'use strict';

var aaa='http://pic7.nipic.com/20100517/2351483_094149081309_2.jpg';
var bbb='http://a2.att.hudong.com/25/28/20300000241358132220287662900_02_250_250.jpg';
var ccc='http://a3.att.hudong.com/84/25/01300000556468129298254115888.jpg';
var ddd='http://pic7.nipic.com/20100517/2351483_094149081309_2.jpg';


var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    View,
    TouchableHighlight,
    } = React;


//主视图
var hello = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
    },
    _panduan:function(){
        const {navigator} = this.props;
        if(navigator)
        {
            navigator.push({
                name:'nextQuestion',
                component:nextQuestion,
            })
        }
    },


    render: function() {
        var abc='house' ;
        return (
            <Image source = {require('./image/u26.png')} style={{width:1440,height:900}}>
                <View style={styles.topbig}>

                    <Text style = {styles.textsty}>这个单词说的是这个图片的意思么</Text>
                    <View style = {styles.picbig}>
                        <Image style={styles.picsty} source={{uri:aaa}} />
                        <View>
                            <Text  style = {styles.textsty2}>{abc}</Text>
                            <View style={styles.picsty3}>
                                <Text onPress={this._panduan()} style={styles.picsty2} > 真   </Text>
                                <Text onPress={this._panduan()} style={styles.picsty2}> 假   </Text>
                            </View>
                        </View>
                    </View>
                    <View style = {{justifyContent: 'center',flexDirection : 'row',padding:20}}>
                        <Image source={{uri:'http://www.qq1234.org/uploads/allimg/150415/8_150415152954_2.jpg'}} style = {{width:100,height:100}} />
                        <Text id="text1" style={{fontSize:30,marginTop:30}} onPress = {()=>this._panduan()}>我不认识诶</Text>
                    </View>
                </View>
            </Image>
        );
    },


});


//样式
var styles;
styles = StyleSheet.create({
    //大视图整体样式
    topbig: {
        flexDirection: 'column',
        padding: 20,

    },
    //文本样式
    textsty: {
        flex: 1,
        fontSize: 40,
        textAlign: 'left',
        marginLeft: 100,
        marginTop: 100,
        fontFamily: 'Cochin',

    },
    //文本样式2（单词）
    textsty2: {
        flex: 1,
        fontSize: 80,
        marginLeft:250,
        marginTop:80,
        textAlign: 'center',
        fontFamily: 'Cochin',
        color: 'blue'
    },
    //图片大样式
    picbig: {
        flex: 3,
        flexDirection: 'row',
    },
    //三张图片样式
    picsty: {
        width: 400,
        height: 400,
        marginTop: 80,
        marginLeft:200,
        justifyContent: 'center',

    },

    picsty2:{
        fontSize: 100,
        marginTop:40,
        marginLeft:60,
        flexDirection:'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'red',
    },

    picsty3:{
        flexDirection:'row',
        justifyContent: 'center',
        marginLeft:100,
        marginTop:20,
    }
});

AppRegistry.registerComponent('hello', () => hello);
