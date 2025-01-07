export const fetchProduct = async () => {
  const response = await fetch("https://fakestoreapi.com/products/1");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const postProduct = async (productTitle: String | undefined) => {
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
export const updateProduct = async () => {
  fetch("https://fakestoreapi.com/products/7", {
    method: "PUT",
    body: JSON.stringify({
      title: "test 2 product",
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
};

export const deleteProduct = async () => {
  fetch("https://fakestoreapi.com/products/6", {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
};
