import Header from "@/app/components/Header";
import OverlayBundleView from "@/app/components/OverlayBundleView";
import { fetchOverlayBundleList } from "@/app/lib/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const options: any[] = await fetchOverlayBundleList();
  return options.map((option) =>
    ({ id: process.env.NODE_ENV === 'development' ? encodeURIComponent(option.id) : option.id }));
}

export default async function Page(
  {
    params,
    searchParams
  }: {
    params: { id: string },
    searchParams: URLSearchParams
  }
) {
  const id = decodeURIComponent(params.id);
  const search = new URLSearchParams(searchParams);
  const readonly = search.get('view') === 'readonly';
  const options: any[] = await fetchOverlayBundleList();
  const option = options.find((option) => option.id === id);

  if (!option) {
    notFound();
  }

  return (
    <>
      {readonly || <Header />}
      <main className='app min-h-screen'>
        <OverlayBundleView option={option} readonly={readonly} />
      </main>
    </>
  );
}