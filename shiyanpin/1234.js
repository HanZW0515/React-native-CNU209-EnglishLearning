/**
 * Created by Hanzw on 2016-3-14.
 */


//scanf(n);
//for(y=0;y<n-2;y++)
//{
//    temp_p=(1/y!)*(-1)^y+temp_p;
//    py=y!*temp_p
//    temp_e=(n-1)!/(y-1)! * py
//    ey=ey+temp_e
//}
'use strict';
var React = require('react-native');
var SimpleAlert = require('react-native-simpledialog-android');
var{
    Text,
    TextInput,
    View,
    } = React;

var math = React.createClass ({
    getInitialState: function() {
        return {
            user: [],
            fenzi: 0,
            fenmu:0,
        };
    },

    _jiecheng(n)
    {
        var i;
        var a=1;
      for(i=1;i<n+1;i++){
          a = a*i
      }
        return a;
    },

    _pingfang(n)
    {
        if(n%2==0)
        return 1;
        else return -1;

    },

    _count(n){
        //var y;
        //var temp_p=0;
        //var py=0;
        //var temp_e=0;
        //var ey=0;
        //for(y=2;y<n-1;y=y+1)
        //{
        //    temp_p=(this._pingfang(y)/this._jiecheng(y))+temp_p;
        //    py=this._jiecheng(y)*temp_p;
        //    temp_e=(this._jiecheng(n-1)/this._jiecheng(y-1)) * py;
        //    ey=ey+temp_e;
        //    SimpleAlert.alert('你真棒！~','获得'+py+'枚金币',[
        //        {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!'}
        //    ])
        //}
        //return ey;
        var y;
        var temp_p=0;
        var fenzi=0;
        var temp_e=0;
        var fenmu=0;
        var result;
        //分子部分
        for(y=2;y<n-1;y++)
        {
            temp_p=(this._pingfang(y)/this._jiecheng(y))+temp_p;
            fenzi=y*temp_p
        }
        //分母部分
        for(y=2;y<n+1;y++)
        {
            temp_e=(this._pingfang(n)/this._jiecheng(n))+temp_e;
            fenmu=n*temp_e
        }
        result=fenzi/fenmu;
        return result;
    },

    render : function () {
        return (
            <View>
              {this._count(4)}
              <Text>{this.state.fenzi}</Text>
              <Text>{this.state.fenmu}</Text>
            </View>
        );
    }
});
module .exports=math;