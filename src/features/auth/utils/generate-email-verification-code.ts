import { prisma } from "@/lib/prisma"
import { generateRandomCode } from "@/utils/crypto"

const EMAIL_VERIICATION_TOKEN_LIFETIME_MS  = 1000 *60 *60 *24 //15 MIN
export const generateEmailVerification = async (userId: string, email:string) => {
    await prisma.emailVerificationToken.deleteMany({
        where: {
            userId
        }
    })
    const code = generateRandomCode()
    await prisma.emailVerificationToken.create({
        data: {
            code,
            userId,
            email,
            expiresAt: new Date(Date.now() + EMAIL_VERIICATION_TOKEN_LIFETIME_MS)
        }
    })
    return code
}