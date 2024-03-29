"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const blogs = useQuery(api.blog.get);
  const hashTagList = [...new Set(blogs?.map((item) => item.hashTag))];
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("tag");

  function filterArray(tag: string) {
    if (tag && tag !== "none") {
      return blogs?.filter((item) => item.hashTag === tag);
    } else if (tag === "none" && searchValue.length > 0) {
      return blogs?.filter((item) =>
        item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      );
    }
    return blogs;
  }
  const data = filterArray(search!);
  console.log(searchValue.length);
  console.log(data);

  return (
    <main className="relative max-w-[1340px] mx-auto w-full h-full px-6 py-4">
      <div className="flex flex-col justify-center items-center space-y-4 mt-10">
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
      </div>
      <Link
        href={"/"}
        className="absolute top-5 left-0 text-base underline font-medium text-white"
      >
        {`<-Back`}
      </Link>
    </main>
  );
};

export default page;
