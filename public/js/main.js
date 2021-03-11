const $search = document.querySelector('.search-bar__input');

$search.addEventListener('input', () => {
  const searchInput = $search.value;
  fetch(`
  https://completion.amazon.com/api/2017/suggestions?session-id=146-7463946-6351015&customer-id=&request-id=GJ3692SXTPG2EG7P3KFS&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=undefined&prefix=${searchInput}&event=onFocusWithSearchTerm&limit=11&fb=1&suggestion-type=KEYWORD&suggestion-type=WIDGET&_=1615392526147
  `)
    .then(res => res.json())
    .then(jsonData => jsonData.suggestions.map(v => v.value))
    .then(console.log);
})
