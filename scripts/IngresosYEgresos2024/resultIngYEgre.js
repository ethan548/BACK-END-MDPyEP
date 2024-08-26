import XLSX from 'xlsx';
import { fileURLToPath } from 'url';
import { dirname,resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workbook = XLSX.readFile(resolve(__dirname,'INGRESOS_Y_GASTOS_NEW.xlsx'));
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
let jsonData = XLSX.utils.sheet_to_json(sheet);
let nomEmp = null;

let ingresos = []
let egresos = []
let columnValues = jsonData
.map((row, index) => {
    if (typeof row['__EMPTY'] === 'number') {
    nomEmp = row['__EMPTY_1'].match(/^\S+/)[0];
    }
    if(row['__EMPTY_2'] === 'INGRESOS'){
        // let myPr = Object.values(row).slice(4).slice(0, 12);
        ingresos.push({pr:Object.values(row).slice(4).slice(0, 12)});
        
        let newValueProy = jsonData[index+1];
        ingresos.push({py:Object.values(newValueProy).slice(1).slice(0, 12)});

        let newValueEje = jsonData[index+2];
        ingresos.push({ej:Object.values(newValueEje).slice(1).slice(0, 12)});
        
        let newValueEje2023 = jsonData[index+3];
        ingresos.push({ej2023:Object.values(newValueEje2023).slice(1).slice(0, 12)});
    }
    if(row['__EMPTY_2'] === 'EGRESOS'){
        // let myPr = Object.values(row).slice(2).slice(0, 12);
        egresos.push({pr:Object.values(row).slice(2).slice(0, 12)});
        
        let newValueProy = jsonData[index+1];
        egresos.push({py:Object.values(newValueProy).slice(1).slice(0, 12)});

        let newValueEgre = jsonData[index+2];
        egresos.push({ej:Object.values(newValueEgre).slice(1).slice(0, 12)});
            
        let newValueEje2023 = jsonData[index+3];
        egresos.push({ej2023:Object.values(newValueEje2023).slice(1).slice(0, 12)});
    }    
    
    let result = {
        empresa: nomEmp,
        ingreso: ingresos,
        egreso: egresos
    }
    ingresos = []
    egresos = []
    return {
        result
        };
    })
    .filter((row) =>row.result.empresa !== null && (row.result.ingreso.length > 0 || row.result.egreso.length > 0))

const agrupadosPorEmpresa = {};

columnValues.forEach(({ result }) => {
    const { empresa, ingreso, egreso } = result;
    if (!agrupadosPorEmpresa[empresa]) {
    agrupadosPorEmpresa[empresa] = { ingreso: [], egreso: [] };
    }
    agrupadosPorEmpresa[empresa].ingreso.push(...ingreso);
    agrupadosPorEmpresa[empresa].egreso.push(...egreso);
});

const resultIngEgre = Object.entries(agrupadosPorEmpresa).map(([empresa, { ingreso, egreso }]) => ({
    empresa, ingreso, egreso
}));
// console.log(resultadoFinal);
// console.log(resultadoFinal);
// resultIngEgre.forEach(element => {
//     console.log(element.empresa);
//     console.log(element.egreso);
// });
// console.log(resultIngEgre);
export default resultIngEgre