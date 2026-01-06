-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'FREELANCER', 'CLIENT', 'ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'ACTIVE', 'BLOCKED', 'SUSPENDED', 'DELETED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "username" VARCHAR(50),
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "email_verification_token" VARCHAR(255),
    "email_verification_sent_at" TIMESTAMP(3),
    "password_reset_token" VARCHAR(255),
    "password_reset_expires" TIMESTAMP(3),
    "two_factor_enabled" BOOLEAN NOT NULL DEFAULT false,
    "two_factor_secret" VARCHAR(255),
    "first_name" VARCHAR(100),
    "last_name" VARCHAR(100),
    "avatar_url" TEXT,
    "phone" VARCHAR(20),
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
    "language" VARCHAR(10) NOT NULL DEFAULT 'ru',
    "timezone" VARCHAR(50) NOT NULL DEFAULT 'Europe/Moscow',
    "theme" VARCHAR(20) NOT NULL DEFAULT 'light',
    "last_login_at" TIMESTAMP(3),
    "last_activity_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "session_token" VARCHAR(255) NOT NULL,
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "location" VARCHAR(100),
    "device_type" VARCHAR(50),
    "is_valid" BOOLEAN NOT NULL DEFAULT true,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "device_id" VARCHAR(255),
    "device_name" VARCHAR(100),
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "is_valid" BOOLEAN NOT NULL DEFAULT true,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_devices" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "device_id" VARCHAR(255) NOT NULL,
    "device_name" VARCHAR(100) NOT NULL,
    "device_type" VARCHAR(50) NOT NULL,
    "platform" VARCHAR(50),
    "browser" VARCHAR(50),
    "ip_address" VARCHAR(45),
    "last_active_at" TIMESTAMP(3) NOT NULL,
    "is_trusted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login_attempts" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "ip_address" VARCHAR(45) NOT NULL,
    "user_agent" TEXT,
    "success" BOOLEAN NOT NULL DEFAULT false,
    "reason" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "login_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "user_devices_device_id_key" ON "user_devices"("device_id");

-- CreateIndex
CREATE INDEX "login_attempts_email_created_at_idx" ON "login_attempts"("email", "created_at");

-- CreateIndex
CREATE INDEX "login_attempts_ip_address_created_at_idx" ON "login_attempts"("ip_address", "created_at");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_devices" ADD CONSTRAINT "user_devices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
