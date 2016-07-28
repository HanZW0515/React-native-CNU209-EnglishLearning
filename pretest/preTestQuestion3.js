/**
 * Created by DELL on 2016-1-14.
 * 前测——听力三选一
 * 未完成——TTS，STT
 */

'use strict';

var SimpleAlert = require('react-native-simpledialog-android');
var preTestResult = require('./preTestResult');
var pretestTransfer = require('./pretestTransfer');
var React = require('react-native');
var preTestQuestion3 = require('./preTestQuestion3');
var {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Image,
    TextInput
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
        flex: 4,
        justifyContent: 'center',
    },

    inputsty:{
        height:50,
        width:150,
        borderColor: 'gray',
        borderWidth: 10,
        fontSize: 30,
        alignItems: 'center',
        marginTop:80,
    },
    textsty3: {
        fontSize: 60,
        margin:30,
        textAlign: 'center',
        fontFamily: 'Cochin',
        fontWeight:'500',
    },
    textsty4: {
        fontSize: 50,
        marginTop:100,
        textAlign: 'center',
        fontFamily: 'Cochin',
        fontWeight:'100',
    },

});

var preTestQuestion3 = React.createClass({
    getInitialState(){
        return {
            user: [],
            word:this.props.word,
            //word:'horse',
            pic1: 'http://i222.photobucket.com/albums/dd71/DrivingHorse/Horses%20777/IMG_0002_zpsd911ecac.jpg',


            flag:0,

            wordlength:5,
            newword:'',

            count:0,
            result:'',

            statelevel:3,
            stateword:this.props.stateword,
            rightnum:this.props.rightnum,
            wrongnum:this.props.wrongnum,



            result1:0,           //选择第一张图片，标志位变动，0为初始状态，显示选项图片，1为正确，显示对勾图片，2位错误显示叉子图片

        };
    },

    componentDidMount: function() {
        //这里获取从Login传递过来的参数: user
        if(!this.state.word)
        {
            this.setState({
                word:'horse',
                newword:'horse',
                wordlength:5,
            })
        }
        else
        {
            var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/listWordResource.action?content=' + this.state.word;
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
        this._randomword();
        SimpleAlert.alert('当前正确单词',this.state.word+this.state.newword,[
            {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!'}
        ])
    },

    _handleResponse1(responseText) {
        //获取数据
        var jonstr = JSON.parse(responseText);
        var picture1 = 'http://172.19.203.116:8080/iqasweb/'+jonstr.result.data[0].wordpicture;
        var word1 = jonstr.result.data[0].content;
        this.setState({
                    pic1:picture1,
            //      word: word,
                    wordlength:word1.length,
                })
    },


    //跳转到下一页
    _choose(num) {
        if(this.state.flag==0){
            switch(num) {
                case 1:  //点击点一个图片
                    if(this.state.result==this.state.word) {
                        this.setState({
                            result1: 1,
                            rightnum: this.state.rightnum+1,
                        });
                    }else this.setState({
                        result1:2,
                        wrongnum:this.state.wrongnum+1,
                    });
                    break;
                case 4:
                {
                    const {navigator} = this.props;
                    if (navigator) {
                        navigator.push({
                            name: 'pretestTransfer',
                            component:  require('./pretestTransfer'),
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
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'pretestTransfer',
                    component:require('./pretestTransfer'),
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

    _randomword(){
        var randomnum;
        var temp = new Array();
        var i;
        var j;
        var lengthword;
        var newword1 = new Array();
        var newword2 = new Array();
        for(var j=0;j<this.state.word.length;j++)
            temp[j] = this.state.word[j];
        lengthword = this.state.wordlength;
        for(i=0;i<lengthword;i++){
            randomnum = (parseInt(Math.random()*(lengthword-i)));
            newword1[i]=temp[randomnum];
            temp[randomnum]=temp[lengthword-1-i];
        }
        for(j=0,i=0;i<lengthword;i++,j=j+3)
        {
            if(i==lengthword-1){newword2[j]=newword1[i];}
            else {
                newword2[j] = newword1[i];
                newword2[j + 1] = ' ';
                newword2[j + 2] = ' ';
            }
        }

        this.setState({
            newword:newword1,
        })
    },


    _spell(a)
    {
        if(this.state.count == this.state.wordlength){
            this._choose(1);
        }
        this.setState({
            result:this.state.result+a,
            count:this.state.count+1,
        })
        if(this.state.count == this.state.wordlength)
        {
            this._choose(1);
        }
    },

    /* 渲染函数 ，通过return 返回一个布局 */
    render(){
        if(this.state.result1 == 0) {var picture1 =(<Image source={{uri:this.state.pic1}} style={{width:200,height:200,marginTop:50}}/>)}
        else if(this.state.result1 == 1) {var picture1 = (<Image source={require('./../image/test/right.png')} style={{width:200,height:200,marginTop:50}}/>)}
        else if(this.state.result1 == 2) {var picture1 = (<Image source={require('./../image/test/wrong.png')} style={{width:200,height:200,marginTop:50}}/>)}

        var letter = new Array();
        var yourletter = new Array();
        for(var i=0;i<this.state.word.length;i++)
        {
            letter[i]=( <Text key={i} style={styles.textsty3}  onPress={this._spell.bind(this,this.state.newword[i])}> {this.state.newword[i]} </Text>)
        }
        for(var j=0;j<this.state.count;j++)
        {
            yourletter[j]=( <Text key={j} style={styles.textsty4}> {this.state.result[j]} </Text>)
        }

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/preTest/pretest_background.png') }>

                        <Text style = {styles.topictext}>你能给这些字母排好顺序么？</Text>

                        <View style = {styles. piccontainer}>

                            <View style = {{alignItems: 'center',justifyContent: 'center',flex:1,flexDirection:'row'}}>
                                {letter}
                            </View>

                            <View style={{alignItems: 'center', justifyContent: 'center',flex:2}}>
                                {picture1}
                            </View>

                            <View style = {{alignItems: 'center', justifyContent: 'center',flex:1,flexDirection:'row'}}>
                                {/*  <TextInput
                                    style={styles.inputsty}
                                    onChangeText={(text) => this.setState({result:text})}
                                    onSubmitEditing={()=>this._choose(1)}
                                />
                                */}
                                {yourletter}
                            </View>

                        </View>

                        <View style = {{justifyContent: 'center',flexDirection : 'row',padding:80}}>
                            <Image source={require('./../image/preTest/idontknow.jpg') } style = {{width:80,height:80}} />
                            <Text style={{fontSize:25,marginTop:30}} onPress = {()=>this._choose(4)}>我不知道诶</Text>
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

module .exports=preTestQuestion3;