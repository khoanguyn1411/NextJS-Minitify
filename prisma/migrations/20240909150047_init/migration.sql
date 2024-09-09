/*
  Warnings:

  - You are about to drop the `ArtistSong` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlaylistSong` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ArtistSong` DROP FOREIGN KEY `ArtistSong_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `ArtistSong` DROP FOREIGN KEY `ArtistSong_songId_fkey`;

-- DropForeignKey
ALTER TABLE `PlaylistSong` DROP FOREIGN KEY `PlaylistSong_playlistId_fkey`;

-- DropForeignKey
ALTER TABLE `PlaylistSong` DROP FOREIGN KEY `PlaylistSong_songId_fkey`;

-- AlterTable
ALTER TABLE `Song` ADD COLUMN `albumId` INTEGER NULL,
    ADD COLUMN `playlistId` INTEGER NULL;

-- DropTable
DROP TABLE `ArtistSong`;

-- DropTable
DROP TABLE `PlaylistSong`;

-- CreateTable
CREATE TABLE `_ArtistToSong` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ArtistToSong_AB_unique`(`A`, `B`),
    INDEX `_ArtistToSong_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `Playlist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArtistToSong` ADD CONSTRAINT `_ArtistToSong_A_fkey` FOREIGN KEY (`A`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArtistToSong` ADD CONSTRAINT `_ArtistToSong_B_fkey` FOREIGN KEY (`B`) REFERENCES `Song`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
