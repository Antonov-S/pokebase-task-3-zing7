import { Suspense } from "react";

import ItemsList from "@/components/items-list";
import Sidebar from "@/components/sidebar";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Loading from "./loading";
import { PokemonCountProvider } from "@/contexts/pokemon-count-context";
import { DataLoader } from "@/components/data-loader";

type HomePageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: HomePageProps) {
  const page = Number(searchParams.page) || 1;
  const query = searchParams.query
    ? Array.isArray(searchParams.query)
      ? searchParams.query[0]
      : searchParams.query
    : "";
  const type = searchParams.type
    ? Array.isArray(searchParams.type)
      ? searchParams.type[0]
      : searchParams.type
    : "";

  try {
    const data = await DataLoader({ page, query, type });

    return (
      <PokemonCountProvider>
        <main className="relative z-10 container h-[636px] bg-bcenter rounded-lg overflow-hidden grid grid-cols-[8fr_3fr] grid-rows-[59px_1fr] shadow-sm mt-12">
          <Header />
          <Suspense key={`${page}-${query}-${type}`} fallback={<Loading />}>
            <ItemsList
              page={page}
              query={query}
              type={type}
              populatedResults={data.populatedResults}
              totalPages={data.totalPages}
              totalResults={data.totalResults}
            />
          </Suspense>
          <Sidebar />
        </main>
        <Footer />
      </PokemonCountProvider>
    );
  } catch (error) {
    console.error("Error in Home:", error);

    return (
      <PokemonCountProvider>
        <main className="relative z-10 container h-[636px] bg-bcenter rounded-lg overflow-hidden grid grid-cols-[8fr_3fr] grid-rows-[59px_1fr] shadow-sm mt-12">
          <Header />
          <div>Error loading data</div>
          <Sidebar />
        </main>
        <Footer />
      </PokemonCountProvider>
    );
  }
}
