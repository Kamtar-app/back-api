/*
  Warnings:

  - You are about to alter the column `dateLiveInfo` on the `liveinfo` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_parentCommentId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_placeId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- AlterTable
ALTER TABLE `liveinfo` MODIFY `dateLiveInfo` DATETIME NOT NULL;

-- DropTable
DROP TABLE `comment`;
