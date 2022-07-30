-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "reference" TEXT,
    "description" TEXT,
    "cost" INTEGER NOT NULL DEFAULT 0,
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
INSERT INTO "new_Project" ("cost", "createdAt", "description", "durationId", "end", "id", "itemId", "name", "reference", "slug", "start", "updatedAt", "yearId") SELECT "cost", "createdAt", "description", "durationId", "end", "id", "itemId", "name", "reference", "slug", "start", "updatedAt", "yearId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE UNIQUE INDEX "Project_reference_key" ON "Project"("reference");
CREATE INDEX "Project_name_slug_reference_idx" ON "Project"("name", "slug", "reference");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
