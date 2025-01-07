"use client";
import { Button } from "@nextui-org/button";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProduct, postProduct, updateProduct } from "./requests";
import Spinner from "./components/spinner";
import { formDataT } from "@/types";

export default function Home() {
  const [displayedSection, setDisplayedSection] = useState<
    "fetch" | "post" | "update" | "delete" | undefined
  >(undefined);

  const [sendRequest, setSendRequest] = useState<
    "fetch" | "post" | "update" | "delete" | undefined
  >(undefined);

  const [currentFormData, setCurrentFormData] = useState<formDataT>(undefined);

  const {
    data: fetchQueryData,
    isLoading: isFetchLoading,
    isSuccess: isFetchSuccess,
    error: fetchError,
  } = useQuery({
    queryKey: ["fetch"],
    queryFn: fetchProduct,
    enabled: sendRequest === "fetch",
  });

  const {
    isLoading: isPostLoading,
    isSuccess: isPostSuccess,
    error: postError,
  } = useQuery({
    queryKey: ["post"],
    queryFn: () => postProduct(currentFormData),
    enabled: sendRequest === "post",
  });

  const {
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    error: updateError,
  } = useQuery({
    queryKey: ["update"],
    queryFn: () => updateProduct(currentFormData),
    enabled: sendRequest === "update",
  });

  const {
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
    error: deleteError,
  } = useQuery({
    queryKey: ["delete"],
    queryFn: () => updateProduct(currentFormData),
    enabled: sendRequest === "delete",
  });

  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    //  @ts-ignore
    setCurrentFormData(formData);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className=" bg-gray-700 px-6 py-6 rounded-md"> Mizban Center Task</h1>
      <div className="flex flex-wrap gap-4 items-center mt-10">
        <Button
          onPress={() => {
            setSendRequest("fetch");
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
        <Button
          onPress={() => {
            setDisplayedSection("update");
          }}
          color="secondary"
        >
          Update
        </Button>
        <Button
          color="success"
          onPress={() => {
            setDisplayedSection("delete");
          }}
        >
          Delete
        </Button>
      </div>

      {/* loading section */}

      {(isFetchLoading ||
        isPostLoading ||
        isUpdateLoading ||
        isDeleteLoading) && <Spinner />}

      {/* fetch section */}

      {fetchError && <span>Error: {fetchError.message}</span>}
      {isFetchSuccess &&
        displayedSection === "fetch" &&
        fetchQueryData.map((e: any) => (
          <div className=" flex  py-2" key={e.id}>
            <div className=" w-20 bg-purple-900 text-white  flex justify-center items-center">
              {e.id}
            </div>
            <div className="  bg-purple-700  w-[30rem] text-center  rounded-md">
              {e.title}
            </div>
          </div>
        ))}

      {/* post section */}

      {displayedSection === "post" && (
        <Form
          style={{ direction: "rtl" }}
          className="w-full max-w-xs  mt-10"
          validationBehavior="native"
          onSubmit={formSubmitHandler}
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
            onPress={() => setSendRequest("post")}
            type="submit"
            variant="bordered"
          >
            ثبت کالا
          </Button>
        </Form>
      )}
      {postError && <span>Error: {postError.message}</span>}

      {/*  update section  */}

      {displayedSection === "update" && (
        <Form
          style={{ direction: "rtl" }}
          className="w-full max-w-xs  mt-10"
          validationBehavior="native"
          onSubmit={formSubmitHandler}
        >
          <Input
            isRequired
            className="my-2"
            errorMessage="لطفا یک شناسه مناسب انتخاب کنید"
            label="شناسه کالا"
            labelPlacement="outside"
            name="productId"
            placeholder="شناسه کالای را وارد کنید."
            type="number"
          />
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
          {isUpdateSuccess && (
            <span className=" text-success-500">
              کالای شما با وفقیت به روز رسانی شد.
            </span>
          )}
          <Button
            onPress={() => setSendRequest("update")}
            type="submit"
            variant="bordered"
          >
            به روز رسانی کالا
          </Button>
        </Form>
      )}
      {updateError && <span>Error: {updateError.message}</span>}

      {/* delete section */}
      {displayedSection === "delete" && (
        <Form
          style={{ direction: "rtl" }}
          className="w-full max-w-xs  mt-10"
          validationBehavior="native"
          onSubmit={formSubmitHandler}
        >
          <Input
            isRequired
            className="my-2"
            errorMessage="لطفا یک شناسه مناسب انتخاب کنید"
            label="شناسه کالا"
            labelPlacement="outside"
            name="productId"
            placeholder="شناسه کالای را وارد کنید."
            type="number"
          />

          {isDeleteSuccess && (
            <span className=" text-success-500">
              کالای شما با وفقیت حذف شد.
            </span>
          )}
          <Button
            onPress={() => setSendRequest("delete")}
            type="submit"
            variant="bordered"
          >
            حذف کالا
          </Button>
        </Form>
      )}
      {deleteError && <span>Error: {deleteError.message}</span>}
    </section>
  );
}
