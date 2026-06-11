const BASE_URL =
  "https://west.albion-online-data.com/api/v2/stats/prices";

const DEFAULT_LOCATIONS = [
  "Bridgewatch",
  "Martlock",
  "Lymhurst",
  "Fort Sterling",
  "Thetford",
  "Caerleon",
];

export async function getMarketPrices(
  itemIds: string[],
  locations: string[] = DEFAULT_LOCATIONS
) {
  if (itemIds.length === 0) {
    return [];
  }

  const url =
    `${BASE_URL}/${itemIds.join(",")}` +
    `?locations=${locations.join(",")}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Albion API Error: ${response.status}`
    );
  }

  return await response.json();
}