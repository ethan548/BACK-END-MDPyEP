import XLSX from 'xlsx';
import { fileURLToPath } from 'url';
import { dirname,resolve } from 'path';
// const fs = require("fs");


// Leer el archivo XLSX para index.js
// const workbook = XLSX.readFile("./scripts/FORMULARIO_TODAS_HOJAS.xlsx");

// Leer el archivo XLSX

const __dirname = dirname(fileURLToPath(import.meta.url));
//console.log(resolve(__dirname,'FORMULARIO_TODAS_HOJAS.xlsx'));
const workbook = XLSX.readFile(resolve(__dirname,'FORM_JUNIO_VENTAS.xlsx'));


export let EmpPrPy = ObjectEmpPrPy(workbook);
// console.log(EmpPrPy);
export let EmpPrPyEj = ObjectEmpPrPyEj(workbook);
// console.log(EmpPrPyEj);
//console.log(EmpPrPyEj(1));
// Seleccionar la primera hoja
// let sheetName = workbook.SheetNames[0];
// let sheet = workbook.Sheets[sheetName];

// Obtener el nombre de las 
//console.log(sheetName);

// Convertir la hoja a JSON
// const jsonData = XLSX.utils.sheet_to_json(sheet);



function ObjectEmpPrPy(workbook){
  //Nuevo objecto para guardar los datos  
  let EmpPr = []
  //Recorrer todas las hojas
    workbook.SheetNames.forEach(element => {
      //element es el nombre de la hoja
      let sheet = workbook.Sheets[element];
      //transformacion de la hoja a JSON
      let jsonData = XLSX.utils.sheet_to_json(sheet);
      //Si el JSON no esta vacio
      if(jsonData[0]){
        //Obtener el PR o el PY de la seccion V. Ventas de la hoja
        let pr = getPrPyVentas(jsonData,Object.keys(jsonData[0]));
        EmpPr.push({empresa: element, ...pr});
       // console.log(pr);
      }
      // Si el PR no es undefined, agregarlo al array, SECCIONES EXCEL es undefined
    //   if (pr !== undefined){
    //   }
    });
    //console.log(EmpPr);
    return EmpPr;
}

function getPrPyVentas(jsonData,key){
  
  // let key = Object.keys(jsonData[0])
  // key[0] es el titulo de cada hoja excel, el primer valor de la hoja
  const variables = [key[0],"V. VENTAS","TOTAL"]
  //console.log(key[0]);
  
    for (let index = 0; index < jsonData.length; index++) {
        //Seleccionar la seccion V. VENTAS del primer excel
        if (
          jsonData[index][variables[0]] === variables[1]
        ) {
          for (let i = index; i < jsonData.length; i++) {
            //Seleccionado el 1er total de la seccion V. Ventas
            //Se podria condicionar para que obtenga el total de la seccion A) UNIDADES MONETARIAS(en Bolivianos)
            if (jsonData[i][variables[0]] === variables[2]) {
              // Limpieza del array de valores a solo numeros
                // Obtiene el PR
                let program = Object.values(jsonData[i]).filter((value) => typeof value === "number");
                // Obtiene el PY
                let proyect = Object.values(jsonData[i + 1]).filter((value) => typeof value === "number");
                // Condicional para obtener el PROGRAMADO
                if(proyect[0]==0){
                  return {pr:program};
                }
                // Condicional para obtener el PROYECTADO
                if((program[0]!=proyect[0] && proyect[0]!=0)||(program[0]==proyect[0])){
                 return {py:proyect};
                }
                //Obtener el EJ (ejecutado)
                // Object.values(jsonData[i + 2])
            }
          }
        }   
    }
}

function ObjectEmpPrPyEj(workbook){
  //Nuevo objecto para guardar los datos  
  let EmpPr = []
  //Recorrer todas las hojas
    workbook.SheetNames.forEach(element => {
      //element es el nombre de la hoja
      let sheet = workbook.Sheets[element];
      //transformacion de la hoja a JSON
      let jsonData = XLSX.utils.sheet_to_json(sheet);
      //Si el JSON no esta vacio
      if(jsonData[0]){
        //Obtener el PR o el PY de la seccion V. Ventas de la hoja
        let pr = getPrPyEjVentas(jsonData,Object.keys(jsonData[0]));
        EmpPr.push({empresa: element, ...pr});
       // console.log(pr);
      }
      // Si el PR no es undefined, agregarlo al array, SECCIONES EXCEL es undefined
    //   if (pr !== undefined){
    //   }
    });
    // console.log(EmpPr);
    return EmpPr;
}

function getPrPyEjVentas(jsonData,key){
  const variables = [key[0],"V. VENTAS","TOTAL"]
  //console.log(key[0]);
  
    for (let index = 0; index < jsonData.length; index++) {
        //Seleccionar la seccion V. VENTAS del primer excel
        if (
          jsonData[index][variables[0]] === variables[1]
        ) {
          for (let i = index; i < jsonData.length; i++) {
            //Seleccionado el 1er total de la seccion V. Ventas
            //Se podria condicionar para que obtenga el total de la seccion A) UNIDADES MONETARIAS(en Bolivianos)
            if (jsonData[i][variables[0]] === variables[2]) {
              // Limpieza del array de valores a solo numeros
              let programPr = Object.values(jsonData[i]).filter((value) => typeof value === "number");
              let programPy = Object.values(jsonData[i+1]).filter((value) => typeof value === "number");
              let programEj = Object.values(jsonData[i+2]).filter((value) => typeof value === "number");
              // Obtiene el PR, PY, EJ
                  return {pr:programPr,
                          py:programPy,
                          ej:programEj}
            }
          }
        }
    }
}
