/*
  Warnings:

  - You are about to drop the `AdminUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tourId,day]` on the table `TourDay` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tourId,order]` on the table `TourImage` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `difficulty` on the `Tour` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;

-- AlterTable
ALTER TABLE "TourDay" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TourImage" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "AdminUser";

-- CreateIndex
CREATE INDEX "Review_isPublic_createdAt_idx" ON "Review"("isPublic", "createdAt");

-- CreateIndex
CREATE INDEX "TourDay_tourId_idx" ON "TourDay"("tourId");

-- CreateIndex
CREATE UNIQUE INDEX "TourDay_tourId_day_key" ON "TourDay"("tourId", "day");

-- CreateIndex
CREATE INDEX "TourImage_tourId_idx" ON "TourImage"("tourId");

-- CreateIndex
CREATE UNIQUE INDEX "TourImage_tourId_order_key" ON "TourImage"("tourId", "order");
