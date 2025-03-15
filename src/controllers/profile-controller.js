import pkg from '@prisma/client';
const {PrismaClient } = pkg;


const prisma = new PrismaClient()


const createProfile = async (req, res) => {
    try {
        const userId = req.userInfo.userId;

        const { fullname, bio } = req.body;

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
                fullname: fullname,
                bio: bio,
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


// Update Profile (Without Skills & Causes)
const updateProfile = async (req, res) => {
    try {
        const userId = req.userInfo.userId;

        const { fullname, bio } = req.body;

        const existingProfile = await prisma.profile.findUnique({ where: { userId } });

        if (!existingProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const updatedProfile = await prisma.profile.update({
            where: { userId },
            data: { fullname:fullname || existingProfile.fullname, bio:bio || existingProfile.bio }
                
        });

        res.status(200).json({ message: "Profile updated successfully", profile: updatedProfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// Create Skill
const createSkill = async (req, res) => {
    try {
        const { profileId, name, level } = req.body;

        const skill = await prisma.skill.create({
            data: { profileId, name, level }
        });

        res.status(201).json({ message: "Skill added successfully", skill });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


const updateSkill = async (req, res) => {
    try {
        const { skillId, name, level } = req.body; // Getting skillId from frontend

        const existingSkill = await prisma.skill.findUnique({ where: { id: skillId } });

        if (!existingSkill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        const updatedSkill = await prisma.skill.update({
            where: { id: skillId },
            data: { name: name || existingSkill.name, level: level || existingSkill.level }
        });

        res.status(200).json({ message: "Skill updated successfully", skill: updatedSkill });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};



const createCause = async (req, res) => {
    try {
        const { profileId, name, description } = req.body;

        const cause = await prisma.cause.create({
            data: { profileId, name, description }
        });

        res.status(201).json({ message: "Cause added successfully", cause });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};



const updateCause = async (req, res) => {
    try {
        const { causeId, name, description } = req.body; // Getting causeId from frontend

        const existingCause = await prisma.cause.findUnique({ where: { id: causeId } });

        if (!existingCause) {
            return res.status(404).json({ message: "Cause not found" });
        }

        const updatedCause = await prisma.cause.update({
            where: { id: causeId },
            data: { name: name || existingCause.name, description: description || existingCause.description }
        });

        res.status(200).json({ message: "Cause updated successfully", cause: updatedCause });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};




const getProfileById = async(req,res) => {



}


















export { createProfile, updateProfile, createSkill, updateSkill, createCause, updateCause };