/*
  Warnings:

  - You are about to drop the column `firstName` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Artist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Artist` DROP COLUMN `firstName`,
    DROP COLUMN `fullName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT '';
