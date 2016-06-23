/**
 * Created by 子威 on 2016-1-8.
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

/**
 * 韩子威编写——未完成
 * 小测试&前测，图片三选一
 */

'use strict';
var xiaoce1 = require('./xiaoce1');

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
    TextInput,
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
                name: 'xiaoce1',
                component: xiaoce1,
            })
        }
    },


    render: function() {
        var abc='house' ;
        return (
            <Image source={require('./image/u26.png')}  style={{width:1440,height:900}}>
                <View style={styles.topbig}>

                    <Text style = {styles.textsty}>你能根据已给的字母和图片补全单词么</Text>
                    <View style = {styles.picbig}>
                        <View style={{paddingRight:180}}>
                            <Image style={styles.picsty} source={{uri:aaa}} />
                            <View style = {{flexDirection : 'row',marginLeft:120}}>
                                <Text style={styles.textsty3}>h</Text>
                                <TextInput
                                    style={styles.inputsty}
                                    onChangeText={(text) => this.setState({text})}
                                    value={this.state.text}
                                />
                                <Text style={styles.textsty3}>se</Text>
                            </View>
                        </View>

                        <View>
                            <Image style={styles.picsty} source={{uri:aaa}} />
                            <View style = {{flexDirection : 'row',marginLeft:120}}>
                                <Text style={styles.textsty3}>h</Text>
                                <TextInput
                                    style={styles.inputsty}
                                    onChangeText={(text) => this.setState({text})}
                                    value={this.state.text}
                                />
                                <Text style={styles.textsty3}>se</Text>
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
        marginTop: 80,
        marginLeft:100,
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
    textsty3: {
        flex: 1,
        fontSize: 40,
        textAlign: 'left',
        marginTop: 80,
        fontFamily: 'Cochin',
    },
    //图片大样式
    picbig: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingRight:80,
    },
    //三张图片样式
    picsty: {
        width: 250,
        height: 250,
        marginTop: 80,
        marginLeft:80,
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
    },
    inputsty:{
        height:50,
        width:100,
        borderColor: 'gray',
        borderWidth: 10,
        marginTop:80,
        fontSize: 40,

    }

});

AppRegistry.registerComponent('hello', () => hello);

