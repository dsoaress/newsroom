/*
  Warnings:

  - Added the required column `blur_data_url` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" ADD COLUMN     "blur_data_url" TEXT NOT NULL;
