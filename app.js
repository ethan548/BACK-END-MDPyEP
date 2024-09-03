import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname,resolve } from 'path';
import path from 'path';
import XLSX from 'xlsx';
import fs from 'fs';
import { transform } from './scripts/objectsTransformVentas.js'; 
import { transformIngreyEgre } from './scripts/IngresosYEgresos2024/main.js';
import { transformProduccion } from './scripts/Produccion/main.js';
import { transformSaldos } from './scripts/SaldosEnLibreta/main.js';
import { transformCapacidad } from './scripts/mainCapacidad.js';
import {main,main2,mainIngreYEgre,mainIngreYEgre2,mainProduccion,mainProduccion2,mainSaldos, mainCapacidad} from './libs/populate.js'
import { PrismaClient } from "@prisma/client";
import cors from 'cors';
const app = express();
const prisma = new PrismaClient();

// Configuración de Multer para guardar los archivos con nombres personalizados
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const uploadsDir = resolve(__dirname,'uploads');;
    if(!fs.existsSync(uploadsDir)){
      fs.mkdirSync(uploadsDir, { recursive: true });
    }  
    console.log(uploadsDir);
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const renameFile = (prefix) => {
      const fileExtension = path.extname(file.originalname);
      const newFileName = `${prefix}${fileExtension}`;
      console.log(`Renombrando archivo a: ${newFileName}`);
      cb(null, newFileName);
    };

    const regex = /\b(FORMULARIO|SECCIONES)\b/;
    const regex2 = /\b(INGRESOS|GASTOS)\b/;
    const regex3 = /\b(PRODUCCION)\b/;
    const regex4 = /\b(SALDOS)\b/;

    if (regex.test(file.originalname)) {
      renameFile('FORM_VENTAS');
    } else if (regex2.test(file.originalname)) {
      renameFile('FORM_INGRESOS');
    } else if (regex3.test(file.originalname)) {
      renameFile('FORM_PRODUCCION');
    } else if (regex4.test(file.originalname)) {
      renameFile('FORM_SALDOS');
    } else {
      cb(null, file.originalname);
    }
  }
});

const upload = multer({ storage });

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}))

app.use(express.json());

app.delete('/upload/deletedAll', async (req,res)=>{
  try {
    await prisma.tablaVentasProgramado.deleteMany({});
    await prisma.tablaVentasProyectado.deleteMany({});
    await prisma.tablaVentasEjecutado.deleteMany({});
    await prisma.tablaVentasPrVsPy.deleteMany({});
    await prisma.tablaVentasEjecutado2023.deleteMany({});
   
    await prisma.tablaIngresosProg.deleteMany({});
    await prisma.tablaIngresosProy.deleteMany({});
    await prisma.tablaIngresosEje.deleteMany({});
    await prisma.tablaIngresosEje2023.deleteMany({});

    await prisma.tablaEgresosProg.deleteMany({})
    await prisma.tablaEgresosProy.deleteMany({})
    await prisma.tablaEgresosEj.deleteMany({})
    await prisma.tablaEgresosEj2023.deleteMany({})

    await prisma.tablaIngresosPrVsPy.deleteMany({});
    await prisma.tablaEgresosPrVsPy.deleteMany({});
    await prisma.tablaIngresos.deleteMany({});
    await prisma.tablaEgresos.deleteMany({});
    const deletedtablaIngresosEgresos  = await prisma.tablaIngresosEgresos.deleteMany({});
    console.log(`${deletedtablaIngresosEgresos.count} registros eliminados de Ingresos y Egresos.`);
    
    await prisma.TablaProduccionProg.deleteMany({});
    await prisma.TablaProduccionProy.deleteMany({});
    await prisma.TablaProduccionEjec.deleteMany({});
    await prisma.TablaProduccionEjec2023.deleteMany({});
    await prisma.TablaProduccionPrVsPy.deleteMany({});
    const allDeletedProduc = await prisma.TablaProduccion.deleteMany({});
    console.log(`${allDeletedProduc.count} registros eliminados de Produccion.`);
   
    await prisma.tablaSaldosDisponible.deleteMany({});
    await prisma.tablaSaldosInventarios.deleteMany({});  
    await prisma.tablaSaldosCobrar.deleteMany({});
    await prisma.tablaSaldosPagar.deleteMany({});
    const allDeletedSaldos = await prisma.tablaSaldos.deleteMany({});
    console.log(`${allDeletedSaldos.count} registros eliminados de Saldos.`);
    
    await prisma.tablaCapacidadEjec.deleteMany({});
    await prisma.tablaCapacidadProg.deleteMany({});
    await prisma.tablaCapacidadMedidas.deleteMany({});
    await prisma.tablaCapacidadCantidades.deleteMany({});
    await prisma.tablaCapacidadLineas.deleteMany({});
    const allDeleted =  await prisma.tablaCapacidad.deleteMany({});
    console.log(`${allDeleted.count} registros eliminados de capacidad.`);

    const deleted = await prisma.Empresa.deleteMany({})
    console.log(`${deleted.count} registros eliminados de Empresas.`);
    res.send("Todos los registros eliminados")
  } catch (error) {
    console.error(`Error al eliminar registros`, error)
    res.status(500).send("Error con el servidor....")
  }
})

//**************************************** VENTAS *********************************************/

app.post('/upload/ventas', upload.single('file'), async (req, res) => {
  try {
    // console.log(req.file);
    const file = req.file;
    const filePath = file.path;
    const { EmpPrPy,EmpPrPyEj } = transform(filePath);
    await main(EmpPrPyEj)
    await main2(EmpPrPy)
      // main2(EmpPrPy)]);
    // console.log(EmpPrPyEj);
    res.status(200).send('Archivo Ventas subido correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar el archivo Ventas');
  }
});

app.get('/upload/ventas', async (req,res)=>{
  try {
    const ventas = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        empPrPy:{
          select:{
            registro:true,
            ene:true,
            feb:true,
            mar:true,
            abr:true,
            may:true,
            jun:true,
            jul:true,
            ago:true,
            sep:true,
            oct:true,
            nov:true,
            dic:true,
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    });
    const newVentas = ventas.map((venta) => ({
      idOrden: venta.idOrden,
      nombre: venta.nombre,
      ...venta.empPrPy
    }));
    const proy = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        proyectado:{
          select:{
            ene:true,
            feb:true,
            mar:true,
            abr:true,
            may:true,
            jun:true,
            jul:true,
            ago:true,
            sep:true,
            oct:true,
            nov:true,
            dic:true,
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    });
    const newProy = proy.map((venta) => ({
      idOrden: venta.idOrden,
      nombre: venta.nombre,
      ...venta.proyectado
    }));
    const prog = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        programado:{
          select:{
            ene:true,
            feb:true,
            mar:true,
            abr:true,
            may:true,
            jun:true,
            jul:true,
            ago:true,
            sep:true,
            oct:true,
            nov:true,
            dic:true,
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    });
    const newProg = prog.map((venta) => ({
      idOrden: venta.idOrden,
      nombre: venta.nombre,
      ...venta.programado
    }));
    const ejec = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        ejecutado:{
          select:{
            ene:true,
            feb:true,
            mar:true,
            abr:true,
            may:true,
            jun:true,
            jul:true,
            ago:true,
            sep:true,
            oct:true,
            nov:true,
            dic:true,
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    });
    const newEjec = ejec.map((venta) => ({
      idOrden: venta.idOrden,
      nombre: venta.nombre,
      ...venta.ejecutado
    }));
    
    const workbook = XLSX.utils.book_new();

    const ventasSheet = XLSX.utils.json_to_sheet(newVentas);
    const proySheet = XLSX.utils.json_to_sheet(newProy);
    const progSheet = XLSX.utils.json_to_sheet(newProg);
    const ejecSheet = XLSX.utils.json_to_sheet(newEjec);
    
    XLSX.utils.book_append_sheet(workbook, ventasSheet, 'VentasPrVsPy');
    XLSX.utils.book_append_sheet(workbook, proySheet, 'VentasProy');
    XLSX.utils.book_append_sheet(workbook, progSheet, 'VentasProg');
    XLSX.utils.book_append_sheet(workbook, ejecSheet, 'VentasEjec');

    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = resolve(__dirname,'xlsx/VENTAS.xlsx');
    XLSX.writeFile(workbook, filePath);

    // Enviar el archivo Excel como respuesta
    res.download(filePath, 'ventas.xlsx', (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
        res.status(500).send('Error al enviar el archivo');
      } else {
        // Eliminar el archivo después de enviarlo
        fs.unlinkSync(filePath);
      }
    });
    // res.status(200).send('Excel generado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar el archivo ventas');
  }
})

//**************************************** INGRESOS *********************************************/
app.get('/upload/ingresos', async (req,res)=>{
  try{
    const ingresosPrPy = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaIngEgr:{
          select:{
            ingPrPy:{
              select:{
                registro:true,
                ene:true,
                feb:true,
                mar:true,
                abr:true,
                may:true,
                jun:true,
                jul:true,
                ago:true,
                sep:true,
                oct:true,
                nov:true,
                dic:true,
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    });
    const egrPrPy = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaIngEgr:{
          select:{
            egrPrPy:{
              select:{
                registro:true,
                ene:true,
                feb:true,
                mar:true,
                abr:true,
                may:true,
                jun:true,
                jul:true,
                ago:true,
                sep:true,
                oct:true,
                nov:true,
                dic:true,
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    });
    //**************** INGRESOS *******************/
    const ingresosProg = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaIngEgr:{
          select:{
            ingresos:{
              select:{
                ingProg:{
                  select:{
                    ene:true,
                    feb:true,
                    mar:true,
                    abr:true,
                    may:true,
                    jun:true,
                    jul:true,
                    ago:true,
                    sep:true,
                    oct:true,
                    nov:true,
                    dic:true,
                  }
                }
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    });
    const ingresosProy = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaIngEgr:{
          select:{
            ingresos:{
              select:{
                ingProy:{
                  select:{
                    ene:true,
                    feb:true,
                    mar:true,
                    abr:true,
                    may:true,
                    jun:true,
                    jul:true,
                    ago:true,
                    sep:true,
                    oct:true,
                    nov:true,
                    dic:true,
                  }
                }
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    });
    const ingresosEj = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaIngEgr:{
          select:{
            ingresos:{
              select:{
                ingEj:{
                  select:{
                    ene:true,
                    feb:true,
                    mar:true,
                    abr:true,
                    may:true,
                    jun:true,
                    jul:true,
                    ago:true,
                    sep:true,
                    oct:true,
                    nov:true,
                    dic:true,
                  }
                }
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    });
    const ingresosEj2023 = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaIngEgr:{
          select:{
            ingresos:{
              select:{
                ingEj2023:{
                  select:{
                    ene:true,
                    feb:true,
                    mar:true,
                    abr:true,
                    may:true,
                    jun:true,
                    jul:true,
                    ago:true,
                    sep:true,
                    oct:true,
                    nov:true,
                    dic:true,
                  }
                }
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    });
    //******************EGRESOS ********************/
    const egrProg = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaIngEgr:{
          select:{
            egresos:{
              select:{
                tablaEgrProg:{
                  select:{
                    ene:true,
                    feb:true,
                    mar:true,
                    abr:true,
                    may:true,
                    jun:true,
                    jul:true,
                    ago:true,
                    sep:true,
                    oct:true,
                    nov:true,
                    dic:true,
                  }
                }
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    });
    const egrProy = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaIngEgr:{
          select:{
            egresos:{
              select:{
                tablaEgrProy:{
                  select:{
                    ene:true,
                    feb:true,
                    mar:true,
                    abr:true,
                    may:true,
                    jun:true,
                    jul:true,
                    ago:true,
                    sep:true,
                    oct:true,
                    nov:true,
                    dic:true,
                  }
                }
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    })

    const egrEj = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaIngEgr:{
          select:{
            egresos:{
              select:{
                tablaEgrEj:{
                  select:{
                    ene:true,
                    feb:true,
                    mar:true,
                    abr:true,
                    may:true,
                    jun:true,
                    jul:true,
                    ago:true,
                    sep:true,
                    oct:true,
                    nov:true,
                    dic:true,
                  }
                }
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    })

    const egrEj2023 = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaIngEgr:{
          select:{
            egresos:{
              select:{
                tablaEgrEj2023:{
                  select:{
                    ene:true,
                    feb:true,
                    mar:true,
                    abr:true,
                    may:true,
                    jun:true,
                    jul:true,
                    ago:true,
                    sep:true,
                    oct:true,
                    nov:true,
                    dic:true,
                  }
                }
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    })
    //************* SANITIZADOS *************** */
    const newIngresosPrPy = ingresosPrPy.map(empresa => {
      return {
          idOrden: empresa.idOrden,
          nombre: empresa.nombre,
          ...empresa.tablaIngEgr.ingPrPy
      };
    });
    const newEgresosPrPy = egrPrPy.map(empresa => {
      return {
          idOrden: empresa.idOrden,
          nombre: empresa.nombre,
          ...empresa.tablaIngEgr.egrPrPy
      };
    })
    const newIngresosProg = ingresosProg.map(empresa => {
      return {
          idOrden: empresa.idOrden,
          nombre: empresa.nombre,
          ...empresa.tablaIngEgr.ingresos.ingProg
      };
    })
    const newIngresosProy = ingresosProy.map(empresa => {
      return {
          idOrden: empresa.idOrden,
          nombre: empresa.nombre,
          ...empresa.tablaIngEgr.ingresos.ingProy
      };
    })
    const newIngresosEj = ingresosEj.map(empresa => {
      return {
          idOrden: empresa.idOrden,
          nombre: empresa.nombre,
          ...empresa.tablaIngEgr.ingresos.ingEj
      };
    })
    const newIngresosEje2023 = ingresosEj2023.map(empresa => {
      return {
          idOrden: empresa.idOrden,
          nombre: empresa.nombre,
          ...empresa.tablaIngEgr.ingresos.ingEj2023
      };
    })
    const newEgresosProg = egrProg.map(empresa => {
      return {
          idOrden: empresa.idOrden,
          nombre: empresa.nombre,
          ...empresa.tablaIngEgr.egresos.tablaEgrProg
      };
    })
    const newEgresosProy = egrProy.map(empresa => {
      return {
          idOrden: empresa.idOrden,
          nombre: empresa.nombre,
          ...empresa.tablaIngEgr.egresos.tablaEgrProy
      };
    })
    const newEgresosEj = egrEj.map(empresa => {
      return {
          idOrden: empresa.idOrden,
          nombre: empresa.nombre,
          ...empresa.tablaIngEgr.egresos.tablaEgrEj
      };
    })
    const newEgresosEje2023 = egrEj2023.map(empresa => {
      return {
          idOrden: empresa.idOrden,
          nombre: empresa.nombre,
          ...empresa.tablaIngEgr.egresos.tablaEgrEj2023
      };
    })
    // console.log(newIngresosProg);
    const workbook = XLSX.utils.book_new();

    const ingPrPySheet = XLSX.utils.json_to_sheet(newIngresosPrPy);
    const egrPrPySheet = XLSX.utils.json_to_sheet(newEgresosPrPy);
    const ingProgSheet = XLSX.utils.json_to_sheet(newIngresosProg);
    const ingProySheet = XLSX.utils.json_to_sheet(newIngresosProy);
    const ingEjSheet = XLSX.utils.json_to_sheet(newIngresosEj);
    const ingEj2023Sheet = XLSX.utils.json_to_sheet(newIngresosEje2023);
    const egrProgSheet = XLSX.utils.json_to_sheet(newEgresosProg);
    const egrProySheet = XLSX.utils.json_to_sheet(newEgresosProy);
    const egrEjSheet = XLSX.utils.json_to_sheet(newEgresosEj);
    const egrEj2023Sheet = XLSX.utils.json_to_sheet(newEgresosEje2023);

    XLSX.utils.book_append_sheet(workbook, ingPrPySheet, 'IngPrVsPy');
    XLSX.utils.book_append_sheet(workbook, egrPrPySheet, 'EgrPrVsPy');
    XLSX.utils.book_append_sheet(workbook, ingProgSheet, 'IngProg');
    XLSX.utils.book_append_sheet(workbook, ingProySheet, 'IngProy');
    XLSX.utils.book_append_sheet(workbook, ingEjSheet, 'IngEjec');
    XLSX.utils.book_append_sheet(workbook, ingEj2023Sheet, 'IngEjec2023');
    XLSX.utils.book_append_sheet(workbook, egrProgSheet, 'EgrProg');
    XLSX.utils.book_append_sheet(workbook, egrProySheet, 'EgrProy');
    XLSX.utils.book_append_sheet(workbook, egrEjSheet, 'EgrEjec');
    XLSX.utils.book_append_sheet(workbook, egrEj2023Sheet, 'EgrEjec2023');  

    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = resolve(__dirname,'xlsx/INGRESOS.xlsx');
    XLSX.writeFile(workbook, filePath);

    res.download(filePath, 'ingresos.xlsx', (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
        res.status(500).send('Error al enviar el archivo');
      } else {
        // Eliminar el archivo después de enviarlo
        fs.unlinkSync(filePath);
      }
    });
    // res.send('Excel generado exitosamente');
  }catch(error){
    console.error(error);
    res.status(500).send('Error al procesar el archivo Ingresos');
  }
});

app.post('/upload/ingresos', upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
      const filePath = file.path;
      const resultIngEgre = transformIngreyEgre(filePath);
      // console.log(resultIngEgre);
      if(resultIngEgre.length == 0){
        // console.log(entro);
        throw new Error('Error al procesar el archivo Ingresos');
        // res.status(500).send('Error al procesar el archivo Ingresos');
      }
      // console.log(resultIngEgre);
      await mainIngreYEgre(resultIngEgre);
      await mainIngreYEgre2();
      console.log("Ingresos cargados");
      res.status(200).send('Archivo Ingresos subido correctamente');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al procesar el archivo Ingresos');
    }
});

app.delete('/upload/ingresos', async (req,res)=>{
  try {
    await prisma.tablaIngresosProg.deleteMany({});
    await prisma.tablaIngresosProy.deleteMany({});
    await prisma.tablaIngresosEje.deleteMany({});
    await prisma.tablaIngresosEje2023.deleteMany({});

    await prisma.tablaEgresosProg.deleteMany({})
    await prisma.tablaEgresosProy.deleteMany({})
    await prisma.tablaEgresosEj.deleteMany({})
    await prisma.tablaEgresosEj2023.deleteMany({})
    
    
    // Una vez eliminados los registros dependientes, proceder con las tablas principales
    await prisma.tablaIngresosPrVsPy.deleteMany({});
    await prisma.tablaEgresosPrVsPy.deleteMany({});
    await prisma.tablaIngresos.deleteMany({});
    // Si tablaEgresos tiene una estructura similar a tablaIngresos, también deberías eliminar sus registros aquí
    await prisma.tablaEgresos.deleteMany({});

    // Finalmente, eliminar registros de tablaIngEgr
    const deletedtablaIngresosEgresos  = await prisma.tablaIngresosEgresos.deleteMany({});
    console.log(`${deletedtablaIngresosEgresos.count} registros eliminados de Ingresos.`);
    res.status(200).send('Eliminados todos los registros de Ingresos');  
  } catch (error) {
    console.log("Error", error);
    res.status(500).send('Error al procesar el archivo Ingresos');
  }
})
//**************************************** PRODUCCION *********************************************/
app.get('/upload/produccion', async (req,res)=>{
  try {
    const produccion = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaProduccion:{
          select:{
            tablaProdPrVsPy:{
              select:{
                registro:true,
                producto:true,
                medida:true,
                ene:true,
                feb:true,
                mar:true,
                abr:true,
                may:true,
                jun:true,
                jul:true,
                ago:true,
                sep:true,
                oct:true,
                nov:true,
                dic:true,
              },
              orderBy:{
                producto: 'asc'
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    });

    const produccionProy = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaProduccion:{
          select:{
            tablaProyProduc:{
              select:{
                producto:true,
                medida:true,
                ene:true,
                feb:true,
                mar:true,
                abr:true,
                may:true,
                jun:true,
                jul:true,
                ago:true,
                sep:true,
                oct:true,
                nov:true,
                dic:true,
              },
              orderBy:{
                producto: 'asc'
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    })
    
    const produccionProg = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaProduccion:{
          select:{
            tablaProgProduc:{
              select:{
                producto:true,
                medida:true,
                ene:true,
                feb:true,
                mar:true,
                abr:true,
                may:true,
                jun:true,
                jul:true,
                ago:true,
                sep:true,
                oct:true,
                nov:true,
                dic:true,
              },
              orderBy:{
                producto: 'asc'
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    })

    const produccionEjc = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaProduccion:{
          select:{
            tablaEjeProduc:{
              select:{
                producto:true,
                medida:true,
                ene:true,
                feb:true,
                mar:true,
                abr:true,
                may:true,
                jun:true,
                jul:true,
                ago:true,
                sep:true,
                oct:true,
                nov:true,
                dic:true,
              },
              orderBy:{
                producto: 'asc'
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    })
    
    const produccionEjc2023 = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaProduccion:{
          select:{
            tablaEje2023Produc:{
              select:{
                producto:true,
                medida:true,
                ene:true,
                feb:true,
                mar:true,
                abr:true,
                may:true,
                jun:true,
                jul:true,
                ago:true,
                sep:true,
                oct:true,
                nov:true,
                dic:true,
              },
              orderBy:{
                producto: 'asc'
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    })

    const newProducc = produccion.map(({ tablaProduccion, ...rest }) => {
      const flattened = tablaProduccion.flatMap(({ tablaProdPrVsPy }) => tablaProdPrVsPy);
      return flattened.map(item => ({ ...rest, ...item }));
    }).flat();
    
    const newProy = produccionProy.map(({ tablaProduccion, ...rest }) => {
      const flattened = tablaProduccion.flatMap(({ tablaProyProduc }) => tablaProyProduc);
      return flattened.map(item => ({ ...rest, ...item }));
    }).flat();
    
    const newProg = produccionProg.map(({ tablaProduccion, ...rest }) => {
      const flattened = tablaProduccion.flatMap(({ tablaProgProduc }) => tablaProgProduc);
      return flattened.map(item => ({ ...rest, ...item }));
    }).flat();

    const newEjec = produccionEjc.map(({ tablaProduccion, ...rest }) => {
      const flattened = tablaProduccion.flatMap(({ tablaEjeProduc }) => tablaEjeProduc);
      return flattened.map(item => ({ ...rest, ...item }));
    }).flat();
    
    const newEjec2023 = produccionEjc2023.map(({ tablaProduccion, ...rest }) => {
      const flattened = tablaProduccion.flatMap(({ tablaEje2023Produc }) => tablaEje2023Produc);
      return flattened.map(item => ({ ...rest, ...item }));
    }).flat();

    const workbook = XLSX.utils.book_new();
    
    const prodSheet = XLSX.utils.json_to_sheet(newProducc);
    const proySheet = XLSX.utils.json_to_sheet(newProy);
    const progSheet = XLSX.utils.json_to_sheet(newProg);
    const ejecSheet = XLSX.utils.json_to_sheet(newEjec);
    const ejec2023Sheet = XLSX.utils.json_to_sheet(newEjec2023);

    XLSX.utils.book_append_sheet(workbook, prodSheet, 'ProduccionPrVsPy');
    XLSX.utils.book_append_sheet(workbook, proySheet, 'ProduccionProy');
    XLSX.utils.book_append_sheet(workbook, progSheet, 'ProduccionProg');
    XLSX.utils.book_append_sheet(workbook, ejecSheet, 'ProduccionEjec');
    XLSX.utils.book_append_sheet(workbook, ejec2023Sheet, 'ProduccionEjecAnterior');

    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = resolve(__dirname,'xlsx/PRODUCCION.xlsx');
    XLSX.writeFile(workbook, filePath);

    // Enviar el archivo Excel como respuesta
    // res.download(filePath, 'ventas.xlsx', (err) => {
    //   if (err) {
    //     console.error('Error al enviar el archivo:', err);
    //     res.status(500).send('Error al enviar el archivo');
    //   } else {
      //     // Eliminar el archivo después de enviarlo
    //     fs.unlinkSync(filePath);
    //   }
    // });
    res.download(filePath, 'produccion.xlsx', (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
        res.status(500).send('Error al enviar el archivo');
      } else {
        // Eliminar el archivo después de enviarlo
        fs.unlinkSync(filePath);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar el archivo ventas');
  }
})
app.post('/upload/produccion', upload.single('file'), async (req, res) => {
  // Hay que guardar bien el archivo de resumen de seccion de ventas por que
  // consume de uploads/form_julio_ventas.xlsx
  try {
    
    const file = req.file;
    const filePath = file.path;
    const resultProduccion = transformProduccion(filePath);
    // console.log(resultProduccion);
    // console.log(resultProduccion[0].empresa);
    if(resultProduccion[0].empresa.length == 0 || resultProduccion[0].empresa.length > 10){
      throw new Error('Error al procesar el archivo Produccion');
    }
    console.log("Arhivos produccion subidos exitosamente");
    await mainProduccion(resultProduccion);
    await mainProduccion2();
    res.status(200).send("Archivos Produccion subidos exitosamente");
  } catch (error) {
      console.error(error);
      res.status(500).send('Error al procesar el archivo Produccion');
  }
})

app.delete('/upload/produccion', async (req,res)=>{
  try {
    await prisma.TablaProduccionProg.deleteMany({});
    await prisma.TablaProduccionProy.deleteMany({});
    await prisma.TablaProduccionEjec.deleteMany({});
    await prisma.TablaProduccionEjec2023.deleteMany({});
    await prisma.TablaProduccionPrVsPy.deleteMany({})
    // Luego, eliminar los datos de la tabla principal de producción
    const allDeleted = await prisma.TablaProduccion.deleteMany({});
    console.log(`${allDeleted.count} registros eliminados.`);
    res.status(200).send('Eliminados todos los registros de Produccion');
  } catch (error) {
    console.log("Error", error);
    res.status(500).send('Error al procesar el archivo Produccion');
  }
})
//**************************************** SALDOS *********************************************/
app.get('/upload/saldos', async (req,res)=>{
  try {
    const saldosDisponible = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaSaldos:{
          select:{
            disponible:{
              select:{
                ene:true,
                feb:true,
                mar:true,
                abr:true,
                may:true,
                jun:true,
                jul:true,
                ago:true,
                sep:true,
                oct:true,
                nov:true,
                dic:true,
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    });
    const saldosInventarios = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaSaldos:{
          select:{
            inventarios:{
              select:{
                ene:true,
                feb:true,
                mar:true,
                abr:true,
                may:true,
                jun:true,
                jul:true,
                ago:true,
                sep:true,
                oct:true,
                nov:true,
                dic:true,
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    });
    const saldosCobrar = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaSaldos:{
          select:{
            cobrar:{
              select:{
                ene:true,
                feb:true,
                mar:true,
                abr:true,
                may:true,
                jun:true,
                jul:true,
                ago:true,
                sep:true,
                oct:true,
                nov:true,
                dic:true,
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    })
    const saldosPagar = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaSaldos:{
          select:{
            pagar:{
              select:{
                ene:true,
                feb:true,
                mar:true,
                abr:true,
                may:true,
                jun:true,
                jul:true,
                ago:true,
                sep:true,
                oct:true,
                nov:true,
                dic:true,
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    })

    const newDisponible = saldosDisponible.map(empresa => ({
      idOrden: empresa.idOrden,
      nombre: empresa.nombre,
      ...empresa.tablaSaldos.disponible
    }));
    const newInventarios = saldosInventarios.map(empresa => ({
      idOrden: empresa.idOrden,
      nombre: empresa.nombre,
      ...empresa.tablaSaldos.inventarios
    }));
    const newCobrar = saldosCobrar.map(empresa => ({
      idOrden: empresa.idOrden,
      nombre: empresa.nombre,
      ...empresa.tablaSaldos.cobrar
    }));
    const newPagar = saldosPagar.map(empresa => ({
      idOrden: empresa.idOrden,
      nombre: empresa.nombre,
      ...empresa.tablaSaldos.pagar
    }));

    const workbook = XLSX.utils.book_new();

    const saldosSheet = XLSX.utils.json_to_sheet(newDisponible);
    const inventariosSheet = XLSX.utils.json_to_sheet(newInventarios);
    const cobrarSheet = XLSX.utils.json_to_sheet(newCobrar);
    const pagarSheet = XLSX.utils.json_to_sheet(newPagar);

    XLSX.utils.book_append_sheet(workbook, saldosSheet, 'DISPONIBLE');
    XLSX.utils.book_append_sheet(workbook, inventariosSheet, 'INVENTARIOS');
    XLSX.utils.book_append_sheet(workbook, cobrarSheet, 'COBRAR');
    XLSX.utils.book_append_sheet(workbook, pagarSheet, 'PAGAR');

    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = resolve(__dirname,'xlsx/SALDOS.xlsx');
    XLSX.writeFile(workbook, filePath);

    // Enviar el archivo Excel como respuesta
    res.download(filePath, 'saldos.xlsx', (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
        res.status(500).send('Error al enviar el archivo');
      } else {
        // Eliminar el archivo después de enviarlo
        fs.unlinkSync(filePath);
      }
    });
    // res.status(200).send('Excel generado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar el archivo Saldos');
  }
})

app.post('/upload/saldos', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const filePath = file.path;
    const resultSaldos = transformSaldos(filePath);
    // console.log(resultSaldos);
    if(resultSaldos.length == 0){
      throw new Error('Error al procesar el archivo Saldos');
    }
    await mainSaldos(resultSaldos);
    res.status(200).send('Archivo Saldos subido correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar el archivo Saldos');
  }
})

app.delete('/upload/saldos', async (req,res)=>{
  try {
    await prisma.tablaSaldosDisponible.deleteMany({});
    // Eliminar datos de tablaInventarios
    await prisma.tablaSaldosInventarios.deleteMany({});
    // Eliminar datos de tablaCobrar
    await prisma.tablaSaldosCobrar.deleteMany({});
    // Eliminar datos de tablaPagar
    await prisma.tablaSaldosPagar.deleteMany({});
    // Finalmente, eliminar datos de tablaSaldos
    const allDeleted = await prisma.tablaSaldos.deleteMany({});
    console.log(`${allDeleted.count} registros eliminados.`);
    res.status(200).send('Eliminados todos los registros de Saldos');  
  } catch (error) {
    console.log("Error", error);
    res.status(500).send('Error al procesar el archivo Saldos');    
  }
  
})
//**************************************** CAPACIDAD *********************************************/
app.get('/upload/capacidad', async (req, res) => {
  try {
    const capacidad = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaCapacidad:{
          select:{
            lineas:{
              select:{
                linea:true,
                cantidad:{
                  select:{
                    cantidad:true
                  }
                },
                medida:{
                  select:{
                    medida:true
                  }
                },
                eje:{
                  select:{
                    ene:true,
                    feb:true,
                    mar:true,
                    abr:true,
                    may:true,
                    jun:true,
                    jul:true,
                    ago:true,
                    sep:true,
                    oct:true,
                    nov:true,
                    dic:true,
                  }
                }
              },
              orderBy:{
                linea: 'asc'
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    });
    const capacidadProg = await prisma.Empresa.findMany({
      select:{
        idOrden: true,
        nombre:true,
        tablaCapacidad:{
          select:{
            lineas:{
              select:{
                linea:true,
                cantidad:{
                  select:{
                    cantidad:true
                  }
                },
                medida:{
                  select:{
                    medida:true
                  }
                },
                prg:{
                  select:{
                    ene:true,
                    feb:true,
                    mar:true,
                    abr:true,
                    may:true,
                    jun:true,
                    jul:true,
                    ago:true,
                    sep:true,
                    oct:true,
                    nov:true,
                    dic:true,
                  }
                }
              },
              orderBy:{
                linea: 'asc'
              }
            }
          }
        }
      },
      orderBy:{
        idOrden: 'asc'
      }
    });
    const result = capacidad.map(empresa => {
      return empresa.tablaCapacidad.flatMap(tabla => {
          return tabla.lineas.map(linea => {
              return {
                  idOrden: empresa.idOrden,
                  nombre: empresa.nombre,
                  cantidad: linea.cantidad.cantidad,
                  medida: linea.medida.medida,
                  linea: linea.linea,
                  ...linea.eje
              };
          });
      });
    }).flat();
    const resultProg = capacidadProg.map(empresa => {
      return empresa.tablaCapacidad.flatMap(tabla => {
          return tabla.lineas.map(linea => {
              return {
                  idOrden: empresa.idOrden,
                  nombre: empresa.nombre,
                  cantidad: linea.cantidad.cantidad,
                  medida: linea.medida.medida,
                  linea: linea.linea,
                  ...linea.prg
              };
          });
      });
    }).flat();
    // console.log(result);
    const workbook = XLSX.utils.book_new();

    const resultSheet = XLSX.utils.json_to_sheet(result);
    const resultSheetProg = XLSX.utils.json_to_sheet(resultProg);
    // console.log(resultSheet);
    XLSX.utils.book_append_sheet(workbook, resultSheet, 'CapacidadEjec');
    XLSX.utils.book_append_sheet(workbook, resultSheetProg, 'CapacidadProg');

    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = resolve(__dirname,'xlsx/CAPACIDAD.xlsx');
    XLSX.writeFile(workbook, filePath);
    
    res.download(filePath, 'capacidad.xlsx', (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
        res.status(500).send('Error al enviar el archivo');
      } else {
        // Eliminar el archivo después de enviarlo
        fs.unlinkSync(filePath);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar el archivo Capacidad');
  }
})
app.post('/upload/capacidad', async (req, res) => {
  try {
    const resultCapacidad = transformCapacidad("./uploads/FORM_VENTAS.xlsx");
    await mainCapacidad(resultCapacidad);
    console.log("Archivos Capacidad cargada exitosamente");
    res.status(200).send('Archivo Capacidad subido correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar el archivo Capacidad');
  }
})

app.delete('/upload/capacidad', async (req,res)=>{
  try {
    await prisma.tablaCapacidadEjec.deleteMany({});
    await prisma.tablaCapacidadProg.deleteMany({});
    await prisma.tablaCapacidadMedidas.deleteMany({});
    await prisma.tablaCapacidadCantidades.deleteMany({});
    await prisma.tablaCapacidadLineas.deleteMany({});
    // Luego, eliminar los datos de la tabla principal de producción
    const allDeleted =  await prisma.tablaCapacidad.deleteMany({});
    console.log(`${allDeleted.count} registros eliminados de capacidad.`);
    res.status(200).send('Eliminados todos los registros de Capacidad');
  } catch (error) {
    console.log("Error: ",error);
    res.status(500).send('Error al procesar el archivo Capacidad');
  }
})

export default app