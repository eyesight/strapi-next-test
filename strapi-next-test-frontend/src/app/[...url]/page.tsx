import PageRenderer from "@/layout/PageRenderer/PageRenderer";

interface SubPageProps {
  params: Promise<{ url?: string[] }>;
}

export default async function SubPage({ params }: SubPageProps) {
  const resolvedParams = await params;
  const url = resolvedParams.url?.length ? resolvedParams.url.join('/') : '/';
  return <PageRenderer url={url} />;
}
