import { partnerState } from "./states.js";

// html에 innerHTML할 html태그를 만드는 함수들

const eventItem = (data) => {
  const { linkurl, imgurl } = data;
  return `<a href="${linkurl}"><img src="${imgurl}"/></a>`;
};

const mileageList = (href_url, img_url) => {
  // 3개 캐러셀 슬라이드
  return `<div class="slide_content"><a href="${href_url}"><img src="${img_url}"></a></div>`;
};

const mallEventList = (lists) => {
  // 더보기 제품들 목록
  return `<div class="panel"><ul class="list_item">${lists}</ul></div>`;
};

const mallEventItems = (href_url, img_url, title, info) => {
  // 더보기 제품들
  return `<li class="_GI_">
        <a href="${href_url}">
          <span class="info_thumb">
            <img src="${img_url}" alt="" />
          </span>
          <strong class="title_g">${title}</strong>
          <span class="txt_info">${info}</span>
          <span class="ico_comm2 ico_theme">테마</span>
        </a>
      </li>`;
};

const mileageListHtml = (array) => array.reduce((acc, val) => acc + mileageList(val.linkurl, val.imgurl), ``);

// const chunk = (array, n) => {
//   let list = ``
//   for(let i=0; i<array.length; i+=n) {
//     const currProd = array.slice(i, i+n)
//     list += mallEventList(currProd.reduce((acc, val) => acc + mallEventItems(val.linkurl, val.imgurl, val.text, val.text2)))
//   }
//   return list
// }

// n개의 아이템으로 리스트 분할하는 방법 좀 더 생각해보기...
const mallEventListHtml = (array, n) => {
  // let list = ``;
  // for (let i = 0; i + n < array.length; i += n) {
  //   const currProd = array.slice(i, i + n);
  //   list += mallEventList(currProd.reduce((acc, val) => acc + mallEventItems(val.linkurl, val.imgurl, val.text, val.text2)));
  // }
  // return list;
  // 오지게 안된다.. ㅜㅜ
  let lists = "";
  return array.reduce((acc, product, idx) => {
    const { imgurl, linkurl, text, text2 } = product;
    if (!idx % 5) {
      acc += idx ? mallEventList(lists) : "";
      lists = "";
      lists += mallEventItems(linkurl, imgurl, text, text2);
    } else if (idx === array.length - 1) {
      lists += mallEventItems(linkurl, imgurl, text, text2);
      acc += mallEventList(lists);
    } else {
      lists += mallEventItems(linkurl, imgurl, text, text2);
    }
    return acc;
  }, ``);
};

const pageDotsHtml = (slideLen, startNum) => {
  // 페이지네이션 점들
  return new Promise((resolve, reject) => {
    const pageChild = [...Array(slideLen).keys()].reduce(
      (acc, val) =>
        acc + `<span class="btn_paging ${val === startNum ? "dot_active" : ""}" data-index="${val}"><span class="num_page"></span></span>`,
      ``
    );
    resolve(pageChild);
  });
};

const paginationHtml = (pagination) => {
  // 캐러셀 페이지네이션
  return new Promise((resolve, reject) => {
    const slideContents = document.querySelectorAll(".slide_content");
    const slideLen = slideContents.length;
    pageDotsHtml(slideLen, 0).then((pageChild) => {
      pagination.innerHTML = pageChild;
      resolve(slideContents);
    });
  });
};

const homeContentItems = (info, i, kinds) => {
  const { imageurl, produrl, prodname, mprice } = info;
  return `<li class="_GI_ ${kinds}_item" data-id="${i}">
  <a href="${produrl}">
    <span class="thumb_${kinds}">
      <img src="${imageurl}" alt="" />
    </span>
    <strong class="title_g">${prodname}</strong>
    <span class="detail_price">${numberWithCommas(mprice)}
      <span class="price_unit">원</span>
    </span>
  </a>
</li>`;
};

const homeContentsList = (data, kinds) => {
  const contents = data;
  let i = 0;
  let totalHtml = ``;
  Object.entries(contents).forEach((value, key) => {
    const currProducts = value[1].eventProducts;
    let hotDealHtml = `<ul class="list_${kinds}">`;
    hotDealHtml += currProducts.reduce((acc, val) => acc + homeContentItems(val, i++, kinds), ``);
    hotDealHtml += `</ul>`;
    totalHtml += hotDealHtml;
  });
  return totalHtml;
};

const partnerItems = (partners) => {
  return partners.reduce((acc, val) => acc + `<li class="_GI_"><a href="#">${val}</a></li>`, ``);
};

const partnerList = (data) => {
  let totalHtml = ``;
  Object.entries(data).forEach((value, key) => {
    const [title, partners] = value;
    totalHtml += `<div class="category_partner">`;
    totalHtml += `<strong class="title_mall">${partnerState[title]}</strong>`;
    totalHtml += `<ul class="list_mall">${partnerItems(partners)}</ul>`;
    totalHtml += `</div>`;
  });
  return totalHtml;
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export { eventItem, mileageListHtml, paginationHtml, mallEventListHtml, homeContentsList, partnerList };
