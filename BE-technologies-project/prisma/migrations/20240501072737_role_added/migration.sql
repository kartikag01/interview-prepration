-- CreateEnum
CREATE TYPE "Roel" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Roel" NOT NULL DEFAULT 'USER';
