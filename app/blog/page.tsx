"use client";
import Blog from "@/components/blog/Blog";
import { api } from "@/convex/_generated/api";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const blogsPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debounceValue = useDebounce(searchValue, 300);
  const blogs = useQuery(api.blog.get);
  const hashTagList = [...new Set(blogs?.map((item) => item.hashTag))];
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("tag");

  function filterArray(tag: string, debounceValue: string) {
    if (tag && tag !== "none") {
      return blogs?.filter((item) => item.hashTag === tag);
    } else if (tag === "none") {
      return blogs?.filter((item) =>
        item.title
          .toLocaleLowerCase()
          .includes(debounceValue.toLocaleLowerCase())
      );
    }
    return blogs;
  }
  const data = filterArray(search!, debounceValue);

  return (
    <main className="relative max-w-[1340px] mx-auto w-full h-full px-6 py-4">
      <div className="flex flex-col justify-center items-center space-y-8 mt-10">
        <h1 className="text-center font-extrabold text-2xl font-mono 0">
          Weekley blogs on web developement
        </h1>
        <div className="flex items-center gap-6 flex-wrap">
          <input
            type="text"
            className="px-4 py-2 md:w-[550px] w-[350px] border-gray-600 rounded-lg text-black"
            placeholder="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue.length === 0 && searchValue === "" && (
            <select
              onChange={(e) => {
                const selectedTag = e.target.value;
                if (selectedTag === "none") {
                  router.push(`/blog?tag=none`);
                } else {
                  router.push(`/blog?tag=${selectedTag}`);
                }
              }}
              className="bg-black border-2 border-gray-500 px-4 py-4 "
            >
              <option value="none">none</option>

              {hashTagList.map((hashTag: string) => (
                <option key={hashTag} value={hashTag}>
                  {hashTag}
                </option>
              ))}
            </select>
          )}
        </div>
        <section className=" w-full h-full flex flex-col items-center justify-center gap-4 px-6 py-3">
          {data?.map((blog: BlogType) => (
            <Blog blog={blog} key={blog._id} />
          ))}
        </section>
      </div>
      <span
        onClick={() => router.back()}
        className="absolute top-5 left-0 text-base underline font-medium text-white cursor-pointer"
      >
        {`<-Back`}
      </span>
    </main>
  );
};

export default blogsPage;
