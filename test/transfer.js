/**
 * Created by DELL on 2016-1-28.
 * 中转页面
 * 未完成——后台数据未知
 */

'use strict';
var test1 = require('./../test/test1');
var test2 = require('./../test/test2');
var test3 = require('./../test/test3');
var test4 = require('./../test/test4');
var test5 = require('./../test/test5');
var learning = require('./../pretest/test');
var SimpleAlert = require('react-native-simpledialog-android');

var React = require('react-native');

var {
    Navigator,
    View
    } = React;

//主视图
var transfer = React.createClass({
    getInitialState: function() {
        return {
            statequestion:this.props.statequestion,
            gold:this.props.gold,
            rightquestion:null,
            word1:null,
            aspect1:null,
            type1:null,
            difficulty1:null,
        };
    },

    componentDidMount: function() {
        if(!this.state.gold)
        {
            this.setState({
                gold:3,
            })
        }
        if(!this.state.statequestion)
        {
            this.setState({
                statequestion:1,
            })
        }
        this.setState({
            user: this.props.paramsUser
        });

        var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/listTestWordattribute.action?num=1' ;
        if(this.state.statequestion==2)
        {
            var hh ='http://172.19.203.116:8080/iqasweb/mobile/pass/listTestWordattribute.action?num=2'
        }
        if(this.state.statequestion==3)
        {
            var hh ='http://172.19.203.116:8080/iqasweb/mobile/pass/listTestWordattribute.action?num=3'
        }
        if(this.state.statequestion==4)
        {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'leveltest',
                    component: require('./../leveltest/leveltest_low1'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                    }
                })
            }
        }
        this.getDateFromServe(hh,1);
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
                this.setState({
                    word1: jonstr.result.data[0].testKnowledgeId,
                    type1: jonstr.result.data[0].testType,
                    aspect1: jonstr.result.data[0].testAspect,
                    difficulty1: jonstr.result.data[0].difficulty,
                })
        //SimpleAlert.alert('当前正确单词',this.state.word1,[
        //    {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!'}
        //])
        this._chooseQuestion();
    },

    _chooseQuestion(){
        if(this.state.statequestion!=4)
        {
            this.setState({
                statequestion:this.state.statequestion+1,
            })
        }
        else
        {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'leveltest',
                    component: require('./../leveltest/leveltest_low1'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                    }
                })
            }
        }

        if(this.state.type1==2&&this.state.aspect1==1) {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'test1',
                    component: require('./../test/test1'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        statequestion:this.state.statequestion,
                        word1:this.state.word1,
                        difficulty:this.state.difficulty1,
                    }
                })
            }
        }
        if(this.state.type1==2&&this.state.aspect1==2) {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'test2',
                    component: require('./../test/test2'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        statequestion:this.state.statequestion,
                        word1:this.state.word1,
                        difficulty:this.state.difficulty1,
                    }
                })
            }
        }
        if(this.state.type1==3&&this.state.aspect1==2)  {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'test3',
                    component: require('./../test/test3'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        statequestion:this.state.statequestion,
                        word1:this.state.word1,
                        difficulty:this.state.difficulty1,
                    }
                })
            }
        }
        if(this.state.type1==1&&this.state.aspect1==3)  {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'test4',
                    component: require('./../test/test4'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        statequestion:this.state.statequestion,
                        word1:this.state.word1,
                        difficulty:this.state.difficulty1,
                    }
                })
            }
        }
        if(this.state.type1==4&&this.state.aspect1==4) {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'test5',
                    component: test5 = require('./../test/test5'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        statequestion:this.state.statequestion,
                        word1:this.state.word1,
                        difficulty:this.state.difficulty1,
                    }
                })
            }
        }

    },


    render: function() {
        return(
             <View></View>
        );
    },


});

module .exports=transfer;
