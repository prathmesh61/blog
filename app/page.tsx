import Container from "@/components/Container";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Header from "@/components/base/Header";
import Blogs from "@/components/blog/Blogs";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-between">
      <Header />
      <NewsLetter />
      <Blogs />
    </main>
  );
}
