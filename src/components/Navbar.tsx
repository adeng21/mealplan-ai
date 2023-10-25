import MaxWidthWrapper from "./MaxWidthWrapper";
import { getUser } from "../lib/kindeAuth";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

const NavBar = () => {
  const user = getUser();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blug-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-gray-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>Mealplan AI</span>
          </Link>
          <RegisterLink className={buttonVariants({ size: "sm" })}>
            {" "}
            Sign up
          </RegisterLink>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default NavBar;
