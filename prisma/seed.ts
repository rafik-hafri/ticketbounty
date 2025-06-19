 
import { hash } from "@node-rs/argon2"
import { PrismaClient } from "@prisma/client"
 const prisma = new PrismaClient()
 const users = [
  {
  username:"admin",
  email:"rafikhafri1@gmail.com",
  emailVerified: true
  },
  {
    username:"user",
    email:"user@gmail.com",
    emailVerified:false
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

const comments = [
  {content: "First comment from DB."},
  {content: "Second comment from DB."},
  {content: "Third comment from DB."},
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
 
  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId:dbUsers[0].id
    }))
  })
  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      ...comment,
      userId: dbUsers[1].id,
      ticketId:dbTickets[0].id
    }))
  })
}
seed()