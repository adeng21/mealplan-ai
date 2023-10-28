import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Weekly meal planning in{" "}
          <span className="text-green-500">5 minutes</span> with AI
        </h1>

        <Link
          className={cn(buttonVariants({ size: "lg", className: "mt-10" }))}
          target="_blank"
          href="/onboarding"
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>
    </>
  );
}
