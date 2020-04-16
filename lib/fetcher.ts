const dev = process.env.NODE_ENV !== "production";
export const host = dev ? "http://localhost:3000" : "https://tim.rip";

export const fetcher = async (query: string) =>
  await fetch(`${host}/api/gql`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
