const BASE_URL =
  "https://west.albion-online-data.com/api/v2/stats/prices";

export async function getMarketPrices(
  itemIds: string[],
  locations: string[] = [
    "Bridgewatch",
    "Martlock",
    "Lymhurst",
    "Fort Sterling",
    "Thetford",
    "Caerleon",
  ]
) {
  const url =
    `${BASE_URL}/${itemIds.join(",")}` +
    `?locations=${locations.join(",")}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch Albion market data"
    );
  }

  return response.json();
}