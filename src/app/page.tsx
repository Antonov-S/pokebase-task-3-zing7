import BackgroundHeading from "@/components/background-heading";
import Sidebar from "@/components/sidebar";
import Footer from "@/layout/footer";
import Header from "@/layout/header";

export default function Home() {
  return (
    <>
      <BackgroundHeading />
      <main className="relative z-10 container h-[636px] bg-bcenter rounded-lg overflow-hidden grid grid-cols-[8fr_3fr] grid-rows-[59px_1fr] shadow-sm mt-12">
        <Header />
        <Sidebar />
      </main>
      <Footer />
    </>
  );
}
