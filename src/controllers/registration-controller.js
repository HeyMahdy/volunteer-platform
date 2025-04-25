// ... existing code ...

import pkg from '@prisma/client';
const {PrismaClient , Prisma } = pkg;


const prisma = new PrismaClient()

const registration = async (req, res) => {
    try {
        const { userId } = req.userInfo;
        const { eventName } = req.body;

        

        const event = await prisma.event.findFirst({
            include: {
                VolunterCount : true,
            }
          })

          const count = event.volunterCount.count

          if(count<1){
            return res.status(200).json({
                message: "event is full"
            });
          }

          const user = await prisma.user.findFirst({
             where : {
                id: userId
             }
          })

          const entry = await prisma.event.create({
             data : {
                VolunteerLIst : {
                    EventId : event.id,
                    name : user.email
                }
                ,
                VolunterCount : {
                    count : {
                        increment: 1 
                    }
                }

                
             }
          })


        return res.status(200).json({
            message: "Successfully registered for the event"
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error('Prisma Error:', e.code, e.message);
            return res.status(500).json({ 
                message: "Database operation failed",
                error: e.code 
            });
        }
        console.error('Server Error:', e);
        return res.status(500).json({ 
            message: "Server Error" 
        });
    }
}


export default registration;
