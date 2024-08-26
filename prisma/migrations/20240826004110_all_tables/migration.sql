/*
  Warnings:

  - A unique constraint covering the columns `[empresaId]` on the table `TablaProduccion` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TablaProduccionEjec" DROP CONSTRAINT "TablaProduccionEjec_produccionId_fkey";

-- DropForeignKey
ALTER TABLE "TablaProduccionEjec2023" DROP CONSTRAINT "TablaProduccionEjec2023_produccionId_fkey";

-- DropForeignKey
ALTER TABLE "TablaProduccionPrVsPy" DROP CONSTRAINT "TablaProduccionPrVsPy_produccionId_fkey";

-- DropForeignKey
ALTER TABLE "TablaProduccionProg" DROP CONSTRAINT "TablaProduccionProg_produccionId_fkey";

-- DropForeignKey
ALTER TABLE "TablaProduccionProy" DROP CONSTRAINT "TablaProduccionProy_produccionId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "TablaProduccion_empresaId_key" ON "TablaProduccion"("empresaId");

-- AddForeignKey
ALTER TABLE "TablaProduccionPrVsPy" ADD CONSTRAINT "TablaProduccionPrVsPy_produccionId_fkey" FOREIGN KEY ("produccionId") REFERENCES "TablaProduccion"("empresaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TablaProduccionProg" ADD CONSTRAINT "TablaProduccionProg_produccionId_fkey" FOREIGN KEY ("produccionId") REFERENCES "TablaProduccion"("empresaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TablaProduccionProy" ADD CONSTRAINT "TablaProduccionProy_produccionId_fkey" FOREIGN KEY ("produccionId") REFERENCES "TablaProduccion"("empresaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TablaProduccionEjec" ADD CONSTRAINT "TablaProduccionEjec_produccionId_fkey" FOREIGN KEY ("produccionId") REFERENCES "TablaProduccion"("empresaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TablaProduccionEjec2023" ADD CONSTRAINT "TablaProduccionEjec2023_produccionId_fkey" FOREIGN KEY ("produccionId") REFERENCES "TablaProduccion"("empresaId") ON DELETE RESTRICT ON UPDATE CASCADE;
