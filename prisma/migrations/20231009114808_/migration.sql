/*
  Warnings:

  - You are about to drop the column `value` on the `Type` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Type" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Type" ("id", "name") SELECT "id", "name" FROM "Type";
DROP TABLE "Type";
ALTER TABLE "new_Type" RENAME TO "Type";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
