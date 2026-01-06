-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL,
    "name_ru" VARCHAR(100) NOT NULL,
    "name_en" VARCHAR(100) NOT NULL,
    "iso_code" VARCHAR(2) NOT NULL,
    "iso_code_3" VARCHAR(3) NOT NULL,
    "numeric_code" VARCHAR(3),
    "phone_code" VARCHAR(10) NOT NULL,
    "currency_code" VARCHAR(3) NOT NULL,
    "currency_symbol" VARCHAR(10) NOT NULL,
    "timezone" VARCHAR(50) NOT NULL,
    "flag_emoji" VARCHAR(10) NOT NULL,
    "continent" VARCHAR(50) NOT NULL,
    "capital" VARCHAR(100),
    "languages" JSONB NOT NULL DEFAULT '[]',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currencies" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "name_ru" VARCHAR(100) NOT NULL,
    "name_en" VARCHAR(100) NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "symbol_native" VARCHAR(10) NOT NULL,
    "decimal_digits" INTEGER NOT NULL DEFAULT 2,
    "rounding" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "exchange_rate" DECIMAL(10,6),
    "is_base_currency" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timezones" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "gmt_offset" VARCHAR(10) NOT NULL,
    "utc_offset" VARCHAR(10) NOT NULL,
    "is_dst" BOOLEAN NOT NULL DEFAULT false,
    "country_id" TEXT,
    "country_code" VARCHAR(2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timezones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_categories" (
    "id" TEXT NOT NULL,
    "name_ru" VARCHAR(100) NOT NULL,
    "name_en" VARCHAR(100) NOT NULL,
    "description_ru" TEXT,
    "description_en" TEXT,
    "icon" VARCHAR(50),
    "color" VARCHAR(7),
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "parent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skill_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "name_ru" VARCHAR(100) NOT NULL,
    "name_en" VARCHAR(100) NOT NULL,
    "description_ru" TEXT,
    "description_en" TEXT,
    "category_id" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL DEFAULT 0,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "synonyms" JSONB NOT NULL DEFAULT '[]',
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "industries" (
    "id" TEXT NOT NULL,
    "name_ru" VARCHAR(100) NOT NULL,
    "name_en" VARCHAR(100) NOT NULL,
    "icon" VARCHAR(50),
    "parent_id" TEXT,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "industries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contract_templates" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "language" VARCHAR(10) NOT NULL,
    "content" TEXT NOT NULL,
    "variables" JSONB NOT NULL DEFAULT '[]',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "version" VARCHAR(20) NOT NULL DEFAULT '1.0.0',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contract_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legal_documents" (
    "id" TEXT NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "language" VARCHAR(10) NOT NULL,
    "version" VARCHAR(20) NOT NULL DEFAULT '1.0.0',
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "effective_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "legal_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(2) NOT NULL,
    "name_native" VARCHAR(100) NOT NULL,
    "name_en" VARCHAR(100) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "rtl" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_statuses" (
    "id" TEXT NOT NULL,
    "name_ru" VARCHAR(50) NOT NULL,
    "name_en" VARCHAR(50) NOT NULL,
    "color" VARCHAR(7) NOT NULL,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "type" VARCHAR(20) NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_categories" (
    "id" TEXT NOT NULL,
    "name_ru" VARCHAR(100) NOT NULL,
    "name_en" VARCHAR(100) NOT NULL,
    "icon" VARCHAR(50),
    "parent_id" TEXT,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_iso_code_key" ON "countries"("iso_code");

-- CreateIndex
CREATE UNIQUE INDEX "countries_iso_code_3_key" ON "countries"("iso_code_3");

-- CreateIndex
CREATE UNIQUE INDEX "currencies_code_key" ON "currencies"("code");

-- CreateIndex
CREATE UNIQUE INDEX "timezones_name_key" ON "timezones"("name");

-- CreateIndex
CREATE UNIQUE INDEX "languages_code_key" ON "languages"("code");

-- AddForeignKey
ALTER TABLE "timezones" ADD CONSTRAINT "timezones_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_categories" ADD CONSTRAINT "skill_categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "skill_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "skill_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "industries" ADD CONSTRAINT "industries_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "industries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_categories" ADD CONSTRAINT "project_categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "project_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
