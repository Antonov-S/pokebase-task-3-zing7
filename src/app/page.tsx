import BackgroundHeading from "@/components/background-heading";
import ItemsList from "@/components/items-list";
import Sidebar from "@/components/sidebar";
import Footer from "@/layout/footer";
import Header from "@/layout/header";

type homePageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: homePageProps) {
  const page = searchParams.page || 1;
  return (
    <>
      <BackgroundHeading />
      <main className="relative z-10 container h-[636px] bg-bcenter rounded-lg overflow-hidden grid grid-cols-[8fr_3fr] grid-rows-[59px_1fr] shadow-sm mt-12">
        <Header />
        <ItemsList page={+page} />
        <Sidebar />
      </main>
      <Footer />
    </>
  );
}
