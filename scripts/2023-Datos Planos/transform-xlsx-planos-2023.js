import XLSX from 'xlsx';
import { fileURLToPath } from 'url';
import { dirname,resolve } from 'path';
import * as fs from 'fs';



const __dirname = dirname(fileURLToPath(import.meta.url));
const workbook = XLSX.readFile(resolve(__dirname,'VENTAS_PLANOS_2023.xlsx'));
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
let jsonData = XLSX.utils.sheet_to_json(sheet);

let nomEmp = null;
let ejeEmp = null;
let columnValues = jsonData
    .map((row, index) => {
        if (typeof row['__EMPTY'] === 'number' && row['__EMPTY_1'] !== undefined) {
            nomEmp = row['__EMPTY_1'];
            ejeEmp = null; 
                // reset ejeEmp when a new empresa is found
        } else if (row['__EMPTY_2'] === 'EJE.' && Object.values(row).length > 0) {
            let rowValues = Object.values(row);
            rowValues.shift();
            ejeEmp = rowValues;
        }

        return {
            empresa: nomEmp,
            ej: ejeEmp
            };
        })
        .filter((row) => row.empresa !== null && row.ej !== null)
        
       export let EmpEjec2023 = Array.from(new Set(columnValues.map(JSON.stringify))).map(JSON.parse);

       console.log(EmpEjec2023);
       // console.log(uniqueColumnValues[0]);
       // console.log(uniqueColumnValues);





































// console.log(workbook);



// workbook.SheetNames.forEach(element => {
//     let sheet = workbook.Sheets[element];
//     jsonData = XLSX.utils.sheet_to_json(sheet);

//     let nomEmp = null;
//     let ejeEmp = null;
//     let columnValues = jsonData
//         .map((row, index) => {
//             if (typeof row['__EMPTY'] === 'number' && row['__EMPTY_1'] !== undefined) {
//                 nomEmp = row['__EMPTY_1'];
//                 ejeEmp = null; 
//                 // reset ejeEmp when a new empresa is found
//             } else if (row['__EMPTY_2'] === 'EJE.' && Object.values(row).length > 0) {
//                 let rowValues = Object.values(row);
//                 rowValues.shift();
//                 ejeEmp = rowValues;
//             }

//             return {
//                 empresa: nomEmp,
//                 ej: ejeEmp
//             };
//         })
//         .filter((row) => row.empresa !== null && row.ej !== null)
        
//         let uniqueColumnValues = Array.from(new Set(columnValues.map(JSON.stringify))).map(JSON.parse);

//         console.log(uniqueColumnValues[0]);
//         // console.log(columnValues);
// })

























//Guardado del archivo en un txt

// const dataString = JSON.stringify(jsonData, null, 2);
// fs.writeFile('output2023.txt', dataString, (err) => {
//     if (err) throw err;
//     console.log('Los datos han sido escritos en output.txt');
//   });

// console.log("Hello World");
