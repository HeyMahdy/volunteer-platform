import pkg from '@prisma/client';
const {PrismaClient , Prisma } = pkg;


const prisma = new PrismaClient()



const getEvent = async (req, res) => {


    try {
        const event = await prisma.event.findMany({
            include: {
                volunterCount: true
            }
        });

        res.status(200).json({
            message: "Fetched events",
            event: event
        })
    }
    catch (e) {
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



const getEventById = async (req, res) => {


try {

    const { id } = req.params;
    const event = await prisma.event.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            volunterCount: true
        }
    });

    res.status(200).json({
        message: "Fetched event",
        volunteerRequest: event
    })

}



catch (e) {
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


const getRequest = async (req, res) => {

 
    try {
        const vr = await prisma.volunteerRequest.findMany({});

        res.status(200).json({
            message: "Fetched events",
            volunteerRequest: vr
        })
    }
    catch (e) {
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


const getRequestById = async (req, res) => {


 
    try {

        const { id } = req.params;
        const vr = await prisma.volunteerRequest.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        const eventId = vr.EventId
        
         
        const VolunterCount = await prisma.volunterCount.findUnique({
            where: {
                EventId: eventId
            }
        });
        
    
        res.status(200).json({
            message: "Fetched events",
            volunteerRequest: vr,
            volunteerRemaining: VolunterCount
        })

    }
    catch (e) {
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


export { getEvent, getEventById, getRequest
    , getRequestById }