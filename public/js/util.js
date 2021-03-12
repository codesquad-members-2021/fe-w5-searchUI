const _ = {
    $: (strSelector, target = document) => target.querySelector(strSelector),
    $All: (strSelector, target = document) =>
        target.querySelectorAll(strSelector),
    addClass: (target, ...classNames) => target.classList.add(...classNames),
    removeClass: (target, ...classNames) =>
        target.classList.remove(...classNames),
    toggleClass: (target, className) => target.classList.toggle(className),
    forceToggleClass: (target, className, flag) =>
        target.classList.toggle(className, flag),
    containsClass: (target, className) => target.classList.contains(className),
    replaceClass: (target, oldClass, newClass) =>
        target.classList.replace(oldClass, newClass),
    createElement: (tagType) => document.createElement(tagType),
    createTextNode: (strTxt) => document.createTextNode(strTxt),
    addEvent: (target, eventType, callback, options = false) =>
        target.addEventListener(eventType, callback, options),
    setAttr: (target, strAttrName, strValue) =>
        target.setAttribute(strAttrName, strValue),
    getAttr: (target, strAttrName) => target.getAttribute(strAttrName),
    removeAttr: (target, strAttrName) => target.removeAttribute(strAttrName),
    closestSelector: (target, strSelector) => target.closest(strSelector),
    appendChild: (target, child) => target.appendChild(child),
    appendChildren: (target, ...children) =>
        children.forEach((child) => target.appendChild(child)),
    removeChild: (target, child) => target.removeChild(child),
    removeChildren: (target, ...children) =>
        children.forEach((child) => target.removeChild(child)),
    allRemoveChildren: (target) => {
        while (target.hasChildNodes()) target.removeChild(target.firstChild);
    },
};

/**
 * @param {String} urlPath
 */
export const fetchData = async (url) => {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.error(error);
    }
};

export const delay = (ms, data = null) =>
    new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const isKorEngNum = (str) => /[a-zA-Z0-9ㄱ-힣]/gi.test(str);
export const isPossibleInput = (str) => /Key|Numpad|Digit|Backspace/g.test(str);

export default _;
