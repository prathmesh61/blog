import Link from "next/link";
import React from "react";

type Props = {
  blog: BlogType;
};

const Blog = ({ blog }: Props) => {
  const date = new Date(blog._creationTime);

  return (
    <Link
      href={`/blog/${blog._id}`}
      className="bg-gray-800 rounded-md p-4 max-w-[900px] flex flex-col gap-y-3"
    >
      <div className="flex ic justify-between">
        <span>{`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`}</span>
        <span className="text-sm">{blog.hashTag}</span>
      </div>
      <h1 className="text-xl font-bold">{blog.title}</h1>
      <p className="text-base font-medium">
        {blog?.body?.slice(0, 150) + "..."}
      </p>
      <button className="bg-purple-500 text-white px-6 py-2 rounded-lg text-sm w-fit">
        Read More
      </button>
    </Link>
  );
};

export default Blog;
