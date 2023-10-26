import { TRPCError, initTRPC } from '@trpc/server';
import { getUser } from '../lib/kindeAuth';
 
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();
 
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
const middleware = t.middleware;
const isAuth = middleware(async (opts)=> {

    const user = getUser()
    if(!user ||!user.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return opts.next({
        ctx: { userId: user.id, user },
    })
})
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth)