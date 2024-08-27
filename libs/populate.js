import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const keys = {
  "EBA":1,
  "YACANA":2,
  "QUIPUS":3,
  "EASBA":4,
  "SENATEX":5,
  "EMAPA":6,
  "ECEBOL":7,
  "PAPELBOL":8,
  "CARTONBOL":9,
  "ENVIBOL": 10,
  "EEPS":11,
  "EEPAF":12,
  "INBOL":13
}
export async function main(EmpPrPyEj){
  const promesas = EmpPrPyEj.map(async element => {
    // console.log(keys[element.empresa],element.empresa);
    // console.log("entro",element.empresa);
      await prisma.Empresa.create({
        data: {
          nombre: element.empresa,
          idOrden : keys[element.empresa],
          programado:{
            create:{
              // empNombre: element.empresa, prisma create nested object
              ene: element[Object.keys(element)[1]][0] / 1000000,
              feb: element[Object.keys(element)[1]][1] / 1000000,
              mar: element[Object.keys(element)[1]][2] / 1000000,
              abr: element[Object.keys(element)[1]][3] / 1000000,
              may: element[Object.keys(element)[1]][4] / 1000000,
              jun: element[Object.keys(element)[1]][5] / 1000000,
              jul: element[Object.keys(element)[1]][6] / 1000000,
              ago: element[Object.keys(element)[1]][7] / 1000000,
              sep: element[Object.keys(element)[1]][8] / 1000000,
              oct: element[Object.keys(element)[1]][9] / 1000000,
              nov: element[Object.keys(element)[1]][10] / 1000000,
              dic: element[Object.keys(element)[1]][11] / 1000000,
              // total: element[Object.keys(element)[1]][12] / 1000000
            }
          },
          proyectado:{
            create:{
              // empNombre: element.empresa,
              ene: element[Object.keys(element)[2]][0] / 1000000,
              feb: element[Object.keys(element)[2]][1] / 1000000,
              mar: element[Object.keys(element)[2]][2] / 1000000,
              abr: element[Object.keys(element)[2]][3] / 1000000,
              may: element[Object.keys(element)[2]][4] / 1000000,
              jun: element[Object.keys(element)[2]][5] / 1000000,
              jul: element[Object.keys(element)[2]][6] / 1000000,
              ago: element[Object.keys(element)[2]][7] / 1000000,
              sep: element[Object.keys(element)[2]][8] / 1000000,
              oct: element[Object.keys(element)[2]][9] / 1000000,
              nov: element[Object.keys(element)[2]][10] / 1000000,
              dic: element[Object.keys(element)[2]][11] / 1000000,
              // total: element[Object.keys(element)[2]][12] / 1000000
            }
          },
          ejecutado:{
            create:{
              // empNombre: element.empresa,
              ene: element[Object.keys(element)[3]][0] / 1000000,
              feb: element[Object.keys(element)[3]][1] / 1000000,
              mar: element[Object.keys(element)[3]][2] / 1000000,
              abr: element[Object.keys(element)[3]][3] / 1000000,
              may: element[Object.keys(element)[3]][4] / 1000000,
              jun: element[Object.keys(element)[3]][5] / 1000000,
              jul: element[Object.keys(element)[3]][6] / 1000000,
              ago: element[Object.keys(element)[3]][7] / 1000000,
              sep: element[Object.keys(element)[3]][8] / 1000000,
              oct: element[Object.keys(element)[3]][9] / 1000000,
              nov: element[Object.keys(element)[3]][10] / 1000000,
              dic: element[Object.keys(element)[3]][11] / 1000000,
              // total: element[Object.keys(element)[3]][12] / 1000000
            }
          },
        }
      })
  });
  await Promise.all(promesas);
}

export async function main2(EmpPrPy) {
  const createEmpPrPy = async (Emp, empresa) => {
    const registro = Object.keys(Emp)[1];
    const data = {
      empId: empresa.id,
      registro: registro,
      ene: Emp[registro][0] / 1000000,
      feb: Emp[registro][1] / 1000000,
      mar: Emp[registro][2] / 1000000,
      abr: Emp[registro][3] / 1000000,
      may: Emp[registro][4] / 1000000,
      jun: Emp[registro][5] / 1000000,
      jul: Emp[registro][6] / 1000000,
      ago: Emp[registro][7] / 1000000,
      sep: Emp[registro][8] / 1000000,
      oct: Emp[registro][9] / 1000000,
      nov: Emp[registro][10] / 1000000,
      dic: Emp[registro][11] / 1000000,
    };

    return prisma.tablaVentasPrVsPy.create({ data });
  };

  try {
    await Promise.all(EmpPrPy.map(async (Emp) => {
      const empresa = await prisma.Empresa.findFirst({
        where: { nombre: Emp.empresa },
      });

      if (empresa) {
        console.log(empresa);
        await createEmpPrPy(Emp, empresa);
      }
    }));
    console.log('Todos los registros se han creado correctamente.');
  } catch (error) {
    console.error('Error al crear registros:', error);
  }
}

export async function mainIngreYEgre(resultIngEgre) {
  const promises = resultIngEgre.map(async (element) => {
    
    // Buscar la empresa correspondiente
    const empresa = await prisma.Empresa.findFirst({
      where: { nombre: element.empresa },
    });
    //   console.log(empresa);
  
    // // Si la empresa existe, crear el registro EmpPrPy
    if (empresa) {
      // console.log(empresa);
      return prisma.tablaIngresosEgresos.create({
        data: {
          // empId: empresa.id,
          empId: empresa.id,
          ingresos: {
            create: {
              // empId: empresa.id,
              ingProg: {
                create: {
                  empresa: empresa.nombre,
                  ene: element.ingreso[0].pr[0],
                  feb: element.ingreso[0].pr[1],
                  mar: element.ingreso[0].pr[2],
                  abr: element.ingreso[0].pr[3],
                  may: element.ingreso[0].pr[4],
                  jun: element.ingreso[0].pr[5],
                  jul: element.ingreso[0].pr[6],
                  ago: element.ingreso[0].pr[7],
                  sep: element.ingreso[0].pr[8],
                  oct: element.ingreso[0].pr[9],
                  nov: element.ingreso[0].pr[10],
                  dic: element.ingreso[0].pr[11]
                }
              },
              ingProy: {
                create: {
                  empresa: empresa.nombre,
                  ene: element.ingreso[1].py[0],
                  feb: element.ingreso[1].py[1],
                  mar: element.ingreso[1].py[2],
                  abr: element.ingreso[1].py[3],
                  may: element.ingreso[1].py[4],
                  jun: element.ingreso[1].py[5],
                  jul: element.ingreso[1].py[6],
                  ago: element.ingreso[1].py[7],
                  sep: element.ingreso[1].py[8],
                  oct: element.ingreso[1].py[9],
                  nov: element.ingreso[1].py[10],
                  dic: element.ingreso[1].py[11]
                }
              },
              ingEj: {
                create: {
                  empresa: empresa.nombre,
                  ene: element.ingreso[2].ej[0],
                  feb: element.ingreso[2].ej[1],
                  mar: element.ingreso[2].ej[2],
                  abr: element.ingreso[2].ej[3],
                  may: element.ingreso[2].ej[4],
                  jun: element.ingreso[2].ej[5],
                  jul: element.ingreso[2].ej[6],
                  ago: element.ingreso[2].ej[7],
                  sep: element.ingreso[2].ej[8],
                  oct: element.ingreso[2].ej[9],
                  nov: element.ingreso[2].ej[10],
                  dic: element.ingreso[2].ej[11]
                }
              },
              ingEj2023: {
                create: {
                  empresa: empresa.nombre,
                  ene: element.ingreso[3].ej2023[0],
                  feb: element.ingreso[3].ej2023[1],
                  mar: element.ingreso[3].ej2023[2],
                  abr: element.ingreso[3].ej2023[3],
                  may: element.ingreso[3].ej2023[4],
                  jun: element.ingreso[3].ej2023[5],
                  jul: element.ingreso[3].ej2023[6],
                  ago: element.ingreso[3].ej2023[7],
                  sep: element.ingreso[3].ej2023[8],
                  oct: element.ingreso[3].ej2023[9],
                  nov: element.ingreso[3].ej2023[10],
                  dic: element.ingreso[3].ej2023[11]
                }
              }
            }
          },
          egresos: {
            create: {
              // empId: empresa.id,
              tablaEgrProg: {
                create: {
                  empresa: empresa.nombre,
                  ene: element.egreso[0].pr[0],
                  feb: element.egreso[0].pr[1],
                  mar: element.egreso[0].pr[2],
                  abr: element.egreso[0].pr[3],
                  may: element.egreso[0].pr[4],
                  jun: element.egreso[0].pr[5],
                  jul: element.egreso[0].pr[6],
                  ago: element.egreso[0].pr[7],
                  sep: element.egreso[0].pr[8],
                  oct: element.egreso[0].pr[9],
                  nov: element.egreso[0].pr[10],
                  dic: element.egreso[0].pr[11]
                }
              },
              tablaEgrProy: {
                create: {
                  empresa: empresa.nombre,
                  ene: element.egreso[1].py[0],
                  feb: element.egreso[1].py[1],
                  mar: element.egreso[1].py[2],
                  abr: element.egreso[1].py[3],
                  may: element.egreso[1].py[4],
                  jun: element.egreso[1].py[5],
                  jul: element.egreso[1].py[6],
                  ago: element.egreso[1].py[7],
                  sep: element.egreso[1].py[8],
                  oct: element.egreso[1].py[9],
                  nov: element.egreso[1].py[10],
                  dic: element.egreso[1].py[11]
                }
              },
              tablaEgrEj: {
                create: {
                  empresa: empresa.nombre,
                  ene: element.egreso[2].ej[0],
                  feb: element.egreso[2].ej[1],
                  mar: element.egreso[2].ej[2],
                  abr: element.egreso[2].ej[3],
                  may: element.egreso[2].ej[4],
                  jun: element.egreso[2].ej[5],
                  jul: element.egreso[2].ej[6],
                  ago: element.egreso[2].ej[7],
                  sep: element.egreso[2].ej[8],
                  oct: element.egreso[2].ej[9],
                  nov: element.egreso[2].ej[10],
                  dic: element.egreso[2].ej[11]
                }
              },
              tablaEgrEj2023: {
                create: {
                  empresa: empresa.nombre,
                  ene: element.egreso[3].ej2023[0],
                  feb: element.egreso[3].ej2023[1],
                  mar: element.egreso[3].ej2023[2],
                  abr: element.egreso[3].ej2023[3],
                  may: element.egreso[3].ej2023[4],
                  jun: element.egreso[3].ej2023[5],
                  jul: element.egreso[3].ej2023[6],
                  ago: element.egreso[3].ej2023[7],
                  sep: element.egreso[3].ej2023[8],
                  oct: element.egreso[3].ej2023[9],
                  nov: element.egreso[3].ej2023[10],
                  dic: element.egreso[3].ej2023[11]
                }
              }
            }
          }
        }
      });
    }
  });

  await Promise.all(promises);
  console.log("Todos los registros se crearon correctamente"); 
}
export async function mainIngreYEgre2() {
  const resultIngEgre = await prisma.Empresa.findMany({})
  // console.log(resultIngEgre);
  let ObjectIngresos = []
  let ObjectEgresos = []
  for (const Emp of resultIngEgre) {
    let newRegistro = null;
    let resultado = null;
    // console.log(Emp,"hello");
    // Buscar la empresa correspondiente
    const tablaIngProg = await prisma.tablaIngresosProg.findFirst({
      where:{
        empId: Emp.id
      }
    });
    // console.log(tablaIngProg);
    const tablaIngProy = await prisma.tablaIngresosProy.findFirst({
      where:{
        empId: Emp.id
      }
    })
    
    // console.log(tablaIngProg);
    if(tablaIngProy['ene']==0){
      // console.log("entro en pr: "+ tablaIngProg);
      newRegistro = 'pr'
      resultado = tablaIngProg;
    } 
    if((tablaIngProg['ene']!=tablaIngProy['ene'] && tablaIngProy['ene']!=0)||(tablaIngProg['ene']==tablaIngProy['ene'])){
      // console.log("entro en py: "+ tablaIngProy);
      // console.log(Emp.nombre, Emp.id);
      // console.log(tablaIngProg[0]['ene'], tablaIngProy[0]['ene']);
      newRegistro = 'py'
      resultado = tablaIngProy;
    }
    // console.log(resultado);
    ObjectIngresos.push({
        empId: Emp.id,
        empresa: Emp.nombre,
        registro: newRegistro,
        ene: resultado['ene'],
        feb: resultado['feb'],
        mar: resultado['mar'],
        abr: resultado['abr'],
        may: resultado['may'],
        jun: resultado['jun'],
        jul: resultado['jul'],
        ago: resultado['ago'],
        sep: resultado['sep'],
        oct: resultado['oct'],
        nov: resultado['nov'],
        dic: resultado['dic']
  })
    // Buscar la empresa correspondiente
    const tablaEgrProg = await prisma.tablaEgresosProg.findFirst({
      where: {
        empId: Emp.id
      }
    });
    const tablaEgrProy = await prisma.tablaEgresosProy.findFirst({
      where: {
        empId: Emp.id
      }
    });
     newRegistro = null;
     resultado = null;

    if (tablaEgrProy['ene'] == 0) {
      newRegistro = 'pr';
      resultado = tablaEgrProg;
    } 
    if ((tablaEgrProg['ene'] != tablaEgrProy['ene'] && tablaEgrProy['ene'] != 0) || (tablaEgrProg['ene'] == tablaEgrProy['ene'])) {
      newRegistro = 'py';
      resultado = tablaEgrProy;
    }

    ObjectEgresos.push({
        empId: Emp.id,
        empresa: Emp.nombre,
        registro: newRegistro,
        ene: resultado['ene'],
        feb: resultado['feb'],
        mar: resultado['mar'],
        abr: resultado['abr'],
        may: resultado['may'],
        jun: resultado['jun'],
        jul: resultado['jul'],
        ago: resultado['ago'],
        sep: resultado['sep'],
        oct: resultado['oct'],
        nov: resultado['nov'],
        dic: resultado['dic']
    })
  }
  // console.log(ObjectIngresos);
  // console.log(ObjectEgresos);
  await prisma.tablaIngresosPrVsPy.createMany({
    data: ObjectIngresos
  })
  await prisma.tablaEgresosPrVsPy.createMany({
    data: ObjectEgresos
  })
}

export async  function mainProduccion(myNewObject) {
  const empresaMap = new Map();

  // Pre-cargar todas las empresas para reducir las consultas a la base de datos
  const empresas = await prisma.Empresa.findMany();
  empresas.forEach(empresa => empresaMap.set(empresa.nombre, empresa.id));
  // console.log(empresas);
  await Promise.all(myNewObject.map(async (element) => {
    const empId = empresaMap.get(element.empresa);
    // console.log(element.empresa);
    if (empId) {
      // Crear un registro en tablaProduccion vinculado a la empresa
      const produccion = await prisma.TablaProduccion.create({
        data: {
          empresaId: empId  // Cambiado a empresaId para seguir el modelo corregido
        }
      });

      // Preparar los datos para tablaProgProduc
      const progOperations = element.productos.map((producto, i) => {
        return {
          produccionId: produccion.empresaId,  // Cambiado a produccionId
          empresa: element.empresa,
          producto,
          medida: element.medidas[i],
          ...element.prs[i].reduce((acc, curr, index) => {
            const mes = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][index];
            acc[mes] = curr;
            return acc;
          }, {})
        };
      });

      // Preparar los datos para tablaProyProduc
      const proyOperations = element.productos.map((producto, i) => {
          return {
            produccionId: produccion.empresaId,  // Cambiado a produccionId
            empresa: element.empresa,
            producto,
            medida: element.medidas[i],
            ...element.pys[i].reduce((acc, curr, index) => {
              const mes = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][index];
              acc[mes] = curr;
              return acc;
            }, {})
          };
      });

      // Preparar los datos para tablaEjeProduc
      const ejeOperations = element.productos.map((producto, i) => {
        const mesesConValoresPorDefecto = {
          ene: 0.00, feb: 0.00, mar: 0.00, abr: 0.00, may: 0.00, jun: 0.00,
          jul: 0.00, ago: 0.00, sep: 0.00, oct: 0.00, nov: 0.00, dic: 0.00
        };

        const datosMeses = element.ejs[i].reduce((acc, curr, index) => {
          const mes = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][index];
          acc[mes] = curr;
          return acc;
        }, mesesConValoresPorDefecto);

        return {
          produccionId: produccion.empresaId,  // Cambiado a produccionId
          empresa: element.empresa,
          producto,
          medida: element.medidas[i],
          ...datosMeses
        };
      });

      // // Preparar los datos para tablaEje2023Produc
      const eje2023Operations = element.productos.map((producto, i) => {
        const mesesConValoresPorDefecto = {
          ene: 0.00, feb: 0.00, mar: 0.00, abr: 0.00, may: 0.00, jun: 0.00,
          jul: 0.00, ago: 0.00, sep: 0.00, oct: 0.00, nov: 0.00, dic: 0.00
        };

        const datosMeses = element.ej2023s[i].reduce((acc, curr, index) => {
          const mes = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][index];
          acc[mes] = curr;
          return acc;
        }, mesesConValoresPorDefecto);

        return {
          produccionId: produccion.empresaId,  // Cambiado a produccionId
          empresa: element.empresa,
          producto,
          medida: element.medidas[i],
          ...datosMeses
        };
      });
      // Crear registros en lote para mejorar la eficiencia
      await prisma.TablaProduccionProg.createMany({
          data: progOperations
        });
        
      // console.log(proyOperations);
      await prisma.tablaProduccionProy.createMany({
        data: proyOperations
      });

      await prisma.TablaProduccionEjec.createMany({
        data: ejeOperations
      });

      await prisma.TablaProduccionEjec2023.createMany({
        data: eje2023Operations
      });

      // console.log(proyOperations);
    }
  }));
}
export async function mainProduccion2() {
  const empresaMap = new Map();

  // Pre-cargar todas las empresas para reducir las consultas a la base de datos
  const empresas = await prisma.Empresa.findMany();
  empresas.forEach(empresa => empresaMap.set(empresa.nombre, empresa.id));
  let ObjectProduccion = []
  // console.log(empresas);
  await Promise.all(empresas.map(async (element) => {
    const empId = empresaMap.get(element.nombre);
    // console.log(element);
    if (empId) {
      //Obtener los registros programados
      const produccionProg = await prisma.tablaProduccionProg.findMany({
        where: {
          produccionId: empId
        }
      });
      //Obtener los registros proyectados
      const produccionProy = await prisma.tablaProduccionProy.findMany({
        where: {
          produccionId: empId
        }
      });
      produccionProg.map(async (_,index) => {
        let newRegistro = null
        let resultado = null
        if(produccionProg[index].producto == produccionProy[index].producto){
          if(produccionProy[index]['ene'] == 0){
            newRegistro = 'pr'
            resultado = produccionProg[index]
          }
          if((produccionProg[index]['ene']!=produccionProy[index]['ene'] && produccionProy[index]['ene']!=0)||(produccionProg[index]['ene']==produccionProy[index]['ene'])){
            newRegistro = 'py'
            resultado = produccionProy[index]

          }
          // console.log(element);
          ObjectProduccion.push({
            produccionId: empId,
            empresa: element.nombre,
            registro: newRegistro,
            producto: resultado.producto,
            medida: resultado.medida,
            ene: resultado.ene,
            feb: resultado.feb,
            mar: resultado.mar,
            abr: resultado.abr,
            may: resultado.may,
            jun: resultado.jun,
            jul: resultado.jul,
            ago: resultado.ago,
            sep: resultado.sep,
            oct: resultado.oct,
            nov: resultado.nov,
            dic: resultado.dic
          });
        }
      });
    }
  }));
  // console.log(ObjectProduccion);
  await prisma.tablaProduccionPrVsPy.createMany({
    data: ObjectProduccion
  })
  // console.log("datos guardados correctamente");
}

export async function mainSaldos(saldos) {
  const createMonthlyData = (data) => ({
    ene: data[0],
    feb: data[1],
    mar: data[2],
    abr: data[3],
    may: data[4],
    jun: data[5],
    jul: data[6],
    ago: data[7],
    sep: data[8],
    oct: data[9],
    nov: data[10],
    dic: data[11]
  });

  try {
    await Promise.all(saldos.map(async (element) => {
      // Buscar la empresa correspondiente
      const empresa = await prisma.Empresa.findFirst({
        where: { nombre: element.empresa }
      });

      // Si la empresa existe, crear el registro EmpPrPy
      if (empresa) {
        await prisma.tablaSaldos.create({
          data: {
            empId: empresa.id,
            disponible: {
              create: createMonthlyData(element.dis)
            },
            inventarios: {
              create: createMonthlyData(element.inv)
            },
            cobrar: {
              create: createMonthlyData(element.cob)
            },
            pagar: {
              create: createMonthlyData(element.pag)
            }
          }
        });
      }
    }));
    console.log('Todos los registros se han creado correctamente.');
  } catch (error) {
    console.error('Error al crear registros:', error);
  }
}

export async function mainCapacidad(objectCapacidad) {
  const empresaMap = new Map();
  // Pre-cargar todas las empresas para reducir las consultas a la base de datos
  const empresas = await prisma.Empresa.findMany();
  empresas.forEach(empresa => empresaMap.set(empresa.nombre, empresa.id));

  const createMonthlyData = (data) => ({
    ene: data[0] || 0.0,
    feb: data[1] || 0.0,
    mar: data[2] || 0.0,
    abr: data[3] || 0.0,
    may: data[4] || 0.0,
    jun: data[5] || 0.0,
    jul: data[6] || 0.0,
    ago: data[7] || 0.0,
    sep: data[8] || 0.0,
    oct: data[9] || 0.0,
    nov: data[10] || 0.0,
    dic: data[11] || 0.0
  });

  try {
    for (const element of objectCapacidad) {
      const empId = empresaMap.get(element.empresa);
      if (empId) {
        const produccion = await prisma.tablaCapacidad.create({
          data: {
            empId: empId
          }
        });

        await Promise.all(element.lineas.map(async (linea, index) => {
          const lineaCapacidad = await prisma.tablaCapacidadLineas.create({
            data: {
              tablaCapacidadId: produccion.id,
              linea: linea
            }
          });

          await prisma.tablaCapacidadCantidades.create({
            data: {
              tablaLineasId: lineaCapacidad.id,
              cantidad: element.cantidades[index]
            }
          });

          await prisma.tablaCapacidadMedidas.create({
            data: {
              tablaLineasId: lineaCapacidad.id,
              medida: element.medidas[index]
            }
          });

          await prisma.tablaCapacidadProg.create({
            data: {
              tablaLineasId: lineaCapacidad.id,
              ...createMonthlyData(element.prs[index])
            }
          });

          await prisma.tablaCapacidadEjec.create({
            data: {
              tablaLineasId: lineaCapacidad.id,
              ...createMonthlyData(element.ejs[index])
            }
          });
        }));
      }
    }
    console.log('Todos los registros se han creado correctamente.');
  } catch (error) {
    console.error('Error al crear registros:', error);
  }
}

// VERSION ANTIGUA SECCION VENTAS MAIN2
/*
export async function main2(EmpPrPy){
    for (const Emp of EmpPrPy) {
    // Buscar la empresa correspondiente
    // console.log(Emp);
    const empresa = await prisma.Empresa.findFirst({
      where: { nombre: Emp.empresa },
    });
    // Si la empresa existe, crear el registro EmpPrPy
    if (empresa) {
     console.log(empresa);
      const empPrPy = await prisma.tablaVentasPrVsPy.create({
        data: {
          empId: empresa.id,
          registro: Object.keys(Emp)[1],
          ene: Emp[Object.keys(Emp)[1]][0] / 1000000,
          feb: Emp[Object.keys(Emp)[1]][1] / 1000000,
          mar: Emp[Object.keys(Emp)[1]][2] / 1000000,
          abr: Emp[Object.keys(Emp)[1]][3] / 1000000,
          may: Emp[Object.keys(Emp)[1]][4] / 1000000,
          jun: Emp[Object.keys(Emp)[1]][5] / 1000000,
          jul: Emp[Object.keys(Emp)[1]][6] / 1000000,
          ago: Emp[Object.keys(Emp)[1]][7] / 1000000,
          sep: Emp[Object.keys(Emp)[1]][8] / 1000000,
          oct: Emp[Object.keys(Emp)[1]][9] / 1000000,
          nov: Emp[Object.keys(Emp)[1]][10] / 1000000,
          dic: Emp[Object.keys(Emp)[1]][11] / 1000000,

        },
      });
    } 
  }
}

VERSION ANTIGUA SALDOS

export async function mainSaldos(saldos) {
  saldos.forEach(async element => {
    // Buscar la empresa correspondiente
    const empresa = await prisma.Empresa.findFirst({
      where: { nombre: element.empresa }
    });
    //   console.log(empresa);

    // // Si la empresa existe, crear el registro EmpPrPy
    if (empresa) {
      const nuevosSaldos = await prisma.tablaSaldos.create({
        data: {
          // empId: empresa.id,
          empId: empresa.id,
          disponible: {
            // empId: empresa.id,
            create: {
              ene: element.dis[0],
              feb: element.dis[1],
              mar: element.dis[2],
              abr: element.dis[3],
              may: element.dis[4],
              jun: element.dis[5],
              jul: element.dis[6],
              ago: element.dis[7],
              sep: element.dis[8],
              oct: element.dis[9],
              nov: element.dis[10],
              dic: element.dis[11]
            }
          },
          inventarios: {
            create: {
              ene: element.inv[0],
              feb: element.inv[1],
              mar: element.inv[2],
              abr: element.inv[3],
              may: element.inv[4],
              jun: element.inv[5],
              jul: element.inv[6],
              ago: element.inv[7],
              sep: element.inv[8],
              oct: element.inv[9],
              nov: element.inv[10],
              dic: element.inv[11]
            }
          },
          cobrar: {
            create: {
              ene: element.cob[0],
              feb: element.cob[1],
              mar: element.cob[2],
              abr: element.cob[3],
              may: element.cob[4],
              jun: element.cob[5],
              jul: element.cob[6],
              ago: element.cob[7],
              sep: element.cob[8],
              oct: element.cob[9],
              nov: element.cob[10],
              dic: element.cob[11]
            }
          },
          pagar: {
            create: {
              ene: element.pag[0],
              feb: element.pag[1],
              mar: element.pag[2],
              abr: element.pag[3],
              may: element.pag[4],
              jun: element.pag[5],
              jul: element.pag[6],
              ago: element.pag[7],
              sep: element.pag[8],
              oct: element.pag[9],
              nov: element.pag[10],
              dic: element.pag[11]
            }
          }
        }
      });
    }
  });
}


VERSION ANTIGUA CAPACIDAD


export async function mainCapacidad(objectCapacidad) {
  const empresaMap = new Map();
  // Pre-cargar todas las empresas para reducir las consultas a la base de datos
  const empresas = await prisma.Empresa.findMany();
  empresas.forEach(empresa => empresaMap.set(empresa.nombre, empresa.id));

  for (const element of objectCapacidad) {
    const empId = empresaMap.get(element.empresa);
    if (empId) {
      const produccion = await prisma.tablaCapacidad.create({
        data: {
          empId: empId
        }
      });

      for (const [index, _] of element.lineas.entries()) {
        const lineaCapacidad = await prisma.tablaCapacidadLineas.create({
          data: {
            tablaCapacidadId: produccion.id,
            linea: element.lineas[index]
          }
        });

        await prisma.tablaCapacidadCantidades.create({
          data: {
            tablaLineasId: lineaCapacidad.id,
            cantidad: element.cantidades[index]
          }
        });

        await prisma.tablaCapacidadMedidas.create({
          data: {
            tablaLineasId: lineaCapacidad.id,
            medida: element.medidas[index]
          }
        });

        await prisma.tablaCapacidadProg.create({
          data: {
            tablaLineasId: lineaCapacidad.id,
            ene: element.prs[index][0] || 0.0,
            feb: element.prs[index][1] || 0.0,
            mar: element.prs[index][2] || 0.0,
            abr: element.prs[index][3] || 0.0,
            may: element.prs[index][4] || 0.0,
            jun: element.prs[index][5] || 0.0,
            jul: element.prs[index][6] || 0.0,
            ago: element.prs[index][7] || 0.0,
            sep: element.prs[index][8] || 0.0,
            oct: element.prs[index][9] || 0.0,
            nov: element.prs[index][10] || 0.0,
            dic: element.prs[index][11] || 0.0
          }
        });

        await prisma.tablaCapacidadEjec.create({
          data: {
            tablaLineasId: lineaCapacidad.id,
            ene: element.ejs[index][0] || 0.0,
            feb: element.ejs[index][1] || 0.0,
            mar: element.ejs[index][2] || 0.0,
            abr: element.ejs[index][3] || 0.0,
            may: element.ejs[index][4] || 0.0,
            jun: element.ejs[index][5] || 0.0,
            jul: element.ejs[index][6] || 0.0,
            ago: element.ejs[index][7] || 0.0,
            sep: element.ejs[index][8] || 0.0,
            oct: element.ejs[index][9] || 0.0,
            nov: element.ejs[index][10] || 0.0,
            dic: element.ejs[index][11] || 0.0
          }
        });
      }
    }
  }
}

*/ 