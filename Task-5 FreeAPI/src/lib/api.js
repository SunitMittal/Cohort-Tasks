export function itemsFromResponse(json) {
  const inner = json?.data?.data
  return Array.isArray(inner) ? inner : []
}

export async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok)
    throw new Error(`Request failed (${res.status})`)
  return res.json()
}
