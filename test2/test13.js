/**
 * Created by DELL on 2016-1-15.
 * 小测试——听力选图片
 * 未完成——TTS、STT
 */

'use strict';

var test13 = require('./../test/test13');
var transfer = require('./../test/test14');
var SimpleAlert = require('react-native-simpledialog-android');
var React = require('react-native');
var {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableHighlight
    } = React;

var ImageButton = React.createClass({
    render: function() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor='white'>
                <Image
                    style={{width:180,height:180,marginLeft:20}}
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
                    style={{width:35,height:35,marginLeft:80}}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    },
});

//主视图
var test13 = React.createClass({
    getInitialState: function() {
        return {
            user: [],
          //  word1: this.props.word1,
            word:'love',
            word1:'horse',
            word2:'smile',
            word3:'house',
            pic1: 'http://i222.photobucket.com/albums/dd71/DrivingHorse/Horses%20777/IMG_0002_zpsd911ecac.jpg',
            pic2: 'http://img.wdjimg.com/mms/icon/v1/d/13/d44c2d1bc932ff689825cb81ae2e913d_256_256.png',
            pic3: 'http://static.panoramio.com/photos/large/31801307.png',
            ans:'null',
            gold:this.props.gold,
            statequestion:this.props.statequestion,
            difficulty:this.props.difficulty,
            sentence:'I love you',
            tips:0,
            result1:0,           //选择第一张图片，标志位变动，0为初始状态，显示选项图片，1为正确，显示对勾图片，2位错误显示叉子图片
            result2:0,
            result3:0,
        };
    },
    componentDidMount: function() {
        var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/listWordResource.html?content='+ this.state.word;
        this.getDateFromServe(hh,1);
        if(!this.state.gold)
        {
            this.setState({
                gold:3,
            })
        }
        this.setState({
            user: this.props.paramsUser
        });
        this._sentencerep();
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

    _wrong(){
        var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/middletest.html?UserId=2141002035&TestKnowledgeId=' + this.state.word + '&TestType=2&TestAspect=2&TestDifficulty='
            + this.state.difficulty + '&Pass=0&tempcoin=' + this.state.gold
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

        if(this.state.gold == 1) {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'test13',
                    component: test13,
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        gold: this.state.gold,
                        statequestion:this.state.statequestion,
                        word1:this.state.word1,
                    }
                })
            }
        }
        else{
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'test13',
                    component: test13,
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        gold: this.state.gold-1,
                        statequestion:this.state.statequestion,
                        word1:this.state.word1,
                    }
                })
            }
        }
    },

    _right(){
        var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/middletest.html?UserId=2141002035&TestKnowledgeId=' + this.state.word + '&TestType=2&TestAspect=2&TestDifficulty='
            + this.state.difficulty + '&Pass=1&tempcoin=' + this.state.gold
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
                name: 'transfer',
                component: require('./../test2/test14'),
                //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                params: {
                    //user: JSON.stringify(this.state.user)
                    paramsUser: this.state.user,
                    statequestion:this.state.statequestion
                }
            })
        }
    },

    _choose(num) {
        switch(num) {
            case 1:
            {if(this.state.pic1==this.state.ans) {this.setState(
                {result1:1}
            )            //alert插件，弹出对话框，提示正确错误
                SimpleAlert.alert('你真棒！~','获得'+this.state.gold+'枚金币',[
                    {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._right()}
                ])
            }
            else
            {this.setState(
                {result1:2}
            );
                SimpleAlert.alert('回答的不对哟~','请再学习学习吧！',[
                    {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._wrong()}
                ])
            }
                break;}
            case 2:
            {if(this.state.pic2==this.state.ans) {this.setState(
                {result2:1}
            )
                SimpleAlert.alert('你真棒！~','获得'+this.state.gold+'枚金币',[
                    {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._right()}
                ])
            }
            else {this.setState(
                {result2:2}
            );
                SimpleAlert.alert('回答的不对哟~','请再学习学习吧！',[
                    {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._wrong()}
                ])}break;}
            case 3:
            {if(this.state.pic3==this.state.ans) {this.setState(
                {result3:1}
            )
                SimpleAlert.alert('你真棒！~','获得'+this.state.gold+'枚金币',[
                    {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._right()}
                ])
            }
            else {this.setState(
                {result3:2}
            );
                SimpleAlert.alert('回答的不对哟~','请再学习学习吧！',[
                    {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._wrong()}
                ])}break;}
            case 4:
            {
                SimpleAlert.alert('你不知道？~','请再学习学习吧！',[
                    {type: SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._wrong()}
                ])
            }
        };
    },

    _tipschange()
    {
        this.setState({
            tips:1,
        })
    },

    _sentencerep(){
        var stringObj=this.state.sentence;
        var newstr=stringObj.replace(this.state.word1,"_____");
        this.setState({
            sentence:newstr,
        })
    },

    render: function() {
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
        else{var tipsim = (<Text style={{fontSize:20,marginLeft:80}}>课文原句:{this.state.sentence}</Text>)}

        return (
            <View style={styles.container}>


                <View style={styles.content}>
                    <Image style={{height: 706}} resizeMode='cover' source={require('./../image/test/pretest_background.png') }>
                        <View style={styles.content}>
                            {/*图片上放*/}
                            {/*上侧：对话框*/}
                            <View style={styles.content_top}>
                                <Image style={{width: 800, height: 500, marginLeft:130}} resizeMode='stretch' source={require('./../image/test/dialogue_box.png') }>
                                    <View style={styles.content_text}>
                                        <View style={{flexDirection : 'row'}}>
                                            <View style={{flexDirection : 'row'}}>
                                                <Text style={{fontSize : 30,marginBottom:20}}>which one is diffence </Text>
                                                <Text style={{fontSize : 30,marginBottom:20}}>from the others?</Text>
                                            </View>
                                        </View>
                                        <View style = {styles. piccontainer}>
                                            <View>
                                                {picture1}
                                                <Text style={{fontSize:30,marginLeft:70}} onPress={()=>this._choose(1)}>{this.state.word1}</Text>
                                            </View>
                                            <View>
                                                {picture2}
                                                <Text style={{fontSize:30,marginLeft:70}} onPress={()=>this._choose(2)}>{this.state.word2}</Text>
                                            </View>
                                            <View>
                                                {picture3}
                                                <Text style={{fontSize:30,marginLeft:70}} onPress={()=>this._choose(3)}>{this.state.word3}</Text>
                                            </View>
                                        </View>
                                        <View style = {{flexDirection : 'row',alignSelf:'center',flex:1,marginTop:10}}>
                                            {tipsim}
                                        </View>
                                        <View style = {{justifyContent: 'center',flexDirection : 'row',flex:1,marginTop:-20,marginLeft:60}}>
                                            <Image source={require('./../image/test/idontknow.png') } style = {{width:80,height:80}} />
                                            <Text style={{fontSize:25,marginTop:40}} onPress = {()=>this._choose(4)}>我不认识诶</Text>
                                        </View>
                                    </View>
                                </Image>
                            </View>

                            {/*下侧*/}
                            {/*Peale*/}
                            <View style={styles.content_bottom}>
                                <View style={styles.content_bottom_left}>
                                    <Image source={require('./../image/test/peal.png')} style={{width:200,height:200,marginTop:110}}>
                                    </Image>
                                </View>

                            </View>
                        </View>
                    </Image>
                </View>

                {/*页脚*/}
                <View style={[styles.footer,{height: 40}]}>
                    <Text style={[styles.text,{ color: 'grey'}]}>首都师范大学</Text>
                    <Text>用户信息:{JSON.stringify(this.state.user)}</Text>
                </View>
            </View>
        );
    },


});


//样式
var styles;
styles = StyleSheet.create({
    //大视图整体样式
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
        flex :19,//占container的19份

        //alignItems: 'center',//水平居中
    },

    //页脚
    footer :{
        borderColor:'#c0c0c0',//灰色色
        borderWidth:1,
        flex:1,//占container的1份

        width: 1024,
        alignItems: 'center',//水平居中
        justifyContent: 'center'//垂直居中
    },

    //界面内上侧
    content_top :{
        //borderColor:'#FFFF00',//黄色
        //borderWidth:3,
        flex:1,//占content的1份

        alignItems: 'center',//水平居中
        marginTop: 50,
        //justifyContent: 'flex-end'//垂直居中
    },

    //对话文字框架
    content_text :{
        //borderColor:'#FFFF00',//黄色
        //borderWidth:3,
        width:500,
        marginTop: 30,
        marginLeft: 130
    },

    //对话文字字体
    content_text_type :{
        fontSize: 30
    },

    //对话文字框架
    content_botton :{
        //borderColor:'#FFFF00',//黄色
        //borderWidth:3,

        justifyContent: 'space-around',//每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
        flexDirection: 'row',//水平分
        marginTop: 30,
        width:500,

    },

    //界面内下侧
    content_bottom : {
        //borderColor:'#006400',//深绿色
        //borderWidth:3,
        flex:1,//占content的1份

        marginBottom: 50,//下侧预留50

    },

    //界面内下左侧
    content_bottom_left : {
        //borderColor:"#9370DB",//紫色
        //borderWidth:3,
        flex:1,//占1份

        marginLeft: 150,//左侧预留50

    },

    //页脚文字格式
    text: {
        fontSize: 15
    },

    //Let's go 按钮
    button: {
        height: 67,
        width: 200,
        borderRadius:  8,
        //justifyContent: 'center'
    },

    piccontainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft:70,
    },
});

module .exports=test13;
