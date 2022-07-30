/*
  Warnings:

  - You are about to drop the column `cash` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `cost` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `end` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Item` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" INTEGER NOT NULL DEFAULT 2022,
    "cash" INTEGER NOT NULL DEFAULT 0,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "start" DATETIME,
    "end" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "itemId" TEXT NOT NULL,
    CONSTRAINT "Budget_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "typeId" TEXT,
    CONSTRAINT "Item_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("createdAt", "description", "id", "slug", "title", "typeId", "updatedAt") SELECT "createdAt", "description", "id", "slug", "title", "typeId", "updatedAt" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE INDEX "Item_title_slug_idx" ON "Item"("title", "slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE INDEX "Budget_itemId_year_idx" ON "Budget"("itemId", "year");
