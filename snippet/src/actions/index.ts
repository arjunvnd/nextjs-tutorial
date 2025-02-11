"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  redirect(`/snippets/${id}`);
}

export const deleteSnippet = async (id: number) => {
  await db.snippet.delete({
    where: { id },
  });
  revalidatePath("/");
  redirect(`/`);
};

export async function crateSnippet(
  formState: { message: string },
  formData: FormData
) {
  const title = formData.get("title");
  const code = formData.get("code");

  if (typeof title !== "string" || title.length < 3) {
    return {
      message: "Title must be longer",
    };
  }

  if (typeof code !== "string" || code.length < 10) {
    return {
      message: "Code must be longer",
    };
  }

  try {
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }
    return {
      message: "Opps something went wrong",
    };
  }
  revalidatePath("/");
  redirect("/");
}
