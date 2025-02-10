"use client";

import type { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { editSnippet } from "@/actions";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  const editSnippetAction = editSnippet.bind(null, snippet.id, code);

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={snippet.code}
        options={{
          minimap: { enabled: false },
        }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="p2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
}
