"use client"

import React from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface ProductsResponse {
  products: Product[];
}

const Products: React.FC = () => {
  const getProducts = async (): Promise<ProductsResponse> => {
    const res = await fetch("https://dummyjson.com/products");
    return res.json();
  };

  const [data, setData] = React.useState<ProductsResponse | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts();
      setData(productsData);
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Products data fetch</h2>
      <ul className="grid grid-cols-4 gap-4 items-center">
        {data.products.map((item) => (
          <li className="w-52 mx-4" key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <div className="p-2 text-sm text-black bg-gray-400">
              {item.title} <span className="rounded-lg p-1 px-1 ml-2 bg-gray-200">${item.price}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Products;
