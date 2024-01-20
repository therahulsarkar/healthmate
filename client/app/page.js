import Features from "@/Components/Features";
import Footer from "@/Components/Footer";
import Hero from "@/Components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hero/>
      <Features/>
      <Footer/>
          </main>
  );
}
