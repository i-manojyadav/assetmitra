let url = "https://api.binance.com/api/v3/ticker/24hr";

export const getCoins = async () => {
    const res = await fetch(url);
    const data = await res.json();
    const fetchedCoins = data.slice(0, 250);
    return fetchedCoins;
};