/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "user" INTEGER,
    "event" INTEGER,
    "notes" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "UserEvent_user_fkey" FOREIGN KEY ("user") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "UserEvent_event_fkey" FOREIGN KEY ("event") REFERENCES "Event" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UserEvent" ("createdAt", "event", "id", "notes", "updatedAt", "user") SELECT "createdAt", "event", "id", "notes", "updatedAt", "user" FROM "UserEvent";
DROP TABLE "UserEvent";
ALTER TABLE "new_UserEvent" RENAME TO "UserEvent";
CREATE INDEX "UserEvent_user_idx" ON "UserEvent"("user");
CREATE INDEX "UserEvent_event_idx" ON "UserEvent"("event");
CREATE UNIQUE INDEX "UserEvent_user_event_key" ON "UserEvent"("user", "event");
CREATE TABLE "new_Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL DEFAULT '',
    "spotifyID" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Artist" ("createdAt", "id", "name", "spotifyID", "updatedAt") SELECT "createdAt", "id", "name", "spotifyID", "updatedAt" FROM "Artist";
DROP TABLE "Artist";
ALTER TABLE "new_Artist" RENAME TO "Artist";
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");
CREATE UNIQUE INDEX "Artist_spotifyID_key" ON "Artist"("spotifyID");
CREATE TABLE "new_Venue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
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
INSERT INTO "new_Venue" ("address1", "address2", "city", "createdAt", "googlePlacesID", "id", "lat", "long", "name", "state", "updatedAt", "zip") SELECT "address1", "address2", "city", "createdAt", "googlePlacesID", "id", "lat", "long", "name", "state", "updatedAt", "zip" FROM "Venue";
DROP TABLE "Venue";
ALTER TABLE "new_Venue" RENAME TO "Venue";
CREATE UNIQUE INDEX "Venue_lat_key" ON "Venue"("lat");
CREATE UNIQUE INDEX "Venue_long_key" ON "Venue"("long");
CREATE UNIQUE INDEX "Venue_googlePlacesID_key" ON "Venue"("googlePlacesID");
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL DEFAULT '',
    "date" DATETIME NOT NULL,
    "venue" INTEGER NOT NULL,
    CONSTRAINT "Event_venue_fkey" FOREIGN KEY ("venue") REFERENCES "Venue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("createdAt", "date", "id", "name", "updatedAt", "venue") SELECT "createdAt", "date", "id", "name", "updatedAt", "venue" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_name_key" ON "Event"("name");
CREATE INDEX "Event_venue_idx" ON "Event"("venue");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "authId" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_User" ("authId", "email", "firstName", "id", "lastName") SELECT "authId", "email", "firstName", "id", "lastName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");
CREATE TABLE "new_EventArtist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "eventId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,
    CONSTRAINT "EventArtist_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EventArtist" ("artistId", "createdAt", "eventId", "id", "updatedAt") SELECT "artistId", "createdAt", "eventId", "id", "updatedAt" FROM "EventArtist";
DROP TABLE "EventArtist";
ALTER TABLE "new_EventArtist" RENAME TO "EventArtist";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
