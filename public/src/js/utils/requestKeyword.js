export function getHotKeywords() {
  return fetch(
    "https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json?_=1615183888074"
  )
    .then((res) => res.json())
    .then((json) => json.list.map((el) => el.keyword));
}
