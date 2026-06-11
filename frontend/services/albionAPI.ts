const BASE_URL =
  "https://west.albion-online-data.com/api/v2/stats/prices";

export async function fetchMarketPrices(
  items: string[]
) {
  const response = await fetch(
    `${BASE_URL}/${items.join(",")}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch market data");
  }

  return response.json();
}