import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

function getPreviewPath(
  contentType: string | undefined,
  url: string | null,
  locale: string | null,
  status: string | null
): string {
  const basePath = (() => {
    if (!contentType) return "/";
    if (contentType === "page" || contentType.includes("pages")) {
      return url && url !== "/" ? `/${url}` : "/";
    }
    if (contentType === "article" || contentType.includes("articles")) {
      return url ? `/articles/${url}` : "/articles";
    }
    return "/" + contentType;
  })();

  const localePath = locale && locale !== "en" ? `/${locale}${basePath}` : basePath;
  const statusParam = status ? `?status=${status}` : "";

  return localePath + statusParam;
}

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const { secret, url, uid, status, locale } = Object.fromEntries(searchParams);

  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const contentType = uid?.split(".").pop();
  const basePath = getPreviewPath(contentType, url, locale, null); // get path without status query

  // Build full URL with status query param properly
  const origin = request.headers.get("origin") || `http://${request.headers.get("host")}`;
  const redirectURL = new URL(basePath, origin);
  if (status) redirectURL.searchParams.set("status", status);

  const draft = draftMode();
  if (status === "draft") {
    await draft.enable();
  } else {
    await draft.disable();
  }

  return NextResponse.redirect(redirectURL);
};

