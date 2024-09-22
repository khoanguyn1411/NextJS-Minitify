/*
  Warnings:

  - You are about to drop the column `songCount` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `songCount` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `songCount` on the `Playlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Album` DROP COLUMN `songCount`;

-- AlterTable
ALTER TABLE `Artist` DROP COLUMN `songCount`;

-- AlterTable
ALTER TABLE `Playlist` DROP COLUMN `songCount`;
