import { formDataT } from "@/types";

export const fetchProduct = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const postProduct = async (productTitle: formDataT) => {
  const response = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify({
      title: productTitle,
    }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
export const updateProduct = async ({ productId, productTitle }: formDataT) => {
  console.log(productId);

  const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        title: productTitle,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const deleteProduct = async (productId: formDataT) => {
  const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
