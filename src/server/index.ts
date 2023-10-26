import { getUser } from "@/lib/kindeAuth";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";

export const appRouter = router({
    authCallback: publicProcedure.query(async()=>{
        const user = getUser()
        let redirectUrl = '/dashboard'
        if(!user.email ||!user.id) throw new TRPCError({ code: 'UNAUTHORIZED' })

        const dbUser = await db.user.findFirst({ where: ({ id: user.id }) })    
        if(!dbUser) {
            await db.user.create({ data: { id: user.id, email: user.email } })
            redirectUrl = '/onboarding'
        }

        return { success: true, redirectUrl: redirectUrl }

    })

})

export type AppRouter = typeof appRouter