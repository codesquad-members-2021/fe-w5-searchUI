export default class CarouselUI {
    constructor() {
        this.carousel = document.querySelector('.carouselUI');
        this.imgurl = "http://localhost:8080/public/data/imgurl.json";
    }

    makeImageDOM(imgurl) {
        this.carousel.insertAdjacentHTML("beforeend",
            `<div class="carouselUI--img">
                <img src="${imgurl}" />
            </div>`);
    };

    insertDOM() {
        fetch(this.imgurl)
            .then((res) => res.json())
            .then((data) => {
                const rightpannel1Img = data.contents[0].rightpannel1.imgurl;
                const rightpannel2Img = data.contents[0].rightpannel2.imgurl;
                const rightpannel3Img = data.contents[0].rightpannel3.imgurl;

                this.makeImageDOM(rightpannel3Img);
                this.makeImageDOM(rightpannel1Img);
                this.makeImageDOM(rightpannel2Img);
                this.makeImageDOM(rightpannel3Img);
                this.makeImageDOM(rightpannel1Img);
            })
    }
}

