import pkg from '@prisma/client';
const {PrismaClient , Prisma } = pkg;


const prisma = new PrismaClient()


const createRequest = async (req, res) => {


try {
         
         const { urgency , eventId} = req.body
        

         const Eevent = await prisma.event.findUnique({
            where: {
                id: eventId
            }
          })
         

          const volunteerRequest = await prisma.volunteerRequest.create({

            data : {
                title : Eevent.title,
                time_left : Eevent.date,
                urgency : urgency,
                EventId : eventId

            }


          })
            res.status(200).json({
                message: "Created request",
                request: volunteerRequest
})
}
catch(e) {
if (e instanceof Prisma.PrismaClientKnownRequestError) {
console.error(e.code);
return res.status(500).json({ message: "Server Error" });
}
 else {
console.error(e);
return res.status(500).json({ message: "Server Error" });
 }
}

}


const updateRequest = async (req, res) => {

    
    try {
        const { urgency } = req.body;
        const requestId = Number(req.params.id);
        const existingRequest = await prisma.volunteerRequest.findUnique({ where: { id: requestId } });

        if (!existingRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        const updatedRequest = await prisma.volunteerRequest.update({
            where: {
                id: requestId
            },
            data: {
                urgency: urgency
            }
        });

        res.status(200).json({
            message: "Updated request",
            request: updatedRequest
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(e.code);
            return res.status(500).json({ message: "Server Error" });
        } else {
            console.error(e);
            return res.status(500).json({ message: "Server Error" });
        }
    }
}

const deleteRequest = async (req, res) => {


 try {
        const requestId = Number(req.params.id);
        const existingRequest = await prisma.volunteerRequest.findUnique({ where: { id: requestId } });

        if (!existingRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        await prisma.volunteerRequest.delete({
            where: {
                id: requestId
            }
        });

        res.status(200).json({
            message: "Deleted request"
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(e.code);
            return res.status(500).json({ message: "Server Error" });
        } else {
            console.error(e);
            return res.status(500).json({ message: "Server Error" });
        }
    }
}




export { createRequest, updateRequest, deleteRequest }