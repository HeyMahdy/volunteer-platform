import pkg from '@prisma/client';
const {PrismaClient } = pkg;


const prisma = new PrismaClient()



const createProfile = async (req, res) => {
    try {
        const userId = req.userInfo.userId;
        
        const { bio, age } = req.body;

        console.log(userId);
        console.log(req.userInfo);

        // Check if the user already has a profile
        const existingProfile = await prisma.profile.findUnique({
            where: {
                userId: userId
            }
        });

        if (existingProfile) {
            return res.status(400).json({
                message: "User already has a profile"
            });
        }

        // Create a new profile if it doesn't exist
        const profile = await prisma.profile.create({
            data: {
                bio: bio,
                age: age,
                userId: userId
            }
        });

        res.status(200).json({
            message: "Created profile",
            profile: profile
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};
