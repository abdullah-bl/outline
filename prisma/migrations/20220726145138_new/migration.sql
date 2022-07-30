/*
  Warnings:

  - You are about to drop the `Chapter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Setting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `from` on the `Transfer` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `Transfer` table. All the data in the column will be lost.
  - You are about to drop the column `chapterId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Item` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `Transfer` table without a default value. This is not possible if the table is not empty.
  - Made the column `slug` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Chapter_title_idx";

-- DropIndex
DROP INDEX "ItemHistory_itemId_statusId_idx";

-- DropIndex
DROP INDEX "Setting_name_idx";

-- DropIndex
DROP INDEX "Setting_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Chapter";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ItemHistory";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Setting";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transfer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cash" INTEGER NOT NULL DEFAULT 0,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "quarter" INTEGER NOT NULL DEFAULT 1,
    "year" INTEGER NOT NULL DEFAULT 2022,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "itemId" TEXT NOT NULL,
    CONSTRAINT "Transfer_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transfer" ("cash", "cost", "createdAt", "id", "quarter", "updatedAt", "year") SELECT "cash", "cost", "createdAt", "id", "quarter", "updatedAt", "year" FROM "Transfer";
DROP TABLE "Transfer";
ALTER TABLE "new_Transfer" RENAME TO "Transfer";
CREATE INDEX "Transfer_quarter_itemId_idx" ON "Transfer"("quarter", "itemId");
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "cash" INTEGER NOT NULL DEFAULT 0,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "start" DATETIME,
    "end" DATETIME,
    "typeId" TEXT,
    CONSTRAINT "Item_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("cash", "cost", "createdAt", "description", "id", "slug", "title", "typeId", "updatedAt") SELECT "cash", "cost", "createdAt", "description", "id", "slug", "title", "typeId", "updatedAt" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE INDEX "Item_title_slug_idx" ON "Item"("title", "slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
