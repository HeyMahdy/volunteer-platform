/*
  Warnings:

  - You are about to drop the column `description` on the `VolunteerRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VolunteerRequest" DROP COLUMN "description";

-- CreateTable
CREATE TABLE "VolunteerLIst" (
    "id" SERIAL NOT NULL,
    "EventId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VolunteerLIst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VolunterCount" (
    "id" SERIAL NOT NULL,
    "EventId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "VolunterCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VolunterCount_EventId_key" ON "VolunterCount"("EventId");

-- AddForeignKey
ALTER TABLE "VolunteerLIst" ADD CONSTRAINT "VolunteerLIst_EventId_fkey" FOREIGN KEY ("EventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunterCount" ADD CONSTRAINT "VolunterCount_EventId_fkey" FOREIGN KEY ("EventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
