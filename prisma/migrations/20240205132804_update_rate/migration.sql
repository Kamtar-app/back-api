/*
  Warnings:

  - You are about to alter the column `dateLiveInfo` on the `liveinfo` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `averageRates` on the `place` table. All the data in the column will be lost.
  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageUrl` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Rate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_parentCommentId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_placeId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- AlterTable
ALTER TABLE `liveinfo` MODIFY `dateLiveInfo` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `place` DROP COLUMN `averageRates`,
    ADD COLUMN `imageUrl` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `rate` ADD COLUMN `content` TEXT NOT NULL;

-- DropTable
DROP TABLE `comment`;
