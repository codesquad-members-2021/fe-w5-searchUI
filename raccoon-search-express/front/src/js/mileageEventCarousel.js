import EventSlider from './eventSlider';

export default class MileageEventCarousel extends EventSlider {
  constructor(data) {
    super();
    this.data = data;
  }
  setMileageEventContents() {
    this.slide.insertAdjacentHTML('afterbegin', this.getMileageEventContents());
  }
  getMileageEventContents() {
    const panelArr = this.data.mileageList.map((el) => {
      const url = { img: el.imgurl, link: el.linkurl };
      return url;
    });

    let contents = panelArr.reduce((panelDiv, url) => {
      const { img, link } = url;
      panelDiv += `
      <div class="panel">
      <a href="${link}" class="link--event"
        ><img src="${img}" width="485" height="340" class="img_g" alt=""
      /></a>
      </div>`;
      return panelDiv;
    }, ``);

    return contents;
  }
}
