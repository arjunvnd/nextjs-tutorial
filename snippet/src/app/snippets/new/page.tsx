"use client";
import { useActionState } from "react";
import { crateSnippet } from "@/actions";

export default function SnippetCreateOage() {
  const [formState, action] = useActionState(crateSnippet, { message: "" });

  return (
    <form action={action}>
      <h3 className="font-bold">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="code" className="w-12">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>
        {formState.message ? (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
            {formState.message}
          </div>
        ) : null}
        <button type="submit" className="rounded p-2 bg-blue-200">
          Submit
        </button>
      </div>
    </form>
  );
}
