import { _ } from "./util"

export default class CarouselUI {
    constructor(el) {
        this.el = el;
        this.imgurl = "http://localhost:8080/public/data/imgurl.json";
    }

    makeImageDom(imgurl) {
        this.el.insertAdjacentHTML("beforeend",
            `<div class="carouselUI--img">
                <img src="${imgurl}" />
            </div>`);
    };

    insertDom() {
        fetch(this.imgurl)
            .then((res) => res.json())
            .then((data) => {
                const rightpannel1Img = data.contents[0].rightpannel1.imgurl;
                const rightpannel2Img = data.contents[0].rightpannel2.imgurl;
                const rightpannel3Img = data.contents[0].rightpannel3.imgurl;

                this.makeImageDom(rightpannel3Img);
                this.makeImageDom(rightpannel1Img);
                this.makeImageDom(rightpannel2Img);
                this.makeImageDom(rightpannel3Img);
                this.makeImageDom(rightpannel1Img);
            })
    }
}

