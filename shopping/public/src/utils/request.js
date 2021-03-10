export default async function request(urls, inputValue) {
  const response = await fetch(inputValue ? urls(inputValue) : urls);
  const data = await response.json();
  return data;
}
