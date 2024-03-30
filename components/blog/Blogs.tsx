"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React, { useCallback, useMemo } from "react";
import Blog from "./Blog";

type Props = {};

const Blogs = (props: Props) => {
  const blogs = useQuery(api.blog.get);
  const data = useMemo(() => {
    return blogs;
  }, [blogs?.length]);
  console.log(data);

  return (
    <section className="mt-10 mb-10 w-full h-full flex flex-col items-center justify-center gap-4 px-6 py-3">
      {blogs?.map((blog: BlogType) => (
        <Blog blog={blog} key={blog._id} />
      ))}
    </section>
  );
};

export default Blogs;
