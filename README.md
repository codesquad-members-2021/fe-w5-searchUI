# fe-w5-searchUI

## 기능 설계

### 기본

- [x] express 서버 구성
- [x] prototype으로 component 상속 구조 설계 
- [x] html, css 작성 

### API

- [] 인기 검색어 데이터 요청기능
- [] 관련 검색어 데이터 요청기능

### component 공통 

- 해당 컴포넌트에서 사용될 state 초기화 (setup과 props로 받은 내용 기반)
- 상태 변경 함수 작성 및 필요하다면 하위 컴포넌트에 bind해서 전달

### SearchBar

- [] 검색 전 , 검색 활성화, 검색 중. 세 가지 상태 관리

    - 검색 전 : currentMode : wait/ RollingKeywords.rolling 시작 / 인기 키워드 

    - 검색 활성화 : currentMode : onSearch. suggestion_hot에 show 클래스 추가 

    - 검색 중 : currentMode : .suggestion_auto에 show 클래스 추가

- [] 인기 검색어 api 요청
- [] 인기 검색어 데이터를 RollingKeywords에 전달 및 suggestion_hot 생성
- [] input값 debounce해서 적당한 타이밍에 자동 검색어 api 요청
- [] 자동 검색어 데이터 AutoComplte에 전달 

### RollingKeywords
g
- [] 두 번째 li만 보이도록 css 조정
- [] 첫 번째 li의 height를 0으로 변경(애니메이션)
- [] 첫 번째 li를 맨 마지막으로 옮긴 후 height 복구 
- [] 2초에 한 번씩 2, 3번 반복. 
- [] pauseRolling 실행시 일시 정지, rolling 실행시 다시 작동

### AutoComplete 

- [] 방향키 위, 아래 입력시 li태그 height
- [] 해당 검색어는 주황글씨로 돋보이기 