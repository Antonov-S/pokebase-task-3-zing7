import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

type PaginationControlsProps = {
  previousPath: string;
  nextPath: string;
};

export default function PaginationControls({
  previousPath,
  nextPath
}: PaginationControlsProps) {
  return (
    <section className="flex justify-between w-full">
      {previousPath ? (
        <Link href={previousPath}>
          <Button className="h-[35px] w-[110px] border-none rounded bg-brown3 text-white text-base cursor-pointer flex justify-center items-center transition-all duration-200 hover:bg-brown4 mt-4 ml-4">
            <ArrowLeftIcon />
            Previous
          </Button>
        </Link>
      ) : (
        <div />
      )}

      {nextPath ? (
        <Link href={nextPath}>
          <Button className="h-[35px] w-[110px] border-none rounded bg-brown3 text-white text-base cursor-pointer flex justify-center items-center transition-all duration-200 hover:bg-brown4 mt-4 mr-4">
            Next
            <ArrowRightIcon />
          </Button>
        </Link>
      ) : (
        <div />
      )}
    </section>
  );
}
