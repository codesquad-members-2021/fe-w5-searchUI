const staticContainer = document.querySelector('.main-banner__static');
const slideContainer = document.querySelector('.main-banner__slide');
const slideBundle = document.querySelector(".slide-bundle");
const issueContainer = document.querySelector('.issue-banner__slide');
const issueBanner = document.querySelector('.issue-banner');
const issueBundle = document.querySelector('.issue-bundle');
const keywordRollingDiv = document.querySelector('.front__search-keyword');
const hotKeywordBox = document.querySelector('.front__hotKeyword-box');
const inputBox = document.querySelector('.input-box__input');



const local = "http://localhost"
const port = 3000;
const homePath = "/data/homeContents.json";
const bannerPath = "/data/banner.json"
const rollingKeyPath = "/data/search10.json"

export function loadBannerData() {
    return fetch(`${local}:${port}${bannerPath}`)
    .then(response => response.json())
    .then(json => json.mileageList);
}

export function loadHomeContentsData() {
    return fetch(`${local}:${port}${homePath}`)
    .then(response => response.json())
    .then(json => json.contents);
}
loadHomeContentsData();

export async function loadKeyword() {
    const response = await fetch(`${local}:${port}${rollingKeyPath}`,
    {
        method: 'GET',
    });
    const data = await response.json();
    return data.list.searchKeyword;
    }

loadKeyword();
export {staticContainer, slideContainer, slideBundle, issueContainer, issueBanner, issueBundle, keywordRollingDiv, hotKeywordBox, inputBox};
