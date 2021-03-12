import { _ } from "./util";
import RollingUI from "./rollingUI";

export class AutoCompleteUI extends RollingUI { }

AutoCompleteUI.prototype.autoComplete = function () {

};

/*
시나리오

1. input에 keyup이벤트마다 실행되는 함수를 등록한다.
2. this.input의 value를 갖는 데이터url을 패치해와서 데이터를 정제한다.
(loadData(url)해서 사용)
3. 0부터9까지 makeLists
4. init(list)

1. list를 순회하며 input.value와 같은 인덱스를 찾는다.
2. replace를 하여 해당인덱스를 <span class="highlight">해당인덱스</span>한다.
3. 그것을 다시 input.value에 넣어준다.
*/