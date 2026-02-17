/**
 * @param {string[]} strs
 * @return {string}
 */

// var longestCommonPrefix = function(strs){
//     if(strs.length == 0)return "";
//     return strs.reduce((prefix,currentWord)=>{
//         while(currentWord.indexOf(prefix)!=0){
//         prefix = prefix.substring(0,prefix.length-1);
//         if (prefix==="")return "";
//     }
//     return prefix
//     });