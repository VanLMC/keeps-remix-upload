import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "./tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}

        <ScrollRestoration />
        <Scripts />
        {/* <LiveReload /> */}
        <ToastContainer theme="dark" limit={3} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
