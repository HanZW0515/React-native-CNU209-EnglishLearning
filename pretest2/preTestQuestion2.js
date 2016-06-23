/**
 * Created by DELL on 2016-1-14.
 * 前测——听力三选一
 * 未完成——TTS，STT
 */

'use strict';

var preTestResult = require('./preTestResult');
var pretestTransfer = require('./pretestTransfer');
var React = require('react-native');
var Sound = require('react-native-sound');
var SimpleAlert = require('react-native-simpledialog-android');
var preTestQuestion2 = require('./preTestQuestion2');
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
        flex: 1,
        fontSize: 30,
        textAlign: 'left',
        marginLeft: 200,
        marginTop: 50,
        fontFamily: 'Cochin',
    },


    //图片框架
    piccontainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
    },

});

var ImageButton = React.createClass({
    render: function() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor='white' >
                <Image
                    style={{width:200,height:200,margin:40}}
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
                    style={{width:80,height:80}}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    },
});

var whoosh = new Sound('happy.mp3', Sound.MAIN_BUNDLE, (error) => {           //音频插件，播放音乐
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
var preTestQuestion2 = React.createClass({

    getInitialState(){
        return {
            user: [],
          //  word:this.props.word,
            word:'love',
            word1: 'null',
            word2: 'null',
            word3:'null',
            pic1:'http://www.iconpng.com/png/phuzion/error.png',
            pic2:'http://www.iconpng.com/png/phuzion/error.png',
            pic3:'http://www.iconpng.com/png/phuzion/error.png',
            ans:'http://pic7.nipic.com/20100517/2351483_094149081309_2.jpg',
            right:'http://e.hiphotos.baidu.com/zhidao/pic/item/a9d3fd1f4134970a3cd78cf295cad1c8a6865d42.jpg',
            wrong:'http://www.iconpng.com/png/phuzion/error.png',
            flag:0,
            flag2:1,           //控制音频停止，播放


            statelevel:1,
            stateword:this.props.stateword,
            rightnum:this.props.rightnum,
            wrongnum:this.props.wrongnum,


            result:0,
            result1:0,           //选择第一张图片，标志位变动，0为初始状态，显示选项图片，1为正确，显示对勾图片，2位错误显示叉子图片
            result2:0,
            result3:0,
        };
    },

    componentDidMount: function() {
        //这里获取从Login传递过来的参数: user
        if(!this.state.word)
        {
            var hh= 'http://172.19.203.116:8080/iqasweb/mobile/pass/list.html?content=love'
        }
        else
        {
            var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/listWordResource.html?content=' + this.state.word;
        }
        if(this.props.statelevel)
        {
            this.setState({
                statelevel:this.props.statelevel,
            })
        }
        if(!this.state.rightnum)
        {
            this.setState({
                rightnum:0,
            })
        }
        if(!this.state.wrongnum)
        {
            this.setState({
                wrongnum:0,
            })
        }
        if(!this.state.stateword)
        {
            this.setState({
                stateword:0,
            })
        }

        this.getDateFromServe(hh,1);
        this.setState({
            user: this.props.paramsUser
        });
        SimpleAlert.alert('当前正确单词',this.state.word,[
            {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!'}
        ])
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
        //获取数据
        var jonstr = JSON.parse(responseText);
        //var picture1 = 'http://172.19.203.116:8080/iqasweb/'+jonstr.result.data[0].wordpicture;
        //var picture2 = 'http://172.19.203.116:8080/iqasweb/'+jonstr.result.data[0].wordpicture1;
        //var picture3 = 'http://172.19.203.116:8080/iqasweb/'+jonstr.result.data[0].wordpicture2;
        //var word1 = jonstr.result.data[0].content;
        //var word2 = jonstr.result.data[0].picwrongcontent1;
        //var word3 = jonstr.result.data[0].picwrongcontent2;
        var picture1 ='http://pic.baike.soso.com/p/20110203/20110203145510-1983833411.jpg';
        var picture2 ='http://pic.0513.org/forum/dvbbs/2007-8/200782221535797228.jpg';
        var picture3 ='http://a3.att.hudong.com/84/25/01300000556468129298254115888.jpg';
        //var word1 = jonstr.result.data[0].content;
        //var word2 = jonstr.result.data[0].picwrongcontent1;
        //var word3 = jonstr.result.data[0].picwrongcontent2;
        var word1 = 'love';
        var word2 = 'house';
        var word3 ='mouse';
        var randomnum = (parseInt(Math.random()*3)+1);
        switch (randomnum){
            case 1:{
                this.setState({
                    pic1:picture1,
                    pic2:picture2,
                    pic3:picture3,
                    word1:word1,
                    word2:word2,
                    word3:word3,
                    ans:picture1,
                })
                break;
            }
            case 2:{
                this.setState({
                    pic1:picture2,
                    pic2:picture1,
                    pic3:picture3,
                    word1:word2,
                    word2:word1,
                    word3:word3,
                    ans:picture1,
                })
                break;
            }
            case 3:{
                this.setState({
                    pic1:picture2,
                    pic2:picture3,
                    pic3:picture1,
                    word1:word2,
                    word2:word3,
                    word3:word1,
                    ans:picture1,
                })
                break;
            }
        }
    },


    //跳转到下一页
    _choose(num) {
        if(this.state.flag==0){
            switch(num) {
                case 1:  //点击点一个图片
                    if(this.state.pic1==this.state.ans) {
                        this.setState({
                            result1: 1,
                            rightnum: this.state.rightnum+1,
                        });
                    }else this.setState({
                                result1:2,
                                wrongnum:this.state.wrongnum+1,
                    });
                    break;
                case 2:  //点击第二个图片
                {if(this.state.pic2==this.state.ans) this.setState(
                    {
                        result2:1,
                        rightnum:this.state.rightnum+1,
                    }
                )
                else this.setState(
                        {
                            result2:2,
                            wrongnum:this.state.wrongnum+1,
                        }
                    );break;}
                case 3:  //点击第三个图片
                {if(this.state.pic3==this.state.ans) this.setState(
                    {
                        result3:1,
                        rightnum:this.state.rightnum+1,
                    }
                )
                else this.setState(
                        {
                            result3:2,
                            wrongnum:this.state.wrongnum+1,
                        }
                    );break;}
                case 4:
                {
                    whoosh.stop();                      //跳转时音乐停止
                    const {navigator} = this.props;
                    if (navigator) {
                        navigator.push({
                            name: 'pretestTransfer',
                            component:  require('./preTestQuestion1'),
                            //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                            params: {
                                //user: JSON.stringify(this.state.user)
                                paramsUser: this.state.user,
                                wrongnum:this.state.wrongnum+1,
                                rightnum:this.state.rightnum,
                                statelevel:this.state.statelevel,
                                stateword:this.state.stateword,
                            }
                        })
                    }
                }
            };
            this.setState({
                flag:1
            })
        }
        else {
            whoosh.stop();              //跳转时停止音乐
            const {navigator} = this.props;
            if (navigator) {

                //navigator.popToRoute({
                //    name: 'pretest2',
                //    component: preTestQuestion2,
                //    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                //});

                navigator.push({
                    name: 'pretestTransfer',
                    component:require('./preTestQuestion1'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        wrongnum:this.state.wrongnum,
                        rightnum:this.state.rightnum,
                        statelevel:this.state.statelevel,
                        stateword:this.state.stateword,
                    }
                })
            }
        }
    },

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
        if(this.state.result1 == 0) {var picture1 =(<ImageButton onPress={()=>this._choose(1)} source={{uri:this.state.pic1}}/>)}
        else if(this.state.result1 == 1) {var picture1 = (<ImageButton onPress={()=>this._choose(1)} source={require('./../image/test/right.png')}/>)}
        else if(this.state.result1 == 2) {var picture1 = (<ImageButton onPress={()=>this._choose(1)} source={require('./../image/test/wrong.png')}/>)}
        if(this.state.result2 == 0) {var picture2 =(<ImageButton onPress={()=>this._choose(2)} source={{uri:this.state.pic2}}/>)}
        else if(this.state.result2 == 1) {var picture2 = (<ImageButton onPress={()=>this._choose(2)} source={require('./../image/test/right.png')}/>)}
        else if(this.state.result2 == 2) {var picture2 = (<ImageButton onPress={()=>this._choose(2)} source={require('./../image/test/wrong.png')}/>)}
        if(this.state.result3 == 0) {var picture3 =(<ImageButton onPress={()=>this._choose(3)} source={{uri:this.state.pic3}}/>)}
        else if(this.state.result3 == 1) {var picture3 = (<ImageButton onPress={()=>this._choose(3)} source={require('./../image/test/right.png')}/>)}
        else if(this.state.result3 == 2) {var picture3 = (<ImageButton onPress={()=>this._choose(3)} source={require('./../image/test/wrong.png')}/>)}
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/preTest/pretest_background.png') }>
                        <Text style = {styles.topictext}>点击喇叭按钮，指指最接近你听到的单词的图片</Text>
                        <View style={{flex:1,marginLeft:300,flexDirection: 'row',}}>
                            <ImageButton2 onPress={()=>this._board()} source={require('./../image/preTest/ico_audio.png')}  />
                            <Image source={require('./../image/preTest/audio.png')} style = {{width:500,height:50,marginTop:30}} />
                        </View>
                        <View style = {styles. piccontainer}>
                            <View>
                                {picture1}
                                <Text style={{fontSize:30,marginLeft:100}} onPress={()=>this._choose(1)}>{this.state.word1}</Text>
                            </View>
                            <View>
                                {picture2}
                                <Text style={{fontSize:30,marginLeft:100}} onPress={()=>this._choose(2)}>{this.state.word2}</Text>
                            </View>
                            <View>
                                {picture3}
                                <Text style={{fontSize:30,marginLeft:100}} onPress={()=>this._choose(3)}>{this.state.word3}</Text>
                            </View>
                        </View>
                        <View style = {{justifyContent: 'center',flexDirection : 'row',padding:80}}>
                            <Image source={require('./../image/preTest/idontknow.jpg') } style = {{width:80,height:80}} />
                            <Text style={{fontSize:25,marginTop:30}} onPress = {()=>this._choose(4)}>我不认识诶</Text>
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

module .exports=preTestQuestion2;