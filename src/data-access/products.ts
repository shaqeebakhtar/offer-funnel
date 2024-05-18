type GetAllProductsProps = {
  page: number;
  searchTerm?: string;
};

export const getAllProducts = async ({
  page = 0,
  searchTerm = '',
}: GetAllProductsProps) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/task/products/search?search=${searchTerm}&page=${page}`,
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
