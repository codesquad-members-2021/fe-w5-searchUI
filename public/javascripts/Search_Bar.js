import { _, DOM, CLASS_LIST, delay } from "./utill.js";

let count;

export const View_top10_list = (titles) => {
    // for => forEach 로 수정 완료
    const top_list = titles.top_10.list;
    top_list.forEach((value,index) => {
        DOM.LISTS[index].innerHTML = `<a href="#">${value.rank} ${value.title}</a>`;
    })
}

// 검색어 배열로 반환 후 화면에 표시
const View_search_keywords = (word, search_keyword) => {
    const lists = word.suggestions.map(v => v.value); // 배열에는 검색어에 해당하는 list만 담겨있다.
    const str = lists.reduce((acc,cur) => {
        let change = cur.replace(search_keyword, `<span class="search_keyword_color">${search_keyword}</span>`);
        acc = acc + `<li class="keyword_search_lists">${change}</li>`;
        return acc;
    },"");
    DOM.KEYWORD_SEARCH_LIST.innerHTML = str;
    return lists;
}

export const Rolling_slide_top10_title = (titles) => {
    // for => reduce로 수정완료
    const top_list = titles.top_10.list;
    const str = top_list.reduce((acc,cur) => {
        acc = acc + `<div class="rolling_list">${cur.rank} ${cur.title}</div>`;
        return acc;
    },"");
    DOM.ROLLING_LIST_BOX.insertAdjacentHTML("beforeend",str)
}

export async function Rolling_slide() {
    // 재귀함수 사용하여 계속 반복
    const play_list1 = () => {
        _.removeClass(DOM.ROLLING_LIST_BOX, CLASS_LIST.TRANS_TOP,CLASS_LIST.ON);
        DOM.ROLLING_LIST_BOX.insertBefore(DOM.ROLLING_LIST_BOX.firstElementChild, null);
        Rolling_slide();
    }

    const play_list2 = () => {
        _.addClass(DOM.ROLLING_LIST_BOX, CLASS_LIST.TRANS_TOP,CLASS_LIST.ON);
    }

    await delay(play_list2, 2000);
    await delay(play_list1,300);
}

const a = new Rolling();


export const init_searchBar_Event = () => {
    document.addEventListener("click", (e) => {
        let close = !!e.target.closest(".search_bar");
        let contain = _.contains(DOM.INPUT_BOX, CLASS_LIST.BAR_COLOR);
        
        if(close && !contain) {
            _.addClass(DOM.INPUT_BOX, CLASS_LIST.BAR_COLOR);
            _.removeClass(DOM.SEARCH_BAR_LIST,CLASS_LIST.DISPLAY_OFF);
            if(DOM.SEARCH_INPUT.value !== "") {
                _.removeClass(DOM.KEYWORD_SEARCH_LIST_BOX,CLASS_LIST.DISPLAY_OFF);
            }
        }
    })

    document.addEventListener("mouseover", (e) => {
        let close = !!e.target.closest(".search_bar");
        let box_in = e.target.closest(".search_bar_list");
    
        if(!close && !box_in) {
            _.removeClass(DOM.INPUT_BOX, CLASS_LIST.BAR_COLOR);
            _.addClass(DOM.SEARCH_BAR_LIST,CLASS_LIST.DISPLAY_OFF);
            _.addClass(DOM.KEYWORD_SEARCH_LIST_BOX,CLASS_LIST.DISPLAY_OFF);
            if(DOM.SEARCH_INPUT.value === "") {
                _.addClass(DOM.KEYWORD_SEARCH_LIST_BOX, CLASS_LIST.DISPLAY_OFF);
            } else if(close && box_in && DOM.SEARCH_INPUT.value !== "") {
                _.removeClass(DOM.KEYWORD_SEARCH_LIST_BOX,CLASS_LIST.DISPLAY_OFF);
            }
        }
    })
    
    DOM.SEARCH_INPUT.addEventListener("input", (e) => {
        if(e.data !== null) {
            _.addClass(DOM.ROLLING_LIST_BOX, CLASS_LIST.DISPLAY_OFF);
            _.removeClass(DOM.KEYWORD_SEARCH_LIST_BOX,CLASS_LIST.DISPLAY_OFF);
        } else if(DOM.SEARCH_INPUT.value == "") {
            _.removeClass(DOM.ROLLING_LIST_BOX,CLASS_LIST.DISPLAY_OFF);
            _.addClass(DOM.KEYWORD_SEARCH_LIST_BOX,CLASS_LIST.DISPLAY_OFF);
        }
    
        if(count) clearTimeout(count);
        count = setTimeout(() => {
            fetch(`https://completion.amazon.com/api/2017/suggestions?session-id=133-4736477-7395454&customer-id=&request-id=4YM3EXKRH1QJB16MSJGT&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=71&prefix=${e.target.value}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD`)
            .then(response => response.json())
            .then(json => View_search_keywords(json, e.target.value));
        },0);
    })
}