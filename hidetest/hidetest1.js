/**
 * Created by DELL on 2016-1-14.
 * 前测——听力三选一
 * 未完成——TTS，STT
 */

'use strict';

var hidetest1 = require('./hidetest1');
var hidesuccess = require('./hidesuccess');
var React = require('react-native');
var Sound = require('react-native-sound');
var SimpleAlert = require('react-native-simpledialog-android');
var {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Image
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

    //大标题文字
    topictext: {
        fontSize: 30,
        textAlign: 'left',
        marginLeft: 200,
        marginTop: 50,
        fontFamily: 'Cochin',
    },


    //图片框架
    piccontainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
    },

});

var ImageButton = React.createClass({
    render: function() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor='white' >
                <Image
                    style={{width:105,height:200,marginLeft:40,marginRight:40}}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    },
});

var ImageButton2 = React.createClass({
    render: function() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor='white' >
                <Image
                    style={{width:80,height:80,margin:20}}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    },
});

var whoosh = new Sound('hide2.mp3', Sound.MAIN_BUNDLE, (error) => {           //音频插件，播放音乐
    if (error) {
        console.log('failed to load the sound', error);
    } else { // loaded successfully
        console.log('duration in seconds: ' + whoosh.duration +
            'number of channels: ' + whoosh.numberOfChannels);
    }
});

// Play the sound with an onEnd callback
whoosh.play((success) => {                                           //播放函数
    if (success) {
        console.log('successfully finished playing');
    } else {
        console.log('playback failed due to audio decoding errors');
    }
});

// Reduce the volume by half
whoosh.setVolume(0.5);

// Position the sound to the full right in a stereo field
whoosh.setPan(1);

// Loop indefinitely until stop() is called
whoosh.setNumberOfLoops(-1);

// Get properties of the player instance
console.log('volume: ' + whoosh.getVolume());
console.log('pan: ' + whoosh.getPan());
console.log('loops: ' + whoosh.getNumberOfLoops());

// Seek to a specific point in seconds
whoosh.setCurrentTime(2.5);

// Get the current playback point in seconds
whoosh.getCurrentTime((seconds) => console.log('at ' + seconds));

// Pause the sound
whoosh.pause();

// Stop the sound and rewind to the beginning
whoosh.stop();

// Release the audio player resource
whoosh.release();


//class Login extends  Component {
var hidetest1 = React.createClass({

    getInitialState(){
        return {
            user: [],
            flag:0,
            flag2:1,           //控制音频停止，播放
            times:1,
        };
    },

    componentDidMount: function() {
        //这里获取从Login传递过来的参数: user
        this.setState({
            user: this.props.paramsUser
        });
    },





    _choose(num){
      switch(this.state.times) {
          case 1:
          {
              if(num==2){
                  this.setState({times:this.state.times+1})
              }
              else {
                  whoosh.stop();
                  SimpleAlert.alert('不对哟~','好好想想再来一次吧！',[
                      {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._right()}
                  ])
              }
              break;
          }
          case 2:
          {
              if(num==1){
                  this.setState({times:this.state.times+1})
              }
              else {
                  whoosh.stop();
                  SimpleAlert.alert('不对哟~','好好想想再来一次吧！',[
                      {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._right()}
                  ])
              }
              break;
          }
          case 3:
          {
              if(num==5){
                  this.setState({times:this.state.times+1})
              }
              else {
                  whoosh.stop();
                  SimpleAlert.alert('不对哟~','好好想想再来一次吧！',[
                      {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._right()}
                  ])
              }
              break;
          }
          case 4:
          {
              if(num==3){
                  this.setState({times:this.state.times+1})
              }
              else {
                  whoosh.stop();
                  SimpleAlert.alert('不对哟~','好好想想再来一次吧！',[
                      {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._right()}
                  ])
              }
              break;
          }
          case 5:
          {
              if(num==9){
                  this.setState({times:this.state.times+1})
              }
              else {
                  whoosh.stop();
                  SimpleAlert.alert('不对哟~','好好想想再来一次吧！',[
                      {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._right()}
                  ])
              }
              break;
          }
      }
        if(this.state.times==6)
        {
            var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/hideGrade.action?userName=123&num=1';
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

            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'hidesuccess',
                    component: hidesuccess,
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user
                    }
                })
            }
        }
    },


    _right(){
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

    //跳转到下一页

    _board(){
        //播放函数
        if (this.state.flag2 == 1)        //标志位，为1的时候播放，为0的时候暂停
        {
            whoosh.play();
            this.setState({
                flag2 : 0,
            })
        }
        else
        {
            whoosh.pause();
            this.setState({
                flag2:1,
            })
        }

    },

    /* 渲染函数 ，通过return 返回一个布局 */
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/preTest/pretest_background.png') }>
                        <View style={{flex:1,flexDirection: 'row',}}>
                        <Text style = {styles.topictext}>按照我说的颜色顺序抓住气球！</Text>
                        <ImageButton2 onPress={()=>this._board()} source={require('./../image/preTest/ico_audio.png')}  />
                        </View>
                        <View style = {styles. piccontainer}>
                            <View>
                                <ImageButton onPress={()=>this._choose(1)} source={require('./../image/color/black.jpg')}/>
                            </View>
                            <View>
                                <ImageButton onPress={()=>this._choose(2)} source={require('./../image/color/blue.jpg')}/>
                            </View>
                            <View>
                                <ImageButton onPress={()=>this._choose(3)} source={require('./../image/color/red.jpg')}/>
                            </View>
                            <View>
                                <ImageButton onPress={()=>this._choose(4)} source={require('./../image/color/pink.jpg')}/>
                            </View>
                        </View>
                        <View style = {styles. piccontainer}>
                            <View>
                                <ImageButton onPress={()=>this._choose(5)} source={require('./../image/color/green.jpg')}/>
                            </View>
                            <View>
                                <ImageButton onPress={()=>this._choose(6)} source={require('./../image/color/brown.jpg')}/>
                            </View>
                            <View>
                                <ImageButton onPress={()=>this._choose(7)} source={require('./../image/color/purple.jpg')}/>
                            </View>
                            <View>
                                <ImageButton onPress={()=>this._choose(8)} source={require('./../image/color/white.jpg')}/>
                            </View>
                            <View>
                                <ImageButton onPress={()=>this._choose(9)} source={require('./../image/color/yellow.jpg')}/>
                            </View>
                        </View>

                    </Image>
                </View>
                {/*页脚*/}
                <View style={styles.footer}>
                    <Text style={[styles.text,{ color: 'grey'}]}>首都师范大学</Text>
                    <Text>用户信息:{JSON.stringify(this.state.user)}</Text>
                </View>
            </View>
        );
    }
})

module .exports = hidetest1;