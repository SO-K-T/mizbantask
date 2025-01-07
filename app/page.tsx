"use client";
import { Button } from "@nextui-org/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProduct } from "./requests";
import Spinner from "./components/spinner";

export default function Home() {
  const [content, setContent] = useState("");
  const [showData, setShowData] = useState(false);
  const [fetchData, setFetchData] = useState(false);

  const {
    data: fetchQuery,
    isLoading,
    isSuccess,
    status,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      fetch("https://fakestoreapi.com/products/1").then((res) => {
        return res.json();
      }),
    enabled: fetchData,
  });

  isSuccess && console.log(fetchQuery);

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className=" bg-gray-700 px-6 py-6 rounded-md"> Mizban Center Task</h1>
      <div className="flex flex-wrap gap-4 items-center mt-10">
        <Button onPress={() => setFetchData(true)} color="default">
          Fetch
        </Button>
        <Button color="primary">Post</Button>
        <Button color="secondary">Update</Button>
        <Button color="success">Delete</Button>
      </div>
      {isLoading && <Spinner />}
      {isSuccess && (
        <div className=" mt-10 bg-purple-700 px-4 py-8 rounded-md">
          {fetchQuery.title}
        </div>
      )}
    </section>
  );
}
