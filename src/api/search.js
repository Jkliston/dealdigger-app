export async function searchAmazon(query) {
  const endpoint = "https://proud-bread-1784.joshuakliston.workers.dev";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error("Amazon API request failed");
  }

  const data = await response.json();
  return data.SearchResult?.Items || [];
}
