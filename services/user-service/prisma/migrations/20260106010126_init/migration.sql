-- CreateEnum
CREATE TYPE "ProfileVisibility" AS ENUM ('PUBLIC', 'PRIVATE', 'TEAM_ONLY', 'CONNECTIONS_ONLY');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('FREELANCER', 'CLIENT', 'AGENCY', 'COMPANY');

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_type" "UserType" NOT NULL DEFAULT 'FREELANCER',
    "display_name" VARCHAR(100),
    "headline" VARCHAR(255),
    "bio" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "gender" VARCHAR(20),
    "country_code" VARCHAR(2),
    "city" VARCHAR(100),
    "address" TEXT,
    "postal_code" VARCHAR(20),
    "job_title" VARCHAR(100),
    "company" VARCHAR(100),
    "website" VARCHAR(255),
    "skills" JSONB NOT NULL DEFAULT '[]',
    "hourly_rate" DECIMAL(10,2),
    "currency" VARCHAR(3) NOT NULL DEFAULT 'USD',
    "github_url" VARCHAR(255),
    "linkedin_url" VARCHAR(255),
    "twitter_url" VARCHAR(255),
    "portfolio_url" VARCHAR(255),
    "other_links" JSONB NOT NULL DEFAULT '[]',
    "total_earned" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "completed_projects" INTEGER NOT NULL DEFAULT 0,
    "ongoing_projects" INTEGER NOT NULL DEFAULT 0,
    "rating" DECIMAL(3,2) NOT NULL DEFAULT 0,
    "review_count" INTEGER NOT NULL DEFAULT 0,
    "response_rate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "response_time" INTEGER,
    "visibility" "ProfileVisibility" NOT NULL DEFAULT 'PUBLIC',
    "available_for_work" BOOLEAN NOT NULL DEFAULT true,
    "notification_email" BOOLEAN NOT NULL DEFAULT true,
    "notification_push" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "last_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiences" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "location" VARCHAR(100),
    "description" TEXT,
    "employment_type" VARCHAR(50) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "currently_working" BOOLEAN NOT NULL DEFAULT false,
    "skills" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "institution" VARCHAR(255) NOT NULL,
    "degree" VARCHAR(255) NOT NULL,
    "field_of_study" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "currently_studying" BOOLEAN NOT NULL DEFAULT false,
    "grade" VARCHAR(50),
    "activities" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "issuer" VARCHAR(255) NOT NULL,
    "issue_date" TIMESTAMP(3) NOT NULL,
    "expiration_date" TIMESTAMP(3),
    "credential_id" VARCHAR(255),
    "credential_url" VARCHAR(255),
    "skills" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_user_id_key" ON "user_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certifications" ADD CONSTRAINT "certifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
