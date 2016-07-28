/**
 * Created by dell on 2015/11/25.
 */
'use strict';
var React = require('react-native');
var ForgetPassWord=require('./ForgetPassWord');
var Register = require('./Register');
var NextPage = require('./NextPage');
var {
    Image,
    TextInput,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,

    TouchableOpacity
    } = React;

var styles= StyleSheet.create({
    container :{
        borderColor:"#111232",
        borderWidth:1,
        flexDirection: 'column',
        height:680
    },
    _content : {
        borderColor:"#111232",
        borderWidth:1,
        flexDirection: 'row',
        flex :9,

    },

    footer :{
        borderWidth:1,
        borderColor:'#111232',
        flex:1,
    },

    _content_left :{
        flex:1,
        alignSelf:'flex-end',
        marginLeft:50,

    },

    photo_image: {
     height:60,
        width:60,
        marginBottom:20,
    },

    _content_right : {
        marginLeft:9,
        flex:3,
        marginTop: 200,

    },

    login_1 :{
        flexDirection: 'row',
        width:400,


    },
    _text: {
        fontSize: 18,
        alignSelf: 'center',

    },
    button: {
        height: 40,
        width:400,
        //flex: 1,
        //flexDirection: 'row',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center'
    },

    searchInput: {
        height: 60,
        width : 380,
        padding: 4,
        marginRight: 5,
        flex: 2,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },



});


//class Login extends  Component {
var Login = React.createClass({
   /* constructor(props) {
        super(props);
        this.state = {
            text:false,
            username: null,
            password: null,
            secure: true,
            isLoading: false

        };
    }
    */
    getInitialState(){
         return {
             username: null,
             password:null,
             secure :true,
             IsLogin:false,
         };
    },

    onPressForgetPassWord() {
     const {navigator} = this.props;
        if(navigator)
        {
            navigator.push({
                name:'ForgetPassWord',
                component: ForgetPassWord,
            })
        }
    },

    onPressRegister() {
      const {navigator } = this.props;
        if(navigator)
        {
            navigator.push({
                name:'Register',
                component:Register,
            })
        }
    },

    NextPage() {
        const {navigator } = this.props;
        if(navigator)
        {
            navigator.push({
                name:'NextPage',
                component:NextPage,
            })
        }
    },



    onLoginPressed() {
     /* this.setState({
            IsLogin:true
        }); */
        /*   var hh='http://192.168.0.121:8088/iqasweb/mobile/user/login.action?' + 'password='+ this.state.password +'&'+ 'username=' +this.state.username;

         fetch(hh)
         .then((response) => response.text())
         .then((responseText) => {
         console.log(responseText);
         })
         .catch((error) => {
         console.warn(error);
         })    */

    },

/* 渲染函数 ，通过return 返回一个布局 */
    render() {
      var IsLogin = this.state.IsLogin;
       if(IsLogin) {this.NextPage();}
        else {
           return (
               <View style={styles.container}>
                   <View style={styles._content}>
                       <View style={styles._content_left}>
                           <Image source={require('./image/login/peal.png') }></Image>
                       </View>
                       <View style={styles._content_right}>

                           <View style={[styles.login_1,{ marginTop:25}]}>
                               <Image source={require('./image/login/username.png')} style={styles.photo_image}/>
                               <TextInput
                                   style={styles.searchInput}
                                   onChangeText={(text)=>this.setState({username:text})}
                                   value={this.state.username}
                                   placeholder="your login name"
                               />
                           </View>

                           <View style={[styles.login_1,{marginTop:25 }]}>
                               <Image source={require('./image/login/password.png')} style={styles.photo_image}/>
                               <TextInput
                                   style={styles.searchInput}
                                   onChangeText={(text) =>this.setState({password:text})}
                                   value={this.state.password}
                                   placeholder=" password  "
                                   secureTextEntry={this.state.secure}
                               />
                           </View>

                           <View style={[styles.login_1,{height: 50}]}>
                               <TouchableOpacity  >
                                   <Text style={{marginTop:10}}
                                         onPress={() =>this.onPressForgetPassWord()}>忘记密码?</Text>
                               </TouchableOpacity>
                               <TouchableOpacity >
                                   <Text style={{marginTop:10,marginLeft:300}}
                                         onPress={() =>this.onPressRegister()}>注册</Text>
                               </TouchableOpacity>
                           </View>


                           <TouchableHighlight
                               style={styles.button}
                               underlayColor='#99d9f4'
                               onPress={this.onLoginPressed()}
                           >
                               <Image source={require('./image/login/login_button.png')} style={{width: 400}}/>
                           </TouchableHighlight>

                       </View>
                   </View>
                   <View style={[styles.footer,{height:  500}]}>
                       <Text style={[styles._text,{ color: 'black'}]}>首都师范大学</Text>
                   </View>
               </View>


           );
       }
    },

});

module .exports=Login;