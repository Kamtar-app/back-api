/*
  Warnings:

  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `firstname` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `lastname` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `username`,
    ADD COLUMN `companyName` VARCHAR(255) NULL,
    ADD COLUMN `isVisibleOnMap` BOOLEAN NULL,
    ADD COLUMN `phoneNumber` VARCHAR(25) NOT NULL,
    ADD COLUMN `siret` VARCHAR(20) NULL,
    MODIFY `firstname` VARCHAR(50) NOT NULL,
    MODIFY `lastname` VARCHAR(50) NOT NULL,
    MODIFY `email` VARCHAR(300) NOT NULL;
