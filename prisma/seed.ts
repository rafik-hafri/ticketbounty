 
import { hash } from "@node-rs/argon2"
import { PrismaClient } from "@prisma/client"
 const prisma = new PrismaClient()
 const users = [
  {
  username:"admin",
  email:"rafikhafri1@gmail.com"
  },
  {
    username:"user",
    email:"user@gmail.com"
  }
 ]
 const  tickets= [
    {
        
        title: "Ticket 1",
        content:"This is the first ticket from database",
        status:'DONE' as const,
        deadline: "2025-05-01",
        bounty: 100

    },
    {
        
        title: "Ticket 2",
        content:"This is the second ticket from database",
        status:'OPEN' as const,
        deadline: "2025-05-01",
        bounty: 100
        
    },
    {
        
        title: "Ticket 3",
        content:"This is the third ticket from database",
        status:'IN_PROGRESS' as const,
        deadline: "2025-05-01",
        bounty: 100
        
    }
]
const seed = async () => {
  await prisma.ticket.deleteMany()
  await prisma.user.deleteMany()
  
   const passwordHash = await hash("password")
  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user)=>({
      ...user,
      passwordHash
    }))
  })
 
  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId:dbUsers[0].id
    }))
  })
}
seed()