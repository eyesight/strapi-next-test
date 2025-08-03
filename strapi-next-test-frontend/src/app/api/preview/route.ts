// app/api/preview/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

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
  const origin = request.headers.get("origin") || `http://${request.headers.get("host")}`;
  const redirectURL = new URL(basePath, origin);
  if (status) redirectURL.searchParams.set("status", status);

  const response = NextResponse.redirect(redirectURL);

  // 👇 Manually set preview cookies
  if (status === "draft") {
    response.cookies.set('__prerender_bypass', 'true');
    response.cookies.set('__next_preview_data', 'enabled');
  } else {
    response.cookies.set('__prerender_bypass', '', { maxAge: 0 });
    response.cookies.set('__next_preview_data', '', { maxAge: 0 });
  }

  return response;
};
