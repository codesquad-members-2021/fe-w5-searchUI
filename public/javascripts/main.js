import { best, carousel, mouse_slide, plus } from "./carousel_function.js";
import { View_top10_list, Rolling_slide_top10_title, init_searchBar_Event, Rolling_slide } from "./Search_Bar.js";

const promise = fetch("http://localhost:3000/image") // 여기서 서버에 요청함                                                
.then(response => response.json())                   // 그럼 router의 image.js에서 파일을 읽어서 보내줌. 
.then(json => best(json))
.then(json => carousel(json))
.then(json => mouse_slide(json))
.then(json => plus(json));

const top_10 = fetch("http://localhost:3000/top_10") // 여기서 서버에 요청함                       
.then(response => response.json())                   // 그럼 router의 image.js에서 파일을 읽어서 보내줌. 
.then(json => { 
    View_top10_list(json);
    Rolling_slide_top10_title(json);
    Rolling_slide();
    init_searchBar_Event();
});