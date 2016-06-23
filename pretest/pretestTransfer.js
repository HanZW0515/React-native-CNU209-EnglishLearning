/**
 * Created by DELL on 2016-3-4.
 */
/**
 * Created by DELL on 2016-1-28.
 * 中转页面
 * 未完成——后台数据未知
 */

'use strict';
var pretest = '';

var pretest1 = require('./../pretest/preTestQuestion1');
var pretest2 = require('./../pretest/preTestQuestion2');

var pretesttransfer = require('./../pretest/pretestTransfer')

var pretestResult = require('./../pretest/preTestResult');

var React = require('react-native');
var SimpleAlert = require('react-native-simpledialog-android');

var {
    Navigator,
    View,
    Text,
    } = React;

//主视图
var pretestTransfer = React.createClass({
    getInitialState: function() {
        return {
            statelevel:1,
            stateword:this.props.stateword,
            word1:'',
            word2:'',
            word3:'',
            word4:'',
            word5:'',
            sentence1:'',
            sentence2:'',
            rightnum:this.props.rightnum,
            wrongnum:this.props.wrongnum,
            rightnow:'',

        };
    },

    componentDidMount: function() {

        var hh = 'http://172.19.203.116:8080/iqasweb/mobile/pass/wordAndSentencesByGrade.html?grade=' + this.state.statelevel;
        this.setState({
            user: this.props.paramsUser
        });
        this.getDateFromServe(hh,1);
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
        var nword1=jonstr.result.data[0].word;
        var nword2=jonstr.result.data[1].word;
        var nword3=jonstr.result.data[2].word;
        var nword4=jonstr.result.data[3].word;
        var nword5=jonstr.result.data[4].word;
        this.setState({
            word1: nword1,
            word2: nword2,
            word3: nword3,
            word4: nword4,
            word5: nword5,
           // sentence1:jonstr.result.data[5].sentence,
           // sentence2:jonstr.result.data[6].sentence,
        })
        if(this.state.statelevel==1)
            this._jump();
        if(this.state.statelevel==2)
            this._jump2();
        if(this.state.statelevel==3)
            this._jump3();

    },


    _jump(){
        //测试单词+1，即考下一个单词
        this.setState({
            stateword:this.state.stateword+1
        })
        //把即将要考的单词记录到rightnow中
        switch (this.state.stateword) {
            case 1: {
                this.setState({
                    rightnow:this.state.word1
                })
                break;
            }
            case 2: {
                this.setState({
                    rightnow:this.state.word2
                })
                break;
            }
            case 3:{
                this.setState({
                    rightnow:this.state.word3
                })
                break;
            }
            case 4: {
                this.setState({
                    rightnow:this.state.word4
                })
                break;
            }
            case 5: {
                this.setState({
                    rightnow:this.state.word5
                })
                break;
            }
        }
        //连续答对3道题即可升级前测等级
        if(this.state.rightnum==3&&this.state.wrongnum==0)
        {
            this.setState({
                statelevel:this.state.statelevel+1,
                rightnum:0,
                wrongnum:0,
                stateword:0,
            })
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'pretesttransfer',
                    component: require('./../pretest/pretestTransfer'),
                    params: {
                        paramsUser: this.state.user,
                        rightnum:this.state.rightnum,
                        wrongnum:this.state.wrongnum,
                        statelevel:this.state.statelevel,
                        stateword:this.state.stateword
                    }
                })
            }
        }
        //不连续答对4道题也可升级前测等级
        else if(this.state.rightnum==1)
        {
            this.setState({
                statelevel:this.state.statelevel+1,
                rightnum:0,
                wrongnum:0,
                stateword:0,
            })
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'pretesttransfer',
                    component: require('./../pretest/pretestTransfer'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        rightnum:this.state.rightnum,
                        wrongnum:this.state.wrongnum,
                        statelevel:this.state.statelevel,
                        stateword:this.state.stateword
                    }
                })
            }
        }
        //错两道题即结束测试
        else if(this.state.wrongnum == 2)
        {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'preTestResult',
                    component: require('./../pretest/preTestResult'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        statelevel:this.state.statelevel,
                        stateword:this.state.stateword
                    }
                })
            }
        }
        //其他情况正常测试，跳转到合适他难度的题型
        else
        {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'pretest2',
                    component: require('./../pretest/preTestQuestion2'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        word:this.state.rightnow,
                        rightnum:this.state.rightnum,
                        wrongnum:this.state.wrongnum,
                        stateword:this.state.stateword
                    }
                })
            }
        }
    },

    _jump2(){
        this.setState({
            stateword:this.state.stateword+1
        })
        switch (this.state.stateword) {
            case 1: {
                this.setState({
                    rightnow:this.state.word1
                })
                break;
            }
            case 2: {
                this.setState({
                    rightnow:this.state.word2
                })
                break;
            }
            case 3:{
                this.setState({
                    rightnow:this.state.word3
                })
                break;
            }
            case 4: {
                this.setState({
                    rightnow:this.state.word4
                })
                break;
            }
            case 5: {
                this.setState({
                    rightnow:this.state.word5
                })
                break;
            }
            //case 6: {
            //    this.setState({
            //        rightnow:this.state.sentence1
            //    })
            //    break;
            //}
            //case 7: {
            //    this.setState({
            //        rightnow:this.state.sentence2
            //    })
            //    break;
            // }
        }
        if(this.state.rightnum==3&&this.state.wrongnum==0)
        {
            this.setState({
                statelevel:this.state.statelevel+1,
                rightnum:0,
                wrongnum:0,
                stateword:0,
            })
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'pretesttransfer',
                    component: require('./../pretest/pretestTransfer'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        rightnum:this.state.rightnum,
                        wrongnum:this.state.wrongnum,
                        statelevel:this.state.statelevel,
                        stateword:this.state.stateword
                    }
                })
            }
        }
        else if(this.state.rightnum==1)
        {
            this.setState({
                statelevel:this.state.statelevel+1,
                rightnum:0,
                wrongnum:0,
                stateword:0,
            })
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'pretesttransfer',
                    component: require('./../pretest/pretestTransfer'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        rightnum:this.state.rightnum,
                        wrongnum:this.state.wrongnum,
                        statelevel:this.state.statelevel,
                        stateword:this.state.stateword
                    }
                })
            }
        }
        else if(this.state.wrongnum == 2)
        {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'preTestResult',
                    component: require('./../pretest/preTestResult'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        statelevel:this.state.statelevel,
                        stateword:this.state.stateword
                    }
                })
            }
        }
        else
        {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'pretest1',
                   component: require('./../pretest/preTestQuestion1'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        word:this.state.rightnow,
                        rightnum:this.state.rightnum,
                        wrongnum:this.state.wrongnum,
                        stateword:this.state.stateword
                    }
                })
            }
        }
    },

    _jump3(){
        this.setState({
            stateword:this.state.stateword+1
        })
        switch (this.state.stateword) {
            case 1: {
                this.setState({
                    rightnow:this.state.word1
                })
                break;
            }
            case 2: {
                this.setState({
                    rightnow:this.state.word2
                })
                break;
            }
            case 3:{
                this.setState({
                    rightnow:this.state.word3
                })
                break;
            }
            case 4: {
                this.setState({
                    rightnow:this.state.word4
                })
                break;
            }
            case 5: {
                this.setState({
                    rightnow:this.state.word5
                })
                break;
            }
            //case 6: {
            //    this.setState({
            //        rightnow:this.state.sentence1
            //    })
            //    break;
            //}
            //case 7: {
            //    this.setState({
            //        rightnow:this.state.sentence2
            //    })
            //    break;
            // }
        }
        if(this.state.rightnum==3&&this.state.wrongnum==0)
        {
            this.setState({
                statelevel:this.state.statelevel+1,
                rightnum:0,
                wrongnum:0,
                stateword:0,
            })
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'preTestResult',
                    component: require('./../pretest/preTestResult'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        rightnum:this.state.rightnum,
                        wrongnum:this.state.wrongnum,
                        statelevel:this.state.statelevel,
                        stateword:this.state.stateword
                    }
                })
            }
        }
        else if(this.state.rightnum==4)
        {
            this.setState({
                statelevel:this.state.statelevel+1,
                rightnum:0,
                wrongnum:0,
                stateword:0,
            })
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'preTestResult',
                    component: require('./../pretest/preTestResult'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        rightnum:this.state.rightnum,
                        wrongnum:this.state.wrongnum,
                        statelevel:this.state.statelevel,
                        stateword:this.state.stateword
                    }
                })
            }
        }
        else if(this.state.wrongnum == 2)
        {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'preTestResult',
                    component: require('./../pretest/preTestResult'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        statelevel:this.state.statelevel,
                        stateword:this.state.stateword
                    }
                })
            }
        }
        else
        {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    name: 'pretest3',
                    component: require('./../pretest/preTestQuestion3'),
                    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                    params: {
                        //user: JSON.stringify(this.state.user)
                        paramsUser: this.state.user,
                        word:this.state.rightnow,
                        rightnum:this.state.rightnum,
                        wrongnum:this.state.wrongnum,
                        stateword:this.state.stateword
                    }
                })
            }
        }
    },

    render: function() {
        return(
            <View>
            </View>
        );
    },


});

module .exports=pretestTransfer;