/*
  Warnings:

  - You are about to drop the column `year` on the `Project` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "reference" TEXT,
    "description" TEXT,
    "duration" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "estimated" INTEGER NOT NULL DEFAULT 0,
    "cost" INTEGER DEFAULT 0,
    "start" DATETIME,
    "end" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "itemId" TEXT NOT NULL,
    CONSTRAINT "Project_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("cost", "createdAt", "description", "duration", "end", "estimated", "id", "itemId", "name", "reference", "slug", "start", "updatedAt") SELECT "cost", "createdAt", "description", "duration", "end", "estimated", "id", "itemId", "name", "reference", "slug", "start", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE UNIQUE INDEX "Project_reference_key" ON "Project"("reference");
CREATE INDEX "Project_name_slug_reference_idx" ON "Project"("name", "slug", "reference");
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("authorId", "content", "createdAt", "id", "pinned", "title", "updatedAt") SELECT "authorId", "content", "createdAt", "id", "pinned", "title", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
