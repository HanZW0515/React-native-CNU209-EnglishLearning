/**
 * Created by DELL on 2016-3-14.
 */
'use strict';

function handlesentence(sentence,word){
    var stringObj=sentence;
    var newstr=stringObj.replace(word,"_____");
    return newstr;
}