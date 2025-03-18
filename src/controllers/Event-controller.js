import pkg from '@prisma/client';
const {PrismaClient , Prisma } = pkg;


const prisma = new PrismaClient()




const createEvent = async (req, res) => {
  
    try {
        const { profileId ,title, description, date, location, Availability , Category } = req.body;
               
        
            const event = await prisma.event.create({
                data: {
                    profileId : profileId,
                    title: title,
                    description: description,
                    date: date,
                    location: location,
                    Availability: Availability,
                    Category : Category,
                    volunterCount : {
                        create : {
                            count : 0
                        }
                    }

                },
                include: {
                    volunterCount: true
                }
            });
        
        res.status(200).json({
            message: "Created event",
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




const updateEvent = async (req, res) => {


    try {
        const { profileId, title, description, date, location,Availability, Category } = req.body; // Getting causeId from frontend

        const existingEvent = await prisma.event.findUnique({ where: { profileId: profileId } });

        if (!existingEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        const updatedEvent = await prisma.event.update({
            where: { profileId: profileId },
            data: { title: title || existingEvent.title, description: description || existingEvent.description, date: date || existingEvent.date, location: location || existingEvent.location, Availability: Availability || existingEvent.Availability, Category: Category || existingEvent.Category }
        });

        res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(e.code);
            return res.status(500).json({ message: "Server Error" });
        }
        console.error(e);
        return res.status(500).json({ message: "Server Error" });
    }



}

const deleteEvent = async (req, res) => {
    
    try {
        const { profileId } = req.body;
        const event = await prisma.event.delete({
            where: {
                profileId: profileId
            }
        });
        res.status(200).json({
            message: "Deleted event",
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


export { createEvent, updateEvent, deleteEvent }