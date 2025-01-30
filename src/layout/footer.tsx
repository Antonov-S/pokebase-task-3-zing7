import Link from "next/link";

function Footer() {
  const currentDate = new Date();
  return (
    <footer className="container md:w-full flex justify-between items-center text-xs opacity-50 mt-3">
      <small className="text-xs">
        <p>
          {currentDate.getFullYear()}©Copyright by{" "}
          <Link
            className=""
            href="https://s-antonov-portfolio-website.vercel.app/"
            target="_blank"
          >
            <b>S.Antonov</b>
          </Link>
          . Intended for learning purposes.
        </p>
      </small>
      <p className="invisible md:visible">Version 1.0</p>
    </footer>
  );
}

export default Footer;
