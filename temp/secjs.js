/**
 * Created by DELL on 2016-7-15.
 */
function  _choose(e){
    var m = e.layout.y
    var t=e.offsetTop;
    var l=e.offsetLeft;
    var height=e.offsetHeight;
    while(e=e.offsetParent) {
        t+=e.offsetTop;
        l+=e.offsetLeft;
    }
    SimpleAlert.alert('你真棒！~','获得'+m+'     '+l+'枚金币',[
        {type:SimpleAlert.POSITIVE_BUTTON,text:'OK!'}
    ])
}