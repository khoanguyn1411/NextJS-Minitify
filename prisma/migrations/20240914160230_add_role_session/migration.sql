-- AlterTable
ALTER TABLE `Session` ADD COLUMN `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user';
