/*
  Warnings:

  - You are about to drop the `Duration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Year` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `yearId` on the `Transfer` table. All the data in the column will be lost.
  - You are about to drop the column `durationId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `yearId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `durationId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `yearId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `yearId` on the `Chapter` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Duration_value_idx";

-- DropIndex
DROP INDEX "Duration_value_key";

-- DropIndex
DROP INDEX "Year_value_idx";

-- DropIndex
DROP INDEX "Year_value_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Duration";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Year";
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
    "from" TEXT DEFAULT '',
    "to" TEXT NOT NULL
);
INSERT INTO "new_Transfer" ("cash", "cost", "createdAt", "from", "id", "quarter", "to", "updatedAt") SELECT "cash", "cost", "createdAt", "from", "id", "quarter", "to", "updatedAt" FROM "Transfer";
DROP TABLE "Transfer";
ALTER TABLE "new_Transfer" RENAME TO "Transfer";
CREATE INDEX "Transfer_from_to_quarter_idx" ON "Transfer"("from", "to", "quarter");
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "reference" TEXT,
    "description" TEXT,
    "duration" TEXT,
    "estimated" INTEGER NOT NULL DEFAULT 0,
    "cost" INTEGER DEFAULT 0,
    "year" INTEGER NOT NULL DEFAULT 2022,
    "start" DATETIME,
    "end" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "itemId" TEXT NOT NULL,
    CONSTRAINT "Project_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("cost", "createdAt", "description", "end", "estimated", "id", "itemId", "name", "reference", "slug", "start", "updatedAt") SELECT "cost", "createdAt", "description", "end", "estimated", "id", "itemId", "name", "reference", "slug", "start", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE UNIQUE INDEX "Project_reference_key" ON "Project"("reference");
CREATE INDEX "Project_name_slug_reference_idx" ON "Project"("name", "slug", "reference");
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT,
    "cash" INTEGER NOT NULL DEFAULT 0,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "year" INTEGER NOT NULL DEFAULT 2022,
    "duration" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "typeId" TEXT,
    "chapterId" TEXT NOT NULL,
    CONSTRAINT "Item_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("cash", "chapterId", "cost", "createdAt", "description", "id", "slug", "title", "typeId", "updatedAt") SELECT "cash", "chapterId", "cost", "createdAt", "description", "id", "slug", "title", "typeId", "updatedAt" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE INDEX "Item_title_slug_idx" ON "Item"("title", "slug");
CREATE TABLE "new_Chapter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "year" INTEGER NOT NULL DEFAULT 2022,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Chapter" ("createdAt", "description", "id", "title", "updatedAt") SELECT "createdAt", "description", "id", "title", "updatedAt" FROM "Chapter";
DROP TABLE "Chapter";
ALTER TABLE "new_Chapter" RENAME TO "Chapter";
CREATE INDEX "Chapter_title_idx" ON "Chapter"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
