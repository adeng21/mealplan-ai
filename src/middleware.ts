
import { authMiddleware } from "@kinde-oss/kinde-auth-nextjs/server";
export const config = {
    matcher: ["/auth-callback"]
    // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]

}

export default authMiddleware