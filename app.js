import express from 'express';
import multer from 'multer';
import path from 'path';
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
    cb(null, 'uploads/');
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
    res.status(200).send('Archivo Ventas subido ydatos insertados correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar el archivo ventas');
  }
});

app.get('/upload/ventas', async (req,res)=>{
  const empresasConEmpPrPy= await prisma.empresa.findMany({
    select:{
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
          dic:true
        }
      }
    }
  })
  const empresasConEmpPrPyEj= await prisma.empresa.findMany({
    select:{
      nombre:true,
      programado:{
        select:{
          // registro:true,
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
          dic:true
        }
      },
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
          dic:true
        }
      },
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
          dic:true
        }
      }
    }
  })
  res.send(empresasConEmpPrPyEj)
})

app.delete('/upload/ventas', async (req,res)=>{
    const deletePrPy = await prisma.tablaVentasPrVsPy.deleteMany();
    console.log(`${deletePrPy.count} registros eliminados.`);
    const deleteAllPro = await prisma.tablaVentasProgramado.deleteMany();
    console.log(`${deleteAllPro.count} registros eliminados.`);
    const deleteAllPry = await prisma.tablaVentasProyectado.deleteMany();
    console.log(`${deleteAllPry.count} registros eliminados.`);
    const deleteAllEje = await prisma.tablaVentasEjecutado.deleteMany();
    console.log(`${deleteAllEje.count} registros eliminados.`);
    const deleteAllEmp = await prisma.Empresa.deleteMany({});
    console.log(`${deleteAllEmp.count} registros eliminados.`);
    res.send('Eliminados todos los registros');
})
//**************************************** INGRESOS *********************************************/
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
      await mainIngreYEgre(resultIngEgre);
      await mainIngreYEgre2();
      console.log("Ingresos cargados");
      res.status(200).send('Archivo Ingresos subido y datos insertados correctamente');
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
    res.status(200).send('Eliminados todos los registros');
  } catch (error) {
    console.log("Error", error);
    res.status(500).send('Error al procesar el archivo Produccion');
  }
})
//**************************************** SALDOS *********************************************/
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
    res.status(200).send('Archivo Saldos subido y datos insertados correctamente');
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
    res.status(200).send('Eliminados todos los registros');  
  } catch (error) {
    console.log("Error", error);
    res.status(500).send('Error al procesar el archivo Saldos');    
  }
  
})
//**************************************** CAPACIDAD *********************************************/
app.post('/upload/capacidad', async (req, res) => {
  try {
    const resultCapacidad = transformCapacidad("./uploads/FORM_VENTAS.xlsx");
    await mainCapacidad(resultCapacidad);
    console.log("Archivos Capacidad cargada exitosamente");
    res.status(200).send('Archivo Capacidad subido y datos insertados correctamente');
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
    res.status(200).send('Eliminados todos los registros');
  } catch (error) {
    console.log("Error: ",error);
    res.status(500).send('Error al procesar el archivo Capacidad');
  }
})

export default app