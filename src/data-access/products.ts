export const getAllProducts = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/task/products/search`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${import.meta.env.VITE_API_KEY}`,
      },
    }
  );

  return await res.json();
};
