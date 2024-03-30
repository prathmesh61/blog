"use client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/convex/_generated/api";

import { useMutation } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormState {
  title: string;
  body: string;
  hashTag: string;
  author: string;
  storageId: string;
}
const addBlog = () => {
  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const create = useMutation(api.blog.create);
  const generateUploadUrl = useMutation(api.blog.generateUploadUrl);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();

  const onSubmit = async (data: FormState) => {
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": selectedImage!.type },
      body: selectedImage,
    });
    const { storageId } = await result.json();
    // Step 3: Save the newly allocated storage id to the database
    create({
      title: data.title,
      author: data.author,
      body: data.body,
      hashTag: data.hashTag,
      storageId: storageId,
    });
    router.push("/");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-y-5">
      <h1 className="font-mono text-3xl font-bold">Add New Blog ✨</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5 w-full  justify-center items-center max-w-[700px]"
      >
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true, min: 10, maxLength: 80 })}
          className="md:w-[700px] w-[300px]  h-auto  rounded-lg p-3 text-black"
        />
        <textarea
          {...register("body", { required: true })}
          rows={10}
          placeholder="write content.."
          className="md:w-[700px] w-[300px] h-auto rounded-lg p-3 text-black"
        />

        <label
          htmlFor="image"
          className="md:w-[700px] w-[300px] rounded-lg flex flex-wrap items-center gap-2"
        >
          <input
            type="file"
            placeholder="image"
            name="image"
            accept="image/*"
            onChange={(event) => setSelectedImage(event.target.files![0])}
            ref={imageInput}
            disabled={selectedImage !== null}
            className="border-2 border-gray-600 w-full md:w-[250px] h-auto"
          />
          {selectedImage && (
            <img
              src={`${URL.createObjectURL(selectedImage)}`}
              className="border-2 border-gray-600 w-full md:w-[200px] h-auto"
            />
          )}
        </label>
        <input
          type="text"
          placeholder="#developer"
          {...register("hashTag", { required: true })}
          className="md:w-[700px] w-[300px]  h-auto  rounded-lg p-3 text-black"
        />
        <input
          type="text"
          placeholder="Your email author"
          {...register("author", { required: true })}
          className="md:w-[700px] w-[300px]  h-auto  rounded-lg p-3 text-black "
        />
        <input
          type="submit"
          className="bg-purple-500 text-white rounded-lg p-3 inline-block md:w-[700px] w-[300px]  cursor-pointer"
        />
      </form>
      <span
        onClick={() => router.back()}
        className="font-light text-sm underline cursor-pointer"
      >
        Back to home
      </span>
    </div>
  );
};
export default addBlog;
