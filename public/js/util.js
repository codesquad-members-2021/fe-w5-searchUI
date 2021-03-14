const _ = {
    $: (selector, base = document) => base.querySelector(selector),
    $All: (selector, base = document) => base.querySelectorAll(selector),
    addClass: (className, target) => target.classList.add(className),
    removeClass: (className, target) => target.classList.remove(className),
    on: (el, event, fn) => el.addEventListener(event, fn)
};

const delay = (fn, ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(fn()), ms);
    })
};

const setStyle = ({ el, styleRef }) => {
    el.style.transition = styleRef.transition;
    el.style.transform = styleRef.transform;
    el.style.opacity = styleRef.opacity;
}

export { _, delay, setStyle }