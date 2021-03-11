import { _ } from './util.js';

function setLocalStorage(){
    let arr = localStorage.getItem('key').split(",");
    const inputBox = _.$(".input_box")
    inputBox.addEventListener("keyup", function(e){
        if(e.key === "Enter"){
            arr.push(e.target.value)
            console.log(arr)
            localStorage.setItem("key", arr);
        }
    })
}

export {  setLocalStorage }