"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const BlogPage = () => {
  const params = useParams<{ id: string }>();
  const blog: BlogType = useQuery(api.blog.getBlog, { blogId: params.id });
  const blogImage = useQuery(api.blog.getBlogImage, {
    blogId: params.id,
  });

  return (
    <div className="relative max-w-[1340px] mx-auto w-full h-full ">
      <Link
        href={"/"}
        className="absolute top-[-50px] left-0 text-base underline font-medium"
      >
        {`<=Back`}
      </Link>
      <div
        className="mt-20 flex flex-col items-center
       justify-center py-2 px-6"
      >
        {blogImage && (
          <img
            src={blogImage}
            alt={blog?.title}
            className="object-cover w-full max-h-[400px] rounded-lg shadow-lg shadow-gray-700 opacity-60"
          />
        )}
        <div className="flex flex-col gap-3 mt-10">
          <h1 className="font-extrabold text-3xl sm:text-6xl text-white text-center">
            {blog?.title}
          </h1>
          <p className="font-normal text-sm sm:text-lg text-wrap">
            {blog?.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
