import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export function getUser () {
    const {getUser} = getKindeServerSession()
    const user = getUser()
    return user
}