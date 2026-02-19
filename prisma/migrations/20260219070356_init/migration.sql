-- CreateTable
CREATE TABLE "IntakeSubmission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accessCode" TEXT NOT NULL,
    "refCode" TEXT,
    "role" TEXT NOT NULL,
    "industries" TEXT NOT NULL,
    "primaryLanguage" TEXT NOT NULL,
    "otherLanguages" TEXT NOT NULL,
    "locationCountry" TEXT NOT NULL,
    "locationCity" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "tone" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "portfolioUrl" TEXT,
    "challenge" TEXT,
    "rawJson" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "InvestorInquiry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fund" TEXT,
    "message" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "IntakeSubmission_accessCode_key" ON "IntakeSubmission"("accessCode");
