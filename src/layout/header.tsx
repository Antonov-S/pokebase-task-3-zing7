import Counter from "@/components/counter";
import Logo from "@/components/logo";

function Header() {
  return (
    <header className="container col-span-2 row-span-1 bg-bheader border-b border-black/5 flex justify-between items-center">
      <Logo />
      <Counter />
    </header>
  );
}

export default Header;
