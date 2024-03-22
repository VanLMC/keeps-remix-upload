import type { ActionFunctionArgs } from "@remix-run/node";
import {
  json,
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import fs from "fs/promises";
import path from "path";

export async function loader() {
  const folderPath = path.join("uploads");

  try {
    const files = await fs.readdir(folderPath);

    return json({ files });
  } catch (error) {
    console.error("Error listing files:", error);

    return json({ error: "Failed to list files" }, { status: 500 });
  }
}

export const standardFileUploadHandler = unstable_createFileUploadHandler({
  directory: "uploads",
});

export async function action({ request }: ActionFunctionArgs) {
  try {
    const form = await unstable_parseMultipartFormData(
      request,
      standardFileUploadHandler
    );
    const file = form.get("file");
    if (!file) {
      console.log(file, "file");

      return json({
        success: false,
        error: { message: "Please select a file" },
      });
    }
    return json({ success: true, error: null });
  } catch (error) {
    return json({ success: false, error: { message: error.message } });
  }
}

export default function Index() {
  const actionData = useActionData();
  const loaderData = useLoaderData();

  return (
    <div className="flex items-center h-screen bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto dark:bg-gray-700 p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-400 text-center">
            Upload a File
          </h2>
          <form method="post" encType="multipart/form-data">
            <div className="flex items-center justify-center w-full">
              <input
                className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                name="file"
                type="file"
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-violet-600 border border-transparent rounded-md font-semibold text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Upload
              </button>
            </div>
            {actionData?.success ? (
              <div
                className="mt-2 bg-teal-400 text-teal-900  px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">
                  File successfully uploaded
                </span>
              </div>
            ) : null}

            {actionData?.error ? (
              <div
                className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">
                  {actionData?.error.message}
                </span>
              </div>
            ) : null}
          </form>
        </div>

        <div className="mt-6 text-white text-center">
          {loaderData?.files
            ? loaderData?.files.map((file) => <div>{file}</div>)
            : null}
        </div>
      </div>
    </div>
  );
}
