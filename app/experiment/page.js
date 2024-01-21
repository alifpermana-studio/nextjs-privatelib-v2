"use client";

import Navbar from "@/components/Navbar2";

export default function Experiment() {
  const submitVal = { title: "This is a title", content: "This is content" };

  const startDB = async () => {
    try {
      const res = await fetch("api/submit", {
        method: "POST",
        body: JSON.stringify(submitVal),
      });
      const { result } = res.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="relative">
      <Navbar />
      <button onClick={startDB} className="mt-20">
        Submit
      </button>
    </main>
  );
}
