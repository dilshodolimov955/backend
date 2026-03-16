/*
  Warnings:

  - You are about to drop the column `status` on the `HomeworkResponse` table. All the data in the column will be lost.
  - Added the required column `groupId` to the `Homework` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `LessonVideo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "HomeworkStatus" ADD VALUE 'NOT_REVIEWED';

-- AlterTable
ALTER TABLE "Homework" ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "HomeworkResponse" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "LessonVideo" ADD COLUMN     "groupId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "HomeworkStatusStudent";
