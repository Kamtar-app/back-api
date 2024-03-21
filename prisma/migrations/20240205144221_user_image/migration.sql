/*
  Warnings:

  - You are about to alter the column `dateLiveInfo` on the `liveinfo` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `imageUrl` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `liveinfo` MODIFY `dateLiveInfo` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `imageUrl` TEXT NOT NULL;
