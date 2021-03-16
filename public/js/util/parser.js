// json 데이터에서 필요한 데이터만 뽑는 함수들

const parseRecommendedList = (data) => data.map((v) => v.keyword).slice(0, 10);

export { parseRecommendedList }