import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import React, { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Result from "./components/Scan/Result";

import IReceiptData from "~/types/IReceiptData";

import { Toaster } from 'sonner'

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader() {
  return json({
    ENV: {
      API_URL: process.env.API_URL
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const [receiptData, setReceiptData] = useState<IReceiptData|null>(null);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-screen items-center justify-center relative">
        <Toaster position="top-right" richColors={true} />
        <div className="flex flex-col md:hidden w-full h-full">
          <Header points={0} />
          {receiptData ? <Result className="min-h-full flex-1 overflow-auto" receiptData={receiptData} onClose={() => setReceiptData(null)} /> : 
          <div className="flex-1 overflow-auto py-4 px-8">
            {children}
          </div>
            }
          <Footer onScan={(data) => setReceiptData(data)} />
        </div>
        <div className="hidden md:flex text-center">This site is designed for mobile devices only. Please visit from a mobile device to view this content.</div>
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
              data.ENV
            )}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
