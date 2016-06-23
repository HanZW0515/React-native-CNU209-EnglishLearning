/**
 * Created by 子威 on 2016-1-13.
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
var aaa='http://pic7.nipic.com/20100517/2351483_094149081309_2.jpg';

var React = require('react-native');
var {
    Alert,
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    } = React;


//主视图
var hello = React.createClass({
    getInitialState: function() {
        return {
            mytalk : "",
            temp:"",
            yourtalk:"What can I do for you ?"
        };
    },

    componentDidMount: function() {
    },

    _submit:function(){
        this.setState(
            {
                mytalk:this.state.temp,
                yourtalk : "Yes, Which do you want to see ? " +'\n'+ "图片、视频、绘本"
            }
        )
    },


    render: function() {
        var sentance;
        return (
            <Image source={require('./image/u26.png')}  style={{width:1440,height:900}}>
                <View style={styles.topbig}>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={styles.picsty} source={{uri:'http://hdn.xnimg.cn/photos/hdn421/20130810/1850/h_main_tOAd_a68300001a27113e.jpg'}} />
                        <Text style={styles.textsty}>{this.state.yourtalk}</Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textsty2}>{this.state.mytalk}</Text>
                        <Image style={styles.picsty2} source={{uri:'http://hdn.xnimg.cn/photos/hdn421/20130810/1850/h_main_tOAd_a68300001a27113e.jpg'}} />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.inputsty}
                            onChangeText={(text)=>this.setState({temp:text})}
                        />
                        <TouchableOpacity>
                            <Text style={styles.textsty3} onPress={() => this._submit()}>      发送</Text>
                        </TouchableOpacity>
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
        fontSize: 40,
        textAlign: 'right',
        marginTop: 80,
        marginRight:100,
        fontFamily: 'Cochin',
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
        width: 200,
        height: 200,
        marginTop: 80,
        marginLeft:200,
        justifyContent: 'center',

    },

    picsty2:{
        width: 200,
        height: 200,
        marginTop: 80,
        marginRight:200,
        justifyContent: 'center',
    },

    picsty3:{
        flexDirection:'row',
        justifyContent: 'center',
        marginLeft:100,
        marginTop:20,
    },
    inputsty:{
        height:80,
        width:500,
        borderColor: 'gray',
        borderWidth: 10,
        marginTop:50,
        marginLeft:400,
        fontSize: 40,

    }

});

AppRegistry.registerComponent('hello', () => hello);
