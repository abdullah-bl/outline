/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `cost` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ItemHistory` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `file` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ProjectHistory` table. All the data in the column will be lost.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `itemId` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `chapterId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_title_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Category";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Year" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL DEFAULT '2023',
    "default" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "yearId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Chapter_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Duration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT,
    "budget" INTEGER NOT NULL DEFAULT 0,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "itemId" TEXT NOT NULL,
    "durationId" TEXT,
    "yearId" TEXT,
    CONSTRAINT "Project_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Project_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Project_durationId_fkey" FOREIGN KEY ("durationId") REFERENCES "Duration" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("createdAt", "description", "id", "itemId", "updatedAt") SELECT "createdAt", "description", "id", "itemId", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE INDEX "Project_name_slug_idx" ON "Project"("name", "slug");
CREATE TABLE "new_Status" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "value" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Status" ("createdAt", "description", "id", "title", "updatedAt") SELECT "createdAt", "description", "id", "title", "updatedAt" FROM "Status";
DROP TABLE "Status";
ALTER TABLE "new_Status" RENAME TO "Status";
CREATE UNIQUE INDEX "Status_title_key" ON "Status"("title");
CREATE INDEX "Status_title_idx" ON "Status"("title");
CREATE TABLE "new_ItemHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "note" TEXT,
    "itemId" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ItemHistory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemHistory_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemHistory" ("createdAt", "id", "itemId", "statusId", "updatedAt") SELECT "createdAt", "id", "itemId", "statusId", "updatedAt" FROM "ItemHistory";
DROP TABLE "ItemHistory";
ALTER TABLE "new_ItemHistory" RENAME TO "ItemHistory";
CREATE INDEX "ItemHistory_itemId_statusId_idx" ON "ItemHistory"("itemId", "statusId");
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT,
    "budget" INTEGER NOT NULL DEFAULT 0,
    "cash" INTEGER NOT NULL DEFAULT 0,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "chapterId" TEXT NOT NULL,
    "durationId" TEXT,
    "typeId" TEXT,
    "yearId" TEXT,
    CONSTRAINT "Item_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_durationId_fkey" FOREIGN KEY ("durationId") REFERENCES "Duration" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("budget", "cash", "cost", "createdAt", "description", "id", "title", "updatedAt") SELECT "budget", "cash", "cost", "createdAt", "description", "id", "title", "updatedAt" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE INDEX "Item_title_slug_idx" ON "Item"("title", "slug");
CREATE TABLE "new_Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "url" TEXT,
    "authorId" TEXT,
    "projectId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Document_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Document_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Document" ("authorId", "content", "createdAt", "id", "projectId", "title", "updatedAt") SELECT "authorId", "content", "createdAt", "id", "projectId", "title", "updatedAt" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
CREATE INDEX "Document_title_projectId_idx" ON "Document"("title", "projectId");
CREATE TABLE "new_ProjectHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "note" TEXT,
    "value" INTEGER DEFAULT 0,
    "projectId" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProjectHistory_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProjectHistory_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProjectHistory" ("createdAt", "id", "projectId", "statusId", "updatedAt") SELECT "createdAt", "id", "projectId", "statusId", "updatedAt" FROM "ProjectHistory";
DROP TABLE "ProjectHistory";
ALTER TABLE "new_ProjectHistory" RENAME TO "ProjectHistory";
CREATE INDEX "ProjectHistory_projectId_statusId_idx" ON "ProjectHistory"("projectId", "statusId");
CREATE TABLE "new_Transfer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cash" INTEGER NOT NULL DEFAULT 0,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "quarter" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "from" TEXT DEFAULT '',
    "to" TEXT NOT NULL
);
INSERT INTO "new_Transfer" ("cash", "cost", "createdAt", "from", "id", "quarter", "to", "updatedAt") SELECT "cash", "cost", "createdAt", "from", "id", "quarter", "to", "updatedAt" FROM "Transfer";
DROP TABLE "Transfer";
ALTER TABLE "new_Transfer" RENAME TO "Transfer";
CREATE INDEX "Transfer_from_to_quarter_idx" ON "Transfer"("from", "to", "quarter");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Setting_name_key" ON "Setting"("name");

-- CreateIndex
CREATE INDEX "Setting_name_idx" ON "Setting"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Year_value_key" ON "Year"("value");

-- CreateIndex
CREATE INDEX "Year_value_idx" ON "Year"("value");

-- CreateIndex
CREATE INDEX "Chapter_title_idx" ON "Chapter"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Duration_value_key" ON "Duration"("value");

-- CreateIndex
CREATE INDEX "Duration_value_idx" ON "Duration"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Type_value_key" ON "Type"("value");

-- CreateIndex
CREATE INDEX "Type_value_idx" ON "Type"("value");
