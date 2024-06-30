import Image from "next/image";
import Link from "next/link";

import dots from "../../public/dots.png";

function Logo() {
  return (
    <Link href="/" replace>
      <Image
        src={dots}
        width={76}
        height={20}
        alt="Dots logo"
        className="ml-5 w-[76px] h-auto object-cover"
      />
    </Link>
  );
}

export default Logo;
