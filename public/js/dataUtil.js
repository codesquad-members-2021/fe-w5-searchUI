/**
 * @param {String} urlPath
 */
// fetch data (json 데이터 반환)
const fetchData = async (url) => {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.error(error);
    }
};

// 캐시 스토리지에 캐시 데이터 등록
const setCachedData = async (cacheName, url) => {
    const cacheStorage = await caches.open(cacheName);
    await cacheStorage.add(url);
};

// 캐시 스토리지에서 등록한 캐시 데이터 가져옴
const getCachedData = async (cacheName, url, errorView = false) => {
    try {
        const cacheStorage = await caches.open(cacheName);
        const cachedResponse = await cacheStorage.match(url);

        if (!cachedResponse || !cachedResponse.ok)
            throw new Error('[!] No cache data found..');

        return await cachedResponse.json();
    } catch (error) {
        errorView && console.error(error);
        return false;
    }
};

// 캐시 스토리지 제거 (캐시 데이터 지우기)
const setRemoveCacheStorage = async (cacheName) => {
    const keys = await caches.keys();

    for (const key of keys)
        if (key === cacheName) {
            caches.delete(key);
            break;
        }
};

export { fetchData, setCachedData, getCachedData, setRemoveCacheStorage };