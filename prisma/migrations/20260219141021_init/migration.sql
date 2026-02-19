-- CreateTable
CREATE TABLE "IntakeSubmission" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "rawJson" TEXT NOT NULL,

    CONSTRAINT "IntakeSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorInquiry" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fund" TEXT,
    "message" TEXT NOT NULL,

    CONSTRAINT "InvestorInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IntakeSubmission_accessCode_key" ON "IntakeSubmission"("accessCode");
