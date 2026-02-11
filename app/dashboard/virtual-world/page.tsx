"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function VirtualWorldPage() {
  const characterUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDlUpvqvK2FErfTRC2p0wg5x8S6KmUQ8yI6KEMgQ6OPPyGSf3SrQhRPzzSzXKeHPkeQ8FQRrO3qsE-NANrT3rOJlUU6JV4jYQXHAYP0rleZ9pqy_3mGvaCusxEFGK3zp1YiGpJFbKtO3aI0-foc_6CRN9S7gq3TSlB2gNRKrr1r_kCgCZSP9aExwUKA58yIwmzkH8SbB4tCL_TwxYYd1JFVYJ0yyTmDRSM3HEeBhHX6qK_FReliyW6fZEBOm0eyBrMrKqaW3jokFK0";
  const shopItems = [
    {
      name: "Lámpara Neón",
      price: 300,
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrzdPKYz0I27rv3XWtkduO2D8XevAgsdTK1RQf4vHOla6fQ0SquwdysDbOtpJSLjPkJc8ovtQpPIg1GpaWDwApyPUB3ia3H_OnCxBn3byF7SvMjE_slO_SZOJQSyX-GGMAAFjpb1aeG_qIWwPOAFgZ-_LGCgaMgHOlG7ubbn7-U7vh6GUr7LW8Vn1ZrectmN7bDQgjp1qpmyYkG1hrKNdEvyoz4Au3B_65ebDL7HI9hMgiUAXlD_8aHae3_bc_rK6OSIb2eJtU7pI",
    },
    {
      name: "Silla Gamer",
      price: 500,
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5zB514E2Vj7kvHLZfe40ZWeyH-EsACCgPyDBX1yhwueYVT1vMrCjleyLploR4nwQhK8WHDcyTQDWt_fft6Ab-0vleA5Zm-ugCF7MhDEkxaXTmvgYF0O_NwX3OcWoBV7Z-FcT5OnHtWZ5E_tFrXSawguMvWrOW1W67UxBdUKn3gNrvOaynYSjvf9SA0NA_IXMu7GBYZebWUsCtkLOztXnj6Qzx_svw8TE2h5_7ag4HDHPE_Ado853xqQYVSE6DsDQzS396DHpmgKQ",
    },
    {
      name: "Alfombra",
      price: 150,
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhLK3f1-WZkGkrMfihBVSSiRuu3hm3C6htf-H8CeMAi0-c6w3uskBsywCu2KsIyPhPh5O7V3qhCbSbYm8a-QWmSuzSC_U62-UgLNC1oZDr_0xxbrS63Ewhxd86XdbAHgY3_Z1YijS69GYVeDHuAc8KH-7ixstGHM7e9PiFD10M5EeWyQXxFVNgJzOFh7xIeH26zXPdKQ7gWr-nHt5OzvUmoNPQFogFZ1ujIE396piyOLskE1gfR0gfqVj6AIJMkbf-QNrj2u3mD2o",
    },
    {
      name: "Planta Zen",
      price: 200,
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2Rhd4Wv7hmu5fZoKek2c_9XRypDycDSrxwZvFaXOEMyWaWcvaecrI_L6BJ5UTqkT56owS_gHArH5y6ek45DFNxLFJkfiQ2xP2srDc8cxkNjmWVIwKDQG5_IuNkOPIoCRyjha5QuY9GXrAFpuFQ5d0RnMGahAjmiSvOQvLoNkfjdcCqN1zNwpHKB6W5IDGCCzOZFFtf2lFKpkpIUYciNdq9RMrTH8wFIKLLrg1g2p8w2ImY6-ORWygyr5-d47Kt2hdqd803konuQc",
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#111813] dark:text-white text-3xl font-bold leading-tight">
            Mundo Virtual
          </h2>
          <p className="text-[#61896f] text-base mt-2">
            ¡Personaliza tu habitación con tus premios!
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-[#1a2e20] px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <span className="material-symbols-outlined text-primary">
            confirmation_number
          </span>
          <span className="text-xl font-black text-[#111813] dark:text-white">
            1,250
          </span>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Ticks
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-0">
        {/* Main Viewport (Room) */}
        <div className="lg:col-span-2 bg-gradient-to-b from-blue-50 to-white dark:from-[#102216] dark:to-[#1a2e20] rounded-3xl relative overflow-hidden shadow-inner border border-gray-200 dark:border-gray-800 flex items-center justify-center min-h-[400px]">
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <button className="bg-white dark:bg-[#1a2e20] p-3 rounded-xl shadow-sm hover:scale-105 transition-transform text-gray-500 hover:text-primary">
              <span className="material-symbols-outlined">photo_camera</span>
            </button>
            <button className="bg-white dark:bg-[#1a2e20] p-3 rounded-xl shadow-sm hover:scale-105 transition-transform text-gray-500 hover:text-primary">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>

          {/* Isometric Room Container */}
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center perspective-1000">
            <div className="w-80 h-80 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-white/50 dark:border-white/10 relative transform rotate-x-60 rotate-z-45 transition-transform hover:rotate-z-[50deg] duration-700 ease-out">
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10 pointer-events-none">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="border border-gray-900 dark:border-white"
                  ></div>
                ))}
              </div>
            </div>

            {/* Character */}
            <div className="absolute z-20 bottom-32 transition-all hover:-translate-y-4 duration-300">
              <div
                className="w-32 h-32 bg-contain bg-center bg-no-repeat drop-shadow-2xl animate-bounce"
                style={{ backgroundImage: `url('${characterUrl}')` }}
              ></div>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 bg-white/90 dark:bg-[#1a2e20]/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-gray-100 dark:border-gray-800">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full text-gray-500 transition-colors">
              <span className="material-symbols-outlined">zoom_out</span>
            </button>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full text-gray-500 transition-colors">
              <span className="material-symbols-outlined">zoom_in</span>
            </button>
          </div>
        </div>

        {/* Shop / Inventory Sidebar */}
        <div className="bg-white dark:bg-[#1a2e20] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-full min-h-0">
          <div className="flex gap-2 p-1 bg-gray-100 dark:bg-[#102216] rounded-xl mb-6">
            <button className="flex-1 py-2 text-sm font-bold bg-white dark:bg-[#1a2e20] rounded-lg shadow-sm text-[#111813] dark:text-white transition-all">
              Tienda
            </button>
            <button className="flex-1 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-all">
              Inventario
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-2 gap-4 content-start">
            {shopItems.map((item, index) => (
              <div
                key={index}
                className="group relative bg-background-light dark:bg-[#102216] rounded-2xl p-3 border border-transparent hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="aspect-square bg-white dark:bg-[#1a2e20] rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110 duration-500"
                    style={{ backgroundImage: `url("${item.url}")` }}
                  ></div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-bold text-[#111813] dark:text-white truncate">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-1 text-[#61896f] dark:text-primary font-bold text-xs">
                    <span className="material-symbols-outlined text-[10px]">
                      confirmation_number
                    </span>
                    {item.price}
                  </div>
                </div>
                <button className="absolute top-2 right-2 bg-primary text-[#102216] p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <span className="material-symbols-outlined text-sm font-bold">
                    add
                  </span>
                </button>
              </div>
            ))}

            {/* Unlock more slots */}
            <div className="col-span-2 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-500 hover:border-gray-300 cursor-pointer transition-all">
              <span className="material-symbols-outlined">lock</span>
              <p className="text-xs font-bold uppercase tracking-wider">
                Nivel 5 Requerido
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
