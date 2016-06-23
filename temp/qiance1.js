/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

/**
 * 韩子威编写——未完成
 * 小测试&前测，图片三选一
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

var nextQuestion = require('./nextQuestion');

//定义自定义组件——图片按钮
var ImageButton = React.createClass({
    render: function() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor="aaa==ddd?green:red">
                <Image
                    style={styles.picsty}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    },
});

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

            <Text style = {styles.textsty}>你认识这个单词么</Text>
            <Text style = {styles.textsty2}>{abc}</Text>
            <View style = {styles.picbig}>
                <ImageButton onPress={this._panduan()} source={{uri:aaa}} />
                <ImageButton onPress={this._panduan()} source={{uri:bbb}}/>
                <ImageButton onPress={this._panduan()} source={{uri:ccc}}/>
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
        fontSize: 50,
        textAlign: 'center',
        fontFamily: 'Cochin',
        color: 'blue'
    },
    //图片大样式
    picbig: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    //三张图片样式
    picsty: {
        width: 250,
        height: 250,
        margin: 50,

    },

});

AppRegistry.registerComponent('hello', () => hello);
