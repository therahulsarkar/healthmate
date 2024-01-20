"use client"
import Features from "@/Components/Features";
import Footer from "@/Components/Footer";
import Hero from "@/Components/Hero";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
const router = useRouter();





  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Hero/>
      <Features/>
      <Footer/>
          </main>
  );
}
