const HtmlTemplete = {
  moreListHTML: (imgurl, text, text2) => `<li class="shoppinglist">
            <img src="${imgurl}">
            <strong>
                ${text}
            </strong>
            <span>
                ${text2}
            </span>
        </li>`,

  suggetionListHTML: (keyword, index) =>
    `<li><span class="num">${index + 1}.</span> ${keyword}</li>`,

  inputListHTML: (keyword) => `<li class="itemList">${keyword}</li>`,
};

export default HtmlTemplete;
