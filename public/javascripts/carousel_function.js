import {_, DOM, CLASS_LIST} from "./utill.js"

// 더보기 구현
const hot_deal = _.$(".hot_dael_box");
const plus_img = _.$(".plus_img");
const best100 = _.$(".best100");
const BOX = _.$(".carousel_slide");

export const best = (img) => {
    const best_prefix = img.best.prefix;
    const img_url = Object.values(img.best.list);

    best100.innerHTML = `<img src=${best_prefix + img_url[0].src}>`

    return img;
};

// 캐러셀 슬라이더에 이미지 넣기
export const carousel = (img) => {
    const img_prefix = img.event.prefix;
    const img_url = Object.values(img.event.list);    
    const array = img_url.map(v => img_prefix+v.src).reduce((acc,cur) => {
        return acc = acc + `<img class="items" src="${cur}"></img>`
    },"");

    BOX.innerHTML = array;
    return img;
};

export const mouse_slide = (img) => {
    const img_prefix = img.mouse_slide.prefix;
    const img_url = img.mouse_slide.list;
    const five_slide = _.$(".top_imglist");

    let str = '';
    let counter = 0;
    
    for(let k=0; k<img_url.length/5; k++) {
        for(let i=counter; i < counter+5; i++) {
            str += `<li>
                        <a href="#">
                            <span><img src="${img_prefix + img_url[i].src}"></span>
                            <strong>${img_url[i].title}</strong>
                            <span class="img_text">${img_url[i].st}</span>
                            <span class="tema_icon"></span>
                        </a>
                    </li>`
        }
        counter += 5;
        five_slide.insertAdjacentHTML("beforeend",`<ul>${str}</ul>`);
        str = '';
    }
    return img;        
};

export const plus = (img) => {
    const plus_prefix = img.box.prefix;
    const img_url = Object.values(img.box.list);

    let str ='';
    let counter=5;

    const ul_tag = document.createElement("ul");
    ul_tag.className = "middle_img";

    for(let i=0; i<5; i++) {
        str += `<li>
                <span><img src="${plus_prefix + img_url[i].src}"></span>
                <span class="hot_deal_text">${img_url[i].title}</span>
                <span class="span_box">
                    <span class="hot_deal_won">${img_url[i].price}원</span>
                </span>
                </li>`;
    };
    ul_tag.innerHTML = str;
    hot_deal.insertAdjacentElement("beforeend",ul_tag);
    str = '';

    plus_img.innerHTML =`더보기 ${counter} / ${img_url.length}`;


    plus_img.addEventListener("click", () => {
        const ul_tag = document.createElement("ul");
        ul_tag.className = "middle_img";
        for(let i=counter; i<counter+5; i++) {
            str += `<li>
                    <span><img src="${plus_prefix + img_url[i].src}"></span>
                    <span class="hot_deal_text">${img_url[i].title}</span>
                    <span class="span_box">
                        <span class="hot_deal_won">${img_url[i].price}원</span>
                    </span>
                    </li>`;
        }
        counter += 5;

        ul_tag.innerHTML = str;
        hot_deal.insertAdjacentElement("beforeend",ul_tag);
        str = '';
        
        plus_img.innerHTML =`더보기 ${counter} / ${img_url.length}`;
        if(counter === img_url.length) {
            plus_img.innerHTML =`더보기 ${counter} / ${img_url.length}</br>
                                이제 사진 없지롱`;
        }
    });
};