/**
 * Created by dell on 2015-12-22.
 */

'use strict';
var React = require('react-native');

var {
    Image,
    Text,
    View,
    StyleSheet,
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

});

//class Login extends  Component {
var Store = React.createClass({

    getInitialState(){
        return {
            username: null,
            password: null,
            secure: true,
            IsLogin: false,
            Message: "NO"
        };
    },


    /* 渲染函数 ，通过return 返回一个布局 */
    render(){
        return (
            <View style={styles.container}>

                <View style={styles.content}>
                    <Text style={styles.text}>商店</Text>
                </View>

                {/*页脚*/}
                <View style={styles.footer}>
                    <Text style={[styles.text,{ color: 'grey'}]}>首都师范大学</Text>
                </View>
            </View>
        );
    }
})

module .exports=Store;