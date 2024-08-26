import XLSX from 'xlsx';
import { fileURLToPath } from 'url';
import { dirname,resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workbook = XLSX.readFile(resolve(__dirname,'SALDOS-CC-CP.xlsx'));
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
let jsonData = XLSX.utils.sheet_to_json(sheet);
let nomEmp = null;

let disponible = null
let inventarios = null
let cCobrar = null
let cPagar = null
let columnValues = jsonData
.map((row, index) => {
    // console.log(row);
    if (typeof row['__EMPTY'] === 'number') {
    nomEmp = row['__EMPTY_1'].match(/^\S+/)[0];
    }
    if(row['__EMPTY_2'] === 'DISPONIBLE (SALDO EN LIBRETA)'){
        disponible = Object.values(row).slice(4).slice(0,12)

        let newInventarios = jsonData[index+1];
        inventarios = Object.values(newInventarios).slice(2).slice(0, 12);
        
        let newcCobrar = jsonData[index+2];
        cCobrar = Object.values(newcCobrar).slice(2).slice(0,12)
        
        let newcPagar = jsonData[index+3]
        cPagar = Object.values(newcPagar).slice(2).slice(0,12)
        
        // console.log(nomEmp);
        // console.log(Object.values(newValueEje).slice(2).slice(0, 12));
    }

    return{
        empresa: nomEmp,
        dis: disponible,
        inv: inventarios,
        cob: cCobrar,
        pag: cPagar
    }
    // ingresos = []
    // egresos = []
    
})
.filter((row) =>row.nombre !== null && row.dis !== null && row.inv !== null && row.cobrar !==null && row.pagar !== null)

export let saldos = Array.from(new Set(columnValues.map(JSON.stringify))).map(JSON.parse);
// console.log(saldos);