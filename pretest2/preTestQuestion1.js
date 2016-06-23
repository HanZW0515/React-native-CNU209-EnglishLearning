/**
 * Created by DELL on 2016-1-14.
 * 前测——图片三选一
 * 前台完成
 */

'use strict';

var preTestQuestion2 = require('./preTestQuestion2');
var preTestQuestion1 = require('./preTestQuestion1');
var preTestResult = require('./preTestResult');
var React = require('react-native');
var pretestTransfer = require('./../pretest/pretestTransfer')
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
        flexDirection: 'column',//垂直分
        width:1024,
        height:743,
        alignItems: 'center'//水平居中
    },

    //界面
    content : {
        flexDirection: 'column',//垂直分
        flex: 19,//占19份
        alignItems: 'center',//水平居中
        justifyContent: 'center'//垂直居中
    },

    //页脚
    footer :{
        borderColor:'#c0c0c0',//灰色
        borderWidth:1,
        flex:1,//占1份
        width: 1024,
        alignItems: 'center',//水平居中
        justifyContent: 'center'//垂直居中
    },

    //页脚文字格式
    text: {
        fontSize: 15
    },

    //本页面内容
    topic_container:{
        flex:1,
        marginLeft:200,
        marginTop:50,
    },

    //词汇界面框架
    word_container:{
        flex:1,
    },

    //标题
    topic: {
        fontSize: 30,
        textAlign: 'left',
        fontFamily: 'Cochin',
    },

    //单词
    word: {
        fontSize: 50,
        textAlign: 'center',
        fontFamily: 'Cochin',
        color: 'blue'
    },

    //图片内容
    pic_container: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf:'center'
    },

});

var ImageButton = React.createClass({               //自定义图片按钮插件
    render: function() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor='white'>
                <Image
                    style={{width:200,height:200,margin:30}}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    },
});

var ImageButton2 = React.createClass({               //自定义图片按钮插件
    render: function() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor='white'>
                <Image
                    style={{width:70,height:70,margin:0}}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    },
});

//class Login extends  Component {
var preTestQuestion1 = React.createClass({
    getInitialState(){              //初始值
        return {
            user: [],
            //word: this.props.word,            //测试的单词
            word:'love',
            pic1:'http://pic.baike.soso.com/p/20110203/20110203145510-1983833411.jpg',
            pic2:'http://pic.0513.org/forum/dvbbs/2007-8/200782221535797228.jpg',
            pic3:'http://a3.att.hudong.com/84/25/01300000556468129298254115888.jpg',
            ans:'http://pic.baike.soso.com/p/20110203/20110203145510-1983833411.jpg',           //正确图片选项
            sentence:'I love you.',
            flag:0,            //回答一次显示对勾叉子，再次点击跳转。标志符
            tips:0,

            result:0,
            result1:0,           //选择第一张图片，标志位变动，0为初始状态，显示选项图片，1为正确，显示对勾图片，2位错误显示叉子图片
            result2:0,
            result3:0,

            statelevel:2,
            stateword:this.props.stateword,
            rightnum:this.props.rightnum,
            wrongnum:this.props.wrongnum,

        };
    },

    componentDidMount: function() {
        //从服务器访问接口，告诉他要测试的知识点，获取该知识点的选项图片等信息
        if(!this.state.word)
        {
            this.setState({
                word:'love'
            })
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


        var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/listWordResource.html?content=' + this.state.word;
        this.getDateFromServe(hh,1);
        this.setState({
            user: this.props.paramsUser
        });
    },

    getDateFromServe(url, id) {
        //获取数据，进入case1
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
        //根据接收的数据，赋值给参数
        var jonstr = JSON.parse(responseText);
        var pictures1 = 'http://172.19.203.116:8080/iqasweb/'+jonstr.result.data[0].wordpicture;
        var pictures2 = 'http://172.19.203.116:8080/iqasweb/'+jonstr.result.data[0].wordpicture1;
        var pictures3 = 'http://172.19.203.116:8080/iqasweb/'+jonstr.result.data[0].wordpicture2;
        var randomnum = (parseInt(Math.random()*3)+1);         //随机数，决定第几个是正确选项
        switch (randomnum){
            case 1:{
                this.setState({
                    pic1:pictures1,
                    pic2:pictures2,
                    pic3:pictures3,
                    ans:pictures1,
                })
                break;
            }
            case 2:{
                this.setState({
                    pic1:pictures2,
                    pic2:pictures1,
                    pic3:pictures3,
                    ans:pictures1,
                })
                break;
            }
            case 3:{
                this.setState({
                    pic1:pictures2,
                    pic2:pictures3,
                    pic3:pictures1,
                    ans:pictures1,
                })
                break;
            }
        }

    },

    _choose(num) {
        //点击事件，判断正确与否
        this.setState({stateword:this.state.stateword++,})
        if(this.state.flag==0){
        switch(num) {
            case 1:  //点击点一个图片
            {if(this.state.pic1==this.state.ans) this.setState(
                    {
                        result1:1,
                        rightnum:this.state.rightnum+1,
                    }
                );
                else this.setState(
                    {
                        result1:2,
                        wrongnum:this.state.wrongnum+1,
                    }
                );break;}
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
              case 4:   //点击我也不知道
                {
                    this.setState(
                        {
                            wrongnum:this.state.wrongnum+1,
                        }
                    )
                    const {navigator} = this.props;
                    if (navigator) {
                        navigator.push({
                            name: 'pretestTransfer',
                            component:require('./preTestQuestion3'),

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
        };
            this.setState({   //只要点击过一次后，改变标志位
                flag:1
            })
        }
        else {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'pretestTransfer',
                    component: require('./preTestQuestion3'),
                    params: {
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

    _tipschange()
    {
      this.setState({
          tips:1,
      })
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

        if(this.state.tips == 0) {var tipsim = (<ImageButton2 onPress={()=>this._tipschange()} source={require('./../image/test/tips.jpg')}/>)}
        else{var tipsim = (<Text style={{fontSize:30}}>课文原句:{this.state.sentence}</Text>)}

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/preTest/pretest_background.png') }>
                        {/*主内容*/}
                        <View style={styles.topic_container}>
                              <Text style = {styles.topic}>你能指出这个单词与那幅图片的意思最相近么？</Text>
                        </View>
                        <View style={styles.word_container}>
                            <Text style = {styles.word}>{this.state.word}</Text>
                        </View>
                        <View style = {styles. pic_container}>
                            {picture1}
                            {picture2}
                            {picture3}
                        </View>
                        <View style = {{flexDirection : 'row',flex:1,alignSelf:'center'}}>
                            {tipsim}
                        </View>
                        <View style = {{flexDirection : 'row',flex:2,alignSelf:'center'}}>
                            <View style={{flex:1,justifyContent: 'center',alignSelf:'center'}}>
                                <Image source={require('./../image/preTest/idontknow.jpg') } style={{width:80,height:80}}  />
                            </View>
                            <View style={{flex:2,marginTop:70}}>
                                <Text style={{fontSize:25}} onPress = {()=>this._choose(4)}>我不认识诶</Text>
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

module .exports=preTestQuestion1;