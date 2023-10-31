import { getUser } from "@/lib/kindeAuth";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";
import { AllergyType, DietType } from "@prisma/client";

export const appRouter = router({
    authCallback: publicProcedure.query(async()=>{
        const user = getUser()
        // let redirectUrl = '/dashboard'
        let redirectUrl = '/onboarding'
        if(!user.email ||!user.id) throw new TRPCError({ code: 'UNAUTHORIZED' })

        const dbUser = await db.user.findFirst({ where: ({ id: user.id }) })    
        if(!dbUser) {
            await db.user.create({ data: { id: user.id, email: user.email } })
            redirectUrl = '/onboarding'
        }

        return { success: true, redirectUrl: redirectUrl }

    }),
    saveUserPreferences: privateProcedure.input(
        z.object({
            allergies: z.array(z.nativeEnum(AllergyType)),
            diets: z.array(z.nativeEnum(DietType)),
            servingSize: z.number(),
        })
        ).mutation(async({ ctx, input })=>{
            const { userId } = ctx
            const { allergies, diets, servingSize } = input

            try {
                    const existingAllergies = await db.userAllergy.findMany({where: {userId}})

                    // delete any existing allergies that are not in the new list

                    const allergiesToDelete = existingAllergies.filter((allergy) => !allergies.includes(allergy.allergyType))
                    if(allergiesToDelete.length > 0) {
                        await db.userAllergy.deleteMany({ where: { id: { in: allergiesToDelete.map((allergy) => allergy.id) } } })  
                    }
                    
                if(allergies.length > 0) {

                    // create new allergies that are in the list
                    const allergiesToCreate = allergies.filter((allergy) => !existingAllergies.map((allergy) => allergy.allergyType).includes(allergy))

                    await db.userAllergy.createMany({ 
                        data: allergiesToCreate.map((allergy) => (
                            { allergyType: allergy, userId: userId }))
                    })
                }

                    const existingDiets = await db.userDiet.findMany({ where: { userId } })
                    // delete any existing diets that are not in the new list

                    const dietsToDelete = existingDiets.filter((diet) => !diets.includes(diet.dietType))
                    if (dietsToDelete.length > 0) {
                        await db.userDiet.deleteMany({ where: { id: { in: dietsToDelete.map((diet) => diet.id) } } })
                    }

                if (diets.length > 0) {

                    // create new diets that are in the list

                    const dietsToCreate = diets.filter((diet) => !existingDiets.map((diet) => diet.dietType).includes(diet))    

                    await db.userDiet.createMany({
                        data: dietsToCreate.map((diet) => (
                            { dietType: diet, userId: userId }))
                    })
                }

                await db.user.update({ where: { id: userId }, data: { servingSize } })  

            } catch(error) {
                console.log(error)
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
            }


    }),

})

export type AppRouter = typeof appRouter