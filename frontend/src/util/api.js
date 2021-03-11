const END_POINT = "http://localhost:3333/api";

const API = {
  get: {
    hottestInfo() {
      const result = fetch(`${END_POINT}/hottest`)
        .then((response) => {
          return response.json();
        });
      return result;
    },
    bannerInfo() {
      const result = fetch(`${END_POINT}/planning-events`)
        .then((response) => {
          return response.json();
        })
        .then((serializedData) => {
          return serializedData;
        });
        
      return result;
    }
  },
  post: {
    recommendKeywordsInfo(value) {
      const result = fetch(`${END_POINT}/recommend-keywords`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({query: value})
      })
      .then((response) => {
        return response.json();
      });
      return result;
    },
  }
}

export default API;