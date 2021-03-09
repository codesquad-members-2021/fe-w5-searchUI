export default async function request(inputValue) {
  const response = await fetch(urls.recommendedWords(inputValue));
  const data = await response.json();
  return data;
}
