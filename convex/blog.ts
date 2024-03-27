import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    hashTag: v.string(),
    author: v.string(),
  },
  handler: async (ctx, args) => {
    const { author, body, title, hashTag } = args;
    const blog = await ctx.db.insert("blog", { hashTag, author, title, body });
    return blog;
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const blogs = await ctx.db.query("blog").collect();
    return blogs;
  },
});
