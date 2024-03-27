"use client";
import React from "react";
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
}
function AddBlog() {
  const create = useMutation(api.blog.create);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();

  const onSubmit = (data: FormState) => {
    create({
      title: data.title,
      author: data.author,
      body: data.body,
      hashTag: data.hashTag,
    });
    router.push("/");
  };
  console.log(errors);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center md:gap-y-16 gap-y-8">
      <h1 className="font-mono text-3xl font-bold">Add New Blog ✨</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5 w-full justify-center items-center"
      >
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true, min: 10, maxLength: 80 })}
          className="w-[400px] h-auto border-gray-400 rounded-lg p-3 text-black"
        />
        <textarea
          {...register("body", { required: true })}
          rows={10}
          placeholder="write content.."
          className="w-[400px] h-auto border-gray-400 rounded-lg p-3 text-black"
        />
        <input
          type="text"
          placeholder="#developer"
          {...register("hashTag", { required: true })}
          className="w-[400px] h-auto border-gray-400 rounded-lg p-3 text-black"
        />
        <input
          type="text"
          placeholder="Your email author"
          {...register("author", { required: true })}
          className="w-[400px] h-auto border-gray-400 rounded-lg p-3 text-black "
        />

        <input
          type="submit"
          className="bg-purple-500 text-white rounded-lg w-full p-3 inline-block max-w-[400px] cursor-pointer"
        />
      </form>
      <Link href={"/"} className="font-light text-sm underline ">
        Back to home
      </Link>
    </div>
  );
}
export default AddBlog;
