import { PrismaClient } from "@prisma/client";
import { EmpPrPy, EmpPrPyEj } from "./scripts/transfrom-xlsx-v2.js";
import {EmpEjec2023} from "./scripts/2023-Datos Planos/transform-xlsx-planos-2023.js";
import * as fs from 'fs';



// fs.writeFile('EmpPrPy.json', JSON.stringify(EmpPrPy, null, 2), (err) => {
//     if (err) {
//       console.error('Error al escribir el archivo:', err);
//     } else {
//       console.log('Archivo guardado con éxito.');
//     }
//   });
const prisma = new PrismaClient();
main2();
// deletePrisma();
// findManyPrimsa()

const empresasEje2023 = await prisma.Empresa.findMany({
  select: {
    nombre:true,
    tablaEje2023: {
    select:{  
      // registro:true,
      ene:true,
      feb:true,
      mar:true,
      abr: true,
      may: true,
      jun: true,
      jul: true,
      ago: true,
      sep: true,
      oct: true,
      nov: true,
      dic: true,
    }
  }
  },
});

// console.log(empresasEje2023);



async function deletePrisma() {
//   const deletePrPy = await prisma.tablaEmpPrPy.deleteMany();
//   console.log(`${deletePrPy.count} registros eliminados.`);
//   const deleteAllPro = await prisma.tablaProgramado.deleteMany();
//   console.log(`${deleteAllPro.count} registros eliminados.`);
//   const deleteAllPry = await prisma.tablaProyectado.deleteMany();
//   console.log(`${deleteAllPry.count} registros eliminados.`);
//   const deleteAllEje = await prisma.tablaEjecutado.deleteMany();
//   console.log(`${deleteAllEje.count} registros eliminados.`);
//   const deleteAllEmp = await prisma.empresa.deleteMany();
//   console.log(`${deleteAllEmp.count} registros eliminados.`);
    const deleteEje2023 = await prisma.tablaVentasEjecutado2023.deleteMany();
    console.log(deleteEje2023);
}

async function findManyPrimsa() {
 
//   const allEmpresa = await prisma.empresa.findMany();
//   const allProm = await prisma.tablaProgramado.findMany();
//   const allProy = await prisma.tablaProyectado.findMany();
//   const allEje = await prisma.tablaEjecutado.findMany(); 
  const allEje2023 = await prisma.tablaVentasEjecutado2023.findMany();
 
  console.log(
    
    allEje2023
  );
}


async function main2(){

  for (const Emp of EmpEjec2023) {
      // Buscar la empresa correspondiente
    const empresa = await prisma.Empresa.findFirst({
      where: { nombre: Emp.empresa },
    });
    // // Si la empresa existe, crear el registro EmpPrPy
    if (empresa) {
    //   console.log(empresa);
      const empEje = await prisma.tablaVentasEjecutado2023.create({
        data: {
          empId: empresa.id,
    //       // registro: Object.keys(Emp)[1],
          ene: Emp[Object.keys(Emp)[1]][0],
          feb: Emp[Object.keys(Emp)[1]][1],
          mar: Emp[Object.keys(Emp)[1]][2],
          abr: Emp[Object.keys(Emp)[1]][3],
          may: Emp[Object.keys(Emp)[1]][4],
          jun: Emp[Object.keys(Emp)[1]][5],
          jul: Emp[Object.keys(Emp)[1]][6],
          ago: Emp[Object.keys(Emp)[1]][7],
          sep: Emp[Object.keys(Emp)[1]][8],
          oct: Emp[Object.keys(Emp)[1]][9],
          nov: Emp[Object.keys(Emp)[1]][10],
          dic: Emp[Object.keys(Emp)[1]][11],

        },
      });
  
    //   // console.log(empresa);
    } else {
      console.log(`Empresa ${EmpPrPy.empresa} no encontrada.`);
    }
    // console.log(Emp);
  }
}



