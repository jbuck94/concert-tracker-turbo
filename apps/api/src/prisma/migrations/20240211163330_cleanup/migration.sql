/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Article";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '',
    "spotifyID" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '',
    "address1" TEXT NOT NULL DEFAULT '',
    "address2" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT '',
    "state" TEXT NOT NULL DEFAULT '',
    "zip" TEXT NOT NULL DEFAULT '',
    "lat" REAL NOT NULL,
    "long" REAL NOT NULL,
    "googlePlacesID" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '',
    "date" DATETIME NOT NULL,
    "venue" INTEGER NOT NULL,
    CONSTRAINT "Event_venue_fkey" FOREIGN KEY ("venue") REFERENCES "Venue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EventArtist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,
    CONSTRAINT "EventArtist_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user" INTEGER,
    "event" INTEGER,
    "notes" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "UserEvent_user_fkey" FOREIGN KEY ("user") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "UserEvent_event_fkey" FOREIGN KEY ("event") REFERENCES "Event" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "authId" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_User" ("email", "id") SELECT "email", "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_spotifyID_key" ON "Artist"("spotifyID");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_lat_key" ON "Venue"("lat");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_long_key" ON "Venue"("long");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_googlePlacesID_key" ON "Venue"("googlePlacesID");

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_key" ON "Event"("name");

-- CreateIndex
CREATE INDEX "Event_venue_idx" ON "Event"("venue");

-- CreateIndex
CREATE INDEX "UserEvent_user_idx" ON "UserEvent"("user");

-- CreateIndex
CREATE INDEX "UserEvent_event_idx" ON "UserEvent"("event");

-- CreateIndex
CREATE UNIQUE INDEX "UserEvent_user_event_key" ON "UserEvent"("user", "event");
