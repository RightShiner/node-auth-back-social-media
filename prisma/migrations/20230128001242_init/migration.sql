-- DropIndex
DROP INDEX `users_email_unique` ON `users`;

-- DropIndex
DROP INDEX `users_role_id_index` ON `users`;

-- AlterTable
ALTER TABLE `users` MODIFY `email_verified_at` DATETIME(0) NULL,
    MODIFY `created_at` DATETIME(0) NULL,
    MODIFY `updated_at` DATETIME(0) NULL;
