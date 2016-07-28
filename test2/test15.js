/**
 * Created by DELL on 2016-1-15.
 * 小测试——跟读单词
 * 未完成——TTS、STT
 */


'use strict';
var test15 = require('./../test/test15');
var React = require('react-native');
var transfer = require('./../test/transfer')
var SimpleAlert = require('react-native-simpledialog-android');

var {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    } = React;

var ImageButton = React.createClass({
    render: function() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor='white'>
                <Image
                    style={{width:80,height:80,margin:20}}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    },
});


//主视图
var test15 = React.createClass({
    getInitialState: function() {
        return {
            user: [],
            //  word: this.props.word1,
            word:'love',
            ans1: '',
            ans2:'',
            real1:0,
            real2:0,
            gold:this.props.gold,
            statequestion:this.props.statequestion,
            difficulty:this.props.difficulty,
            flag:0,
            result1:0,
        };
    },

    componentDidMount: function() {
        //这里获取从Login传递过来的参数: user

        var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/listWordResource.action?content=' + this.state.word;
        this.getDateFromServe(hh,1);
        this.setState({
            user: this.props.paramsUser
        });
        if(!this.state.gold)
        {
            this.setState({
                gold:3,
            })
        }
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
    },

    _handleResponse1(responseText) {

        var jonstr = JSON.parse(responseText);
        var picture1 = 'http://172.19.203.116:8080/iqasweb/'+jonstr.result.data[0].wordpicture;
        var word = jonstr.result.data[0].content;
        this.setState({
            pic1: picture1,
            word: word,
        })

    },

    _wrong(){
        var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/middletest.action?UserId=2141002035&TestKnowledgeId=' + this.state.word + '&TestType=4&TestAspect=4&TestDifficulty='
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
                    name: 'test15',
                    component: test15,
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
                    name: 'test15',
                    component: test15,
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
        var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/middletest.action?UserId=2141002035&TestKnowledgeId=' + this.state.word + '&TestType=4&TestAspect=4&TestDifficulty='
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
                component: require('./../test/transfer'),
                //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                params: {
                    //user: JSON.stringify(this.state.user)
                    paramsUser: this.state.user,
                    statequestion:this.state.statequestion
                }
            })
        }
    },

    _realword(word,num1) {
        var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/middletest.action?UserId=2141002035&TestKnowledgeId=' + word
            .then((response) => response.text())
            .then(responseText => {
                switch(id) {
                    case 1: this._handleResponse2(responseText,num1); break;
                }
            })
            .catch((error) => {
                this.setState({
                    Message: "捕获到错误",
                })
            });
        //this.setState({
        //    real1:1,
        //    real2:1,
        //})
    },


    _handleResponse2(responseText,num1) {

        var jonstr = JSON.parse(responseText);
        var real=jonstr.result.data[0].result;
        if(num1==1)
            this.setState({
                real1:real,
            })
        else
            this.setState({
                real2:real,
            })

    },

    _choose(num) {
        switch(num) {
            case 1:
            {
                this._realword(this.state.ans1,1);
                if(this.state.real1==0)
                {
                    SimpleAlert.alert('回答的不对哟~','请再学习学习吧！',[
                        {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._wrong()}
                    ])
                }
                else if(this.state.ans1[0]!=this.state.word[this.state.word.length-1])
                {
                    SimpleAlert.alert('回答的不对哟~','请再学习学习吧！',[
                        {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._wrong()}
                    ])
                }
                else
                {
                    this.setState({
                        flag:1,
                    })
                }
                break;
            }

            case 2:
            {
                if (this.state.ans1 == '') {
                    SimpleAlert.alert('oop~', '请先填写第一个单词！', [
                        {type: SimpleAlert.POSITIVE_BUTTON, text: 'OK!'}
                    ])
                }
                else {
                    this._realword(this.state.ans2, 2);
                    if (this.state.real2 == 0) {
                        SimpleAlert.alert('回答的不对哟~','请再学习学习吧！',[
                            {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._wrong()}
                        ])
                    }
                    else if (this.state.ans2[0] != this.state.ans1[this.state.ans1.length - 1]) {
                        SimpleAlert.alert('回答的不对哟~','请再学习学习吧！',[
                            {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._wrong()}
                        ])
                    }
                    else {
                        SimpleAlert.alert('你真棒！~','获得'+this.state.gold+'枚金币',[
                            {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._right()}
                        ])
                    }
                }
                break;
            }

            case 4:
            {
                SimpleAlert.alert('你不知道？~','请再学习学习吧！',[
                    {type: SimpleAlert.POSITIVE_BUTTON,text:'OK!',onPress:()=>this._wrong()}
                ])
            }
        };
    },


    render: function() {
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
                                        <Text style = {{fontSize:30,marginLeft: 30}}>Can you find the words like that? </Text>
                                        <Text style = {{fontSize:30,marginLeft: 30,textAlign: 'center'}}>blue -> egg -> good </Text>
                                        <View style = {styles.piccontainer}>
                                            <View>
                                                <View style={{flexDirection : 'row',margin:40,justifyContent: 'center'}}>
                                                    <Text style = {{fontSize:30, marginTop:20}}> {this.state.word} </Text>
                                                    <Text style = {{fontSize:30, marginTop:20}}> -> </Text>
                                                    <TextInput
                                                        style={styles.inputsty}
                                                        onChangeText={(text) => this.setState({ans1:text})}
                                                        onSubmitEditing={()=>this._choose(1)}
                                                    />
                                                    <Text style = {{fontSize:30, marginTop:20}}> -> </Text>
                                                    <TextInput
                                                        style={styles.inputsty}
                                                        onChangeText={(text) => this.setState({ans2:text})}
                                                        onSubmitEditing={()=>this._choose(2)}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <Text style = {{fontSize:20,marginLeft: 30,marginTop:30}}>Tips: the first letter of a word is the last letter of the previous word. </Text>
                                        <View style = {{justifyContent: 'center',flexDirection : 'row',flex:1,marginLeft:100,}}>
                                            <Image source={require('./../image/test/idontknow.png') } style = {{width:80,height:80}} />
                                            <Text style={{fontSize:25,marginTop:40}} onPress = {()=>this._choose(4)}>我不会诶</Text>
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

    textsty2: {
        flex: 1,
        fontSize: 40,
        marginLeft:100,
        marginTop:20,
        textAlign: 'center',
        fontFamily: 'Cochin',
        color: 'blue'
    },

    textsty3: {
        flex: 1,
        fontSize: 30,
        marginTop:20,
        marginLeft:50,
        textAlign: 'center',
        fontFamily: 'Cochin',
    },

    //Let's go 按钮
    button: {
        height: 67,
        width: 200,
        borderRadius:  8,
        //justifyContent: 'center'
    },

    piccontainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    picsty: {
        width: 200,
        height: 200,
        marginTop: 30,
        marginLeft:100,
        justifyContent: 'center',

    },

    picsty3:{
        flexDirection:'row',
        justifyContent: 'center',
        marginLeft:70,
        marginTop:30,

    },
    inputsty:{
        height:50,
        width:150,
        borderColor: 'gray',
        borderWidth: 10,
        marginTop:20,
        marginLeft:5,
        fontSize: 30,

    }
});

module .exports=test15;
