/* eslint-disable jsx-a11y/label-has-associated-control */
import type { MetaFunction } from "@remix-run/node";

import { redirect } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export function loader() {
  return redirect("upload");
}

export default function Index() {
  return null;
}
