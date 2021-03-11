const slider = document.querySelector(".slider")
const sliderInit = 0;
const sliderHeight = 40;

const rollKeyWord = function() {
    fetch('http://zelord.tk/api/rollkeyword')
        .then(function(response) {
            return response.json()
        })
        .then(function(myJson){
            // 불러온 JSON을 slider에 div로 넣어줌
            Object.keys(myJson).map((i) => {
                let newDiv = document.createElement("div");
                let newText = document.createTextNode(`${i} ${myJson[i]}`)
                newDiv.appendChild(newText)
                newDiv.className = "rollKeyWord"
                slider.appendChild(newDiv)
            })
            // 1 ~ 10 ~ 1 이런 순서가 되도록 첫번째 요소를 다시 추가
            let newDiv = document.createElement("div");
            let newText = document.createTextNode(`${1} ${myJson[1]}`)
            newDiv.appendChild(newText)
            newDiv.className = "rollKeyWord"
            slider.appendChild(newDiv)
        })
        .then(function () {
            slider.style.top = sliderInit;
            let topPos = sliderInit;
            let timerId = setTimeout(function tick() {
                if(topPos <= -(sliderHeight * 10)){
                    slider.style.transitionDuration = "0s";
                    slider.style.transitionTimingFunction = "ease";
                    topPos = sliderInit;
                    slider.style.top = `${topPos}px`
                    timerId = setTimeout(tick, 100)
                    // debugger;
                } else {
                    slider.style.transitionDuration = "1s";
                    slider.style.transitionTimingFunction = "ease";
                    topPos -= sliderHeight;
                    slider.style.top = `${topPos}px`
                    timerId = setTimeout(tick, 2000)
                    // debugger;
                }            
                // debugger;
            }, 2000)
        })
        .catch(function() {
            console.log("ERROR : rollkeyword")
        })
}

export { rollKeyWord }