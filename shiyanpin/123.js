/**
 * Created by DELL on 2016-3-3.
 */
'use strict';

var React = require('react-native');
var {
    BaiduVoise,
    SpeechRecognizer
    }=require('react-native-voise');

var {
    StyleSheet,
    View,
    Text
    } = React;

var Component = React.createClass({
    getInitialState() {
        return { result:'' }
    },
    onReceive:function (results) {
        //results is a list ,the first one is the best result.
        this.setState((state)=>{
            state.result=results[0];
        });
    },
    render: function() {
        return (
            <View style={styles.container}>
                <Text>{this.state.result}</Text>
                <BaiduVoise
                    ref={'BaiduVoise'}
                    style={styles.button}
                    api_key={'baerQ5EyrkkZcv56ksZobdlm'} //设置api_key和secret_key
                    secret_key={'0849b1d0e046d6442e26f5daf6b4f885'}
                    onReceive={this.onReceive}>
                    <Text>点击，说话</Text>
                </BaiduVoise>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container:{
        flex:1
    },
    button:{
        height:50,
    }
});


module.exports = Component;