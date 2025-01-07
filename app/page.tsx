"use client";
import { Button } from "@nextui-org/button";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProduct, postProduct } from "./requests";
import Spinner from "./components/spinner";

export default function Home() {
  const [displayedSection, setDisplayedSection] = useState<
    "fetch" | "post" | "delete" | "update" | undefined
  >(undefined);
  const [fetchData, setFetchData] = useState<boolean>(false);
  const [postData, setPostData] = useState<boolean>(false);
  const [postFormData, setPostFormData] = useState<string | undefined>(
    undefined
  );

  const {
    data: fetchQuery,
    isLoading: isFetchLoading,
    isSuccess: isFetchSuccess,
    error: fetchError,
  } = useQuery({
    queryKey: ["fetch"],
    queryFn: fetchProduct,
    enabled: fetchData,
  });

  const {
    data: postQuery,
    isLoading: isPostLoading,
    isSuccess: isPostSuccess,
    error: postError,
  } = useQuery({
    queryKey: ["post"],
    queryFn: () => postProduct(postFormData),
    enabled: postData,
  });

  isPostSuccess && console.log(isPostSuccess);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    //  @ts-ignore
    setPostFormData(formData);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className=" bg-gray-700 px-6 py-6 rounded-md"> Mizban Center Task</h1>
      <div className="flex flex-wrap gap-4 items-center mt-10">
        <Button
          onPress={() => {
            setFetchData(true);
            setDisplayedSection("fetch");
          }}
          color="default"
        >
          Fetch
        </Button>
        <Button
          onPress={() => {
            setDisplayedSection("post");
          }}
          color="primary"
        >
          Post
        </Button>
        <Button color="secondary">Update</Button>
        <Button color="success">Delete</Button>
      </div>
      {/* loading section */}
      {(isFetchLoading || isPostLoading) && <Spinner />}

      {/* fetch section */}
      {fetchError && <span>Error: {fetchError.message}</span>}
      {isFetchSuccess && displayedSection === "fetch" && (
        <div className=" mt-10 bg-purple-700 px-4 py-8 rounded-md">
          {fetchQuery.title}
        </div>
      )}
      {/* post section */}
      {displayedSection === "post" && (
        <Form
          style={{ direction: "rtl" }}
          className="w-full max-w-xs  mt-10"
          validationBehavior="native"
          onSubmit={onSubmit}
        >
          <Input
            isRequired
            className="my-2"
            errorMessage="لطفا یک نام مناسب انتخاب کنید"
            label="نام کالا"
            labelPlacement="outside"
            name="productTitle"
            placeholder="نام کالای را وارد کنید."
            type="text"
          />
          {isPostSuccess && (
            <span className=" text-success-500">
              کالای شما با وفقیت ثبت شد.
            </span>
          )}
          <Button
            onPress={() => setPostData(true)}
            type="submit"
            variant="bordered"
          >
            ثبت کالا
          </Button>
        </Form>
      )}
      {postError && <span>Error: {postError.message}</span>}
    </section>
  );
}
