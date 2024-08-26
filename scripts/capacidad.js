import XLSX from 'xlsx';
import { fileURLToPath } from 'url';
import { dirname,resolve } from 'path';
// const fs = require("fs");

// Leer el archivo XLSX

const __dirname = dirname(fileURLToPath(import.meta.url));
const workbook = XLSX.readFile(resolve(__dirname,'../uploads/FORM_JULIO_VENTAS.xlsx'));


export let objectCapacidad = ObjectEmpPrPy(workbook);
console.log(objectCapacidad);
// EmpPrPy.forEach(element => {
    
//     console.log(element.prs);
// });



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
        if(pr.lineas.length > 0 || pr.cantidades.length > 0 || pr.medidas.length > 0 || pr.prs.length > 0 || pr.ejs.length > 0){
            EmpPr.push({empresa: element, ...pr});
        }      
        // console.log(pr);
      }
    //    console.log(element);   
    });
    // console.log(EmpPr);
    return EmpPr;
}

function getPrPyVentas(jsonData, key) {
    const variables = [key[0], "VIII. CAPACIDAD INSTALADA Y UTILIZADA (% USO) ", "TOTAL"];
    let result = {
        lineas: [],
        cantidades: [],
        medidas: [],
        prs: [],
        ejs: []
    };

    for (let index = 0; index < jsonData.length; index++) {
        if (jsonData[index][variables[0]] === variables[1]) {
            for (let i = index + 1; i < jsonData.length; i++) {
                if (jsonData[i][variables[0]] === 'IX. INVERSIONES (EN BOLIVIANOS)') {
                    break;
                }
                let program = Object.values(jsonData[i + 1]);
                if (program.includes('Pr.')) {
                    let prIndex = program.findIndex((value) => value === "Pr.");
                    let defPr = program.slice(prIndex + 1, prIndex + 13);
                    result.lineas.push(program[0]);
                    result.cantidades.push(program[1]);
                    result.medidas.push(program[2]);
                    result.prs.push(defPr);
                }
                if (program.includes('Ej.')) {
                    let ejIndex = program.findIndex((value) => value === "Ej.");
                    let defEj = program.slice(ejIndex + 1, ejIndex + 13);
                    // Asegurarse de que 'ejs' es un arreglo de arreglos
                    result.ejs.push(defEj);
                }
            }
        }
    }
    return result;
}




