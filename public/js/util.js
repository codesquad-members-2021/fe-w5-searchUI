const _ = {
    $: (selector, base = document) => base.querySelector(selector),
    $All: (selector, base = document) => base.querySelectorAll(selector),
    on: (el, event, fn) => el.addEventListener(event, fn)
};

const delay = (fn, ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(fn()), ms);
    })
}

export { _, delay }