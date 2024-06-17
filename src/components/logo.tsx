import Image from "next/image";

import dots from "../../public/dots.png";

function Logo() {
  return (
    <Image src={dots} width={76} height={20} alt="Dots logo" className="ml-5" />
  );
}

export default Logo;
