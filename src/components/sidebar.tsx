import SearchPokemonForm from "./search-pokemon-form";

function Sidebar() {
  return (
    <div className="col-start-2 col-end-3 row-start-2 row-end-3 bg-[#fffcf9] border-l border-[rgba(0,0,0,0.07)] p-[18px_25px_28px] flex flex-col">
      <SearchPokemonForm />
    </div>
  );
}

export default Sidebar;
