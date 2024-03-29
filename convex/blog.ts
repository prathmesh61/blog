import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    hashTag: v.string(),
    author: v.string(),
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const { author, body, title, hashTag, storageId } = args;
    const blog = await ctx.db.insert("blog", {
      hashTag,
      author,
      title,
      body,
      storageId,
    });
    return blog;
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const blogs: BlogType[] = await ctx.db.query("blog").collect();
    return blogs;
  },
});
export const getBlog = query({
  args: { blogId: v.string() },
  handler: async (ctx, args) => {
    const blog = await ctx.db
      .query("blog")
      .filter((q) => q.eq(q.field("_id"), args.blogId))
      .first();
    return blog;
  },
});
export const getBlogImage = query({
  args: { blogId: v.string() },
  handler: async (ctx, args) => {
    const blog = await ctx.db
      .query("blog")
      .filter((q) => q.eq(q.field("_id"), args.blogId))
      .first();
    return await ctx.storage.getUrl(blog.storageId);
  },
});
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const sendImage = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    await ctx.db.insert("blog", {
      imageID: args.storageId,
    });
  },
});
