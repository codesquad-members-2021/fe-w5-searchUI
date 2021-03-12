# fe-w5-searchUI

# Feature List

## front-end

- 기존 "쇼핑하우" UI를 클론해온다. (👌)
- 검색창 UI 개발
  1. Rolling List UI (👌)
     - carousel UI clone (👌)
     - 검색창에 focus시 Rolling stop (👌)
  2. Drop Down UI
     - input 클릭 시 DropDown UI (👌)
     - 검색창과 dropdown은 border:red (👌)
     - 클릭 시 Rolling을 멈추고, ui를 사라지게 하며, [인기쇼핑키워드]가 노출된다. (👌)
     - input이 들어가면 [인기쇼핑키워드]를 사라지게 한다. (👌)
  3. 자동완성 UI
     - input시 , 자동 완성된 결과가 노출된다. (👌)
     - 일치하는 글자에 하이라이트를 준다. (👌)
     - input이 사라질 시에도, 자동 완성 결과를 노출한다. (👌)
     - 키보드 방향키 위 아래 이동시에 하나씩 이동해서 입력창에 자동완성글자가 노출된다.
       (맨 아래에서 아래 방향키 하면 dropdown이 사라진다. 맨 위도 동일 )
- [최근검색어] 기능
  1. [최근검색어]를 로컬 스토리지에 저장해 놓는다.
  2. [인기쇼핑키워드]대신에 [최근검색어]를 노출한다.
  3. 최근검색어 항목별 삭제 기능을 추가한다.

## back-end

- 자동완성키워드 데이터
  1. input을 key로 같는 value들을 전송해준다. (👌)
