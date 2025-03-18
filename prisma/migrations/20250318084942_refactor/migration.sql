/*
  Warnings:

  - You are about to drop the `cause` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skill` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('OPEN', 'CLOSED', 'SOLD_OUT', 'CANCELED');

-- CreateEnum
CREATE TYPE "Urgency" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- DropForeignKey
ALTER TABLE "cause" DROP CONSTRAINT "cause_profileId_fkey";

-- DropForeignKey
ALTER TABLE "skill" DROP CONSTRAINT "skill_profileId_fkey";

-- DropTable
DROP TABLE "cause";

-- DropTable
DROP TABLE "skill";

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cause" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "Cause_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "Category" TEXT NOT NULL,
    "Availability" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VolunteerRequest" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "EventId" INTEGER NOT NULL,
    "time_left" TIMESTAMP(3) NOT NULL,
    "urgency" "Urgency" NOT NULL DEFAULT 'HIGH',

    CONSTRAINT "VolunteerRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "EventId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VolunteerHistory" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "event_name" TEXT NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VolunteerHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skill_profileId_key" ON "Skill"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Cause_profileId_key" ON "Cause"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_profileId_key" ON "Event"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "VolunteerHistory_profileId_key" ON "VolunteerHistory"("profileId");

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cause" ADD CONSTRAINT "Cause_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerRequest" ADD CONSTRAINT "VolunteerRequest_EventId_fkey" FOREIGN KEY ("EventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_EventId_fkey" FOREIGN KEY ("EventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerHistory" ADD CONSTRAINT "VolunteerHistory_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
