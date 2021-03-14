export const _ = {
    $: (selector) => document.querySelector(selector),
    $all: (selector) => document.querySelectorAll(selector),
    addClass: (node, ...className) => node.classList.add(...className),
    removeClass: (node, ...className) => node.classList.remove(...className),
    contains: (node, className) => node.classList.contains(className) 
}

export const DOM = {
    ROLLING_LIST_BOX : _.$(".rolling_list_box"),
    INPUT_BOX : _.$(".search_bar"),
    SEARCH_INPUT : _.$(".search_input"),
    SEARCH_BAR_LIST : _.$(".search_bar_list"),
    LISTS : _.$all(".lists"),
    KEYWORD_SEARCH_LIST_BOX : _.$(".keyword_search_list_box"),
    KEYWORD_SEARCH_LIST : _.$(".keyword_search_list"),
    RIGHT : _.$(".right"),
    LEFT : _.$(".left"),
    CAROUSEL_SLIDE : _.$(".carousel_slide"),
    cursor : _.$(".slider_box"),
    RIGHT_BUTTON : _.$(".right_button"),
    LEFT_BUTTON : _.$(".left_button")
}

export const CLASS_LIST = {
    BAR_COLOR : "search_bar_color",
    DISPLAY_OFF : "display_off",
    TRANS_TOP : "trans_top",
    ON : "on",
    TRANS_RIGHT : "trans_right",
    TRANS_LEFT : "trans_left",
    CAROUSEL_RIGHT_IMG : "carousel_right_img",
    CAROUSEL_LEFT_IMG : "carousel_left_img",
    CHANGE_RIGHT : "right_button",
    CHANGE_LEFT : "left_button",
    RIGHT_BUTTON_CURSOR : "right_button_cursor",
    LEFT_BUTTON_CURSOR : "left_button_cursor"
}

export const delay = (data, ms) => new Promise((resolve) => setTimeout(()=> resolve(data()), ms));