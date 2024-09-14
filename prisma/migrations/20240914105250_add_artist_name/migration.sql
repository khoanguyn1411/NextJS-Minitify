/*
  Warnings:

  - Added the required column `firstName` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Artist` ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL;
