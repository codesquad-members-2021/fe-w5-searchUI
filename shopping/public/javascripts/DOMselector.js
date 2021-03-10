import _ from "./utils.js";

const body = _.$("body");
const main = _.$(".main_section", body);
const header = _.$("header", body);

const $ = {
  banner: _.$(".banner__right", main),
  moreBtn: _.$(".more_contents", main),
  moreContainer: _.$(".shoppinglists", main),
  keyword: _.$(".header__keywords", header),
  suggestionKeywords: _.$(".suggestionKeywords", header),
  suggestion: _.$(".header__suggestion", header),
  input: _.$("input", header),
};

export default $;
