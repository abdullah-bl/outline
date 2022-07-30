/*
  Warnings:

  - You are about to drop the column `budget` on the `Item` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transfer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cash" INTEGER NOT NULL DEFAULT 0,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "quarter" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "from" TEXT DEFAULT '',
    "to" TEXT NOT NULL,
    "yearId" TEXT,
    CONSTRAINT "Transfer_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transfer" ("cash", "cost", "createdAt", "from", "id", "quarter", "to", "updatedAt") SELECT "cash", "cost", "createdAt", "from", "id", "quarter", "to", "updatedAt" FROM "Transfer";
DROP TABLE "Transfer";
ALTER TABLE "new_Transfer" RENAME TO "Transfer";
CREATE INDEX "Transfer_from_to_quarter_idx" ON "Transfer"("from", "to", "quarter");
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT,
    "cash" INTEGER NOT NULL DEFAULT 0,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "chapterId" TEXT NOT NULL,
    "durationId" TEXT,
    "typeId" TEXT,
    "yearId" TEXT,
    CONSTRAINT "Item_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_durationId_fkey" FOREIGN KEY ("durationId") REFERENCES "Duration" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("cash", "chapterId", "cost", "createdAt", "description", "durationId", "id", "slug", "title", "typeId", "updatedAt", "yearId") SELECT "cash", "chapterId", "cost", "createdAt", "description", "durationId", "id", "slug", "title", "typeId", "updatedAt", "yearId" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE INDEX "Item_title_slug_idx" ON "Item"("title", "slug");
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "reference" TEXT,
    "description" TEXT,
    "cost" INTEGER DEFAULT 0,
    "estimated" INTEGER NOT NULL DEFAULT 0,
    "start" DATETIME,
    "end" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "itemId" TEXT NOT NULL,
    "durationId" TEXT,
    "yearId" TEXT,
    CONSTRAINT "Project_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Project_durationId_fkey" FOREIGN KEY ("durationId") REFERENCES "Duration" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Project_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("cost", "createdAt", "description", "durationId", "end", "estimated", "id", "itemId", "name", "reference", "slug", "start", "updatedAt", "yearId") SELECT "cost", "createdAt", "description", "durationId", "end", "estimated", "id", "itemId", "name", "reference", "slug", "start", "updatedAt", "yearId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE UNIQUE INDEX "Project_reference_key" ON "Project"("reference");
CREATE INDEX "Project_name_slug_reference_idx" ON "Project"("name", "slug", "reference");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
