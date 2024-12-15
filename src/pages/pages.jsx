import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Sidebar from "@/components/sidebar/Sidebar";
import NotFound from "@/components/notFound";
import Balances from "./balances/Balances";
import Converter from "./converter/Converter";

const Pages = () => {
  return (
    <main className="d-flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/balances" element={<Balances />} />
        <Route path="/converter" element={<Converter />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default Pages;
