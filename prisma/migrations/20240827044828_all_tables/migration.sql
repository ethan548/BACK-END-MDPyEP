-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "idOrden" INTEGER NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaVentasProgramado" (
    "empId" INTEGER NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "tablaVentasProyectado" (
    "empId" INTEGER NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "tablaVentasEjecutado" (
    "empId" INTEGER NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "tablaVentasPrVsPy" (
    "empId" INTEGER NOT NULL,
    "registro" TEXT NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "tablaVentasEjecutado2023" (
    "empId" INTEGER NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "tablaIngresosEgresos" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,

    CONSTRAINT "tablaIngresosEgresos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaEgresosPrVsPy" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "registro" TEXT NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tablaEgresosPrVsPy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaIngresosPrVsPy" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "registro" TEXT NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tablaIngresosPrVsPy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaIngresos" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,

    CONSTRAINT "tablaIngresos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaIngresosProg" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tablaIngresosProg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaIngresosProy" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tablaIngresosProy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaIngresosEje" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tablaIngresosEje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaIngresosEje2023" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tablaIngresosEje2023_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaEgresos" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,

    CONSTRAINT "tablaEgresos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaEgresosProg" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tablaEgresosProg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaEgresosProy" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tablaEgresosProy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaEgresosEj" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tablaEgresosEj_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaEgresosEj2023" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tablaEgresosEj2023_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TablaProduccion" (
    "id" SERIAL NOT NULL,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "TablaProduccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TablaProduccionPrVsPy" (
    "id" SERIAL NOT NULL,
    "produccionId" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "registro" TEXT NOT NULL,
    "producto" TEXT NOT NULL,
    "medida" TEXT NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TablaProduccionPrVsPy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TablaProduccionProg" (
    "id" SERIAL NOT NULL,
    "produccionId" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "producto" TEXT NOT NULL,
    "medida" TEXT NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TablaProduccionProg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TablaProduccionProy" (
    "id" SERIAL NOT NULL,
    "produccionId" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "producto" TEXT NOT NULL,
    "medida" TEXT NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TablaProduccionProy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TablaProduccionEjec" (
    "id" SERIAL NOT NULL,
    "produccionId" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "producto" TEXT NOT NULL,
    "medida" TEXT NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TablaProduccionEjec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TablaProduccionEjec2023" (
    "id" SERIAL NOT NULL,
    "produccionId" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "producto" TEXT NOT NULL,
    "medida" TEXT NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TablaProduccionEjec2023_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaSaldos" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,

    CONSTRAINT "tablaSaldos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaSaldosDisponible" (
    "empId" INTEGER NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "tablaSaldosInventarios" (
    "empId" INTEGER NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "tablaSaldosCobrar" (
    "empId" INTEGER NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "tablaSaldosPagar" (
    "empId" INTEGER NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "tablaCapacidad" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,

    CONSTRAINT "tablaCapacidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaCapacidadLineas" (
    "id" SERIAL NOT NULL,
    "tablaCapacidadId" INTEGER NOT NULL,
    "linea" TEXT NOT NULL,

    CONSTRAINT "tablaCapacidadLineas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaCapacidadCantidades" (
    "id" SERIAL NOT NULL,
    "tablaLineasId" INTEGER NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tablaCapacidadCantidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaCapacidadMedidas" (
    "id" SERIAL NOT NULL,
    "tablaLineasId" INTEGER NOT NULL,
    "medida" TEXT NOT NULL,

    CONSTRAINT "tablaCapacidadMedidas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaCapacidadProg" (
    "id" SERIAL NOT NULL,
    "tablaLineasId" INTEGER NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tablaCapacidadProg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablaCapacidadEjec" (
    "id" SERIAL NOT NULL,
    "tablaLineasId" INTEGER NOT NULL,
    "ene" DOUBLE PRECISION NOT NULL,
    "feb" DOUBLE PRECISION NOT NULL,
    "mar" DOUBLE PRECISION NOT NULL,
    "abr" DOUBLE PRECISION NOT NULL,
    "may" DOUBLE PRECISION NOT NULL,
    "jun" DOUBLE PRECISION NOT NULL,
    "jul" DOUBLE PRECISION NOT NULL,
    "ago" DOUBLE PRECISION NOT NULL,
    "sep" DOUBLE PRECISION NOT NULL,
    "oct" DOUBLE PRECISION NOT NULL,
    "nov" DOUBLE PRECISION NOT NULL,
    "dic" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tablaCapacidadEjec_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_nombre_key" ON "Empresa"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_idOrden_key" ON "Empresa"("idOrden");

-- CreateIndex
CREATE UNIQUE INDEX "tablaVentasProgramado_empId_key" ON "tablaVentasProgramado"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaVentasProyectado_empId_key" ON "tablaVentasProyectado"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaVentasEjecutado_empId_key" ON "tablaVentasEjecutado"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaVentasPrVsPy_empId_key" ON "tablaVentasPrVsPy"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaVentasEjecutado2023_empId_key" ON "tablaVentasEjecutado2023"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaIngresosEgresos_empId_key" ON "tablaIngresosEgresos"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaEgresosPrVsPy_empId_key" ON "tablaEgresosPrVsPy"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaIngresosPrVsPy_empId_key" ON "tablaIngresosPrVsPy"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaIngresos_empId_key" ON "tablaIngresos"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaIngresosProg_empId_key" ON "tablaIngresosProg"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaIngresosProy_empId_key" ON "tablaIngresosProy"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaIngresosEje_empId_key" ON "tablaIngresosEje"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaIngresosEje2023_empId_key" ON "tablaIngresosEje2023"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaEgresos_empId_key" ON "tablaEgresos"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaEgresosProg_empId_key" ON "tablaEgresosProg"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaEgresosProy_empId_key" ON "tablaEgresosProy"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaEgresosEj_empId_key" ON "tablaEgresosEj"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaEgresosEj2023_empId_key" ON "tablaEgresosEj2023"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "TablaProduccion_empresaId_key" ON "TablaProduccion"("empresaId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaSaldos_empId_key" ON "tablaSaldos"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaSaldosDisponible_empId_key" ON "tablaSaldosDisponible"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaSaldosInventarios_empId_key" ON "tablaSaldosInventarios"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaSaldosCobrar_empId_key" ON "tablaSaldosCobrar"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaSaldosPagar_empId_key" ON "tablaSaldosPagar"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaCapacidadCantidades_tablaLineasId_key" ON "tablaCapacidadCantidades"("tablaLineasId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaCapacidadMedidas_tablaLineasId_key" ON "tablaCapacidadMedidas"("tablaLineasId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaCapacidadProg_tablaLineasId_key" ON "tablaCapacidadProg"("tablaLineasId");

-- CreateIndex
CREATE UNIQUE INDEX "tablaCapacidadEjec_tablaLineasId_key" ON "tablaCapacidadEjec"("tablaLineasId");

-- AddForeignKey
ALTER TABLE "tablaVentasProgramado" ADD CONSTRAINT "tablaVentasProgramado_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaVentasProyectado" ADD CONSTRAINT "tablaVentasProyectado_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaVentasEjecutado" ADD CONSTRAINT "tablaVentasEjecutado_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaVentasPrVsPy" ADD CONSTRAINT "tablaVentasPrVsPy_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaVentasEjecutado2023" ADD CONSTRAINT "tablaVentasEjecutado2023_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaIngresosEgresos" ADD CONSTRAINT "tablaIngresosEgresos_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaEgresosPrVsPy" ADD CONSTRAINT "tablaEgresosPrVsPy_empId_fkey" FOREIGN KEY ("empId") REFERENCES "tablaIngresosEgresos"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaIngresosPrVsPy" ADD CONSTRAINT "tablaIngresosPrVsPy_empId_fkey" FOREIGN KEY ("empId") REFERENCES "tablaIngresosEgresos"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaIngresos" ADD CONSTRAINT "tablaIngresos_empId_fkey" FOREIGN KEY ("empId") REFERENCES "tablaIngresosEgresos"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaIngresosProg" ADD CONSTRAINT "tablaIngresosProg_empId_fkey" FOREIGN KEY ("empId") REFERENCES "tablaIngresos"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaIngresosProy" ADD CONSTRAINT "tablaIngresosProy_empId_fkey" FOREIGN KEY ("empId") REFERENCES "tablaIngresos"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaIngresosEje" ADD CONSTRAINT "tablaIngresosEje_empId_fkey" FOREIGN KEY ("empId") REFERENCES "tablaIngresos"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaIngresosEje2023" ADD CONSTRAINT "tablaIngresosEje2023_empId_fkey" FOREIGN KEY ("empId") REFERENCES "tablaIngresos"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaEgresos" ADD CONSTRAINT "tablaEgresos_empId_fkey" FOREIGN KEY ("empId") REFERENCES "tablaIngresosEgresos"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaEgresosProg" ADD CONSTRAINT "tablaEgresosProg_empId_fkey" FOREIGN KEY ("empId") REFERENCES "tablaEgresos"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaEgresosProy" ADD CONSTRAINT "tablaEgresosProy_empId_fkey" FOREIGN KEY ("empId") REFERENCES "tablaEgresos"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaEgresosEj" ADD CONSTRAINT "tablaEgresosEj_empId_fkey" FOREIGN KEY ("empId") REFERENCES "tablaEgresos"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaEgresosEj2023" ADD CONSTRAINT "tablaEgresosEj2023_empId_fkey" FOREIGN KEY ("empId") REFERENCES "tablaEgresos"("empId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TablaProduccion" ADD CONSTRAINT "TablaProduccion_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "tablaSaldos" ADD CONSTRAINT "tablaSaldos_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaSaldosDisponible" ADD CONSTRAINT "tablaSaldosDisponible_empId_fkey" FOREIGN KEY ("empId") REFERENCES "tablaSaldos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaSaldosInventarios" ADD CONSTRAINT "tablaSaldosInventarios_empId_fkey" FOREIGN KEY ("empId") REFERENCES "tablaSaldos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaSaldosCobrar" ADD CONSTRAINT "tablaSaldosCobrar_empId_fkey" FOREIGN KEY ("empId") REFERENCES "tablaSaldos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaSaldosPagar" ADD CONSTRAINT "tablaSaldosPagar_empId_fkey" FOREIGN KEY ("empId") REFERENCES "tablaSaldos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaCapacidad" ADD CONSTRAINT "tablaCapacidad_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaCapacidadLineas" ADD CONSTRAINT "tablaCapacidadLineas_tablaCapacidadId_fkey" FOREIGN KEY ("tablaCapacidadId") REFERENCES "tablaCapacidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaCapacidadCantidades" ADD CONSTRAINT "tablaCapacidadCantidades_tablaLineasId_fkey" FOREIGN KEY ("tablaLineasId") REFERENCES "tablaCapacidadLineas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaCapacidadMedidas" ADD CONSTRAINT "tablaCapacidadMedidas_tablaLineasId_fkey" FOREIGN KEY ("tablaLineasId") REFERENCES "tablaCapacidadLineas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaCapacidadProg" ADD CONSTRAINT "tablaCapacidadProg_tablaLineasId_fkey" FOREIGN KEY ("tablaLineasId") REFERENCES "tablaCapacidadLineas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablaCapacidadEjec" ADD CONSTRAINT "tablaCapacidadEjec_tablaLineasId_fkey" FOREIGN KEY ("tablaLineasId") REFERENCES "tablaCapacidadLineas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
