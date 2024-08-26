import XLSX from "xlsx";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
// const fs = require("fs");

const __dirname = dirname(fileURLToPath(import.meta.url));

const workbook = XLSX.readFile(resolve(__dirname, "PRODUCCION_PROY.xlsx"));
let result = [];
let result2 = [];
let lin = null;
let med = null;
let defPr = null;
// console.log(workbook);
function Produccion(workbook) {
  workbook.SheetNames.forEach((element) => {
    let sheet = workbook.Sheets[element];
    let jsonData = XLSX.utils.sheet_to_json(sheet);
    // console.log(jsonData);
    for (let i = 0; i < jsonData.length; i++) {
        let program = Object.values(jsonData[i]);
        // console.log(program);
        let {
          __EMPTY_1: Empresa,
          __EMPTY_2: Producto,
          __EMPTY_3: Medida,
        } = jsonData[i];
        Empresa = program[1];
        Producto = program[2];
        Medida = program[3];
        if(program.includes("PRG.")){

          let prIndex = program.findIndex((value)=> value==="PRG.")
          let myProg = program.slice(prIndex+1,prIndex+13)
          let myProy = Object.values(jsonData[i+1]).slice(1, -1);
          let myEjec = Object.values(jsonData[i + 2]).slice(1, 13);
          let myEjec2023 = Object.values(jsonData[i + 3]).slice(1, 13);
          if(myProy[0]==0){
            result.push({
              empresa: Empresa,
              producto: Producto,
              medida: Medida,
              registro: myProg,
              ej: myEjec,
              ej2023: myEjec2023
            });
          }
          if((myProg[0]!=myProy[0] && myProy[0]!=0)||(myProg[0]==myProy[0])){
            console.log("entro a proy");
            result.push({
              empresa: Empresa,
              producto: Producto,
              medida: Medida,
              registro: myProy,
              ej: myEjec,
              ej2023: myEjec2023
            });
          }
        }        
    }
  });

  return result;
}

function agruparPorEmpresa(datos) {
  const agrupados = {};

  datos.forEach(({ empresa, producto, medida, pr, ej, ej2023 }) => {
    if (!agrupados[empresa]) {
      agrupados[empresa] = {
        productos: [],
        medidas: [],
        prs: [],
        ejs: [],
        ej2023s: [],
      };
    }
    agrupados[empresa].productos.push(producto);
    agrupados[empresa].medidas.push(medida);
    agrupados[empresa].prs.push(pr);
    agrupados[empresa].ejs.push(ej);
    agrupados[empresa].ej2023s.push(ej2023);
  });

  return Object.entries(agrupados).map(
    ([empresa, { productos, medidas, prs, ejs, ej2023s }]) => ({
      empresa,
      productos,
      medidas,
      prs,
      ejs,
      ej2023s,
    })
  );
}
console.log(Produccion(workbook));
// const myNewObject = agruparPorEmpresa(Produccion(workbook));
// console.log(myNewObject);
// export default myNewObject;

// ************************************** PARTE DE LOS ACOPIOS DE EMAPA ******************************

function ObtenerAcopio() {
  const workbook = XLSX.readFile(
    resolve(__dirname, "../../uploads/FORM_VENTAS.xlsx")
  );
  //Nuevo objecto para guardar los datos
  let EmpPr = [];
  //Recorrer todas las hojas
  workbook.SheetNames.forEach((element) => {
    //element es el nombre de la hoja
    let sheet = workbook.Sheets[element];
    //transformacion de la hoja a JSON
    let jsonData = XLSX.utils.sheet_to_json(sheet);
    //Si el JSON no esta vacio
    if (jsonData[0]) {
      //Obtener el PR o el PY de la seccion V. Ventas de la hoja
      let pr = Acopio(jsonData, Object.keys(jsonData[0]));
      if (element === "EMAPA") {
        // console.log(pr);
        EmpPr = pr;
      }
      // console.log(pr);
    }
    //    console.log(element);
  });
  // console.log(EmpPr);
  return EmpPr;
}

function Acopio(jsonData, key) {
  const variables = [key[0], "X. ACOPIO", "TOTAL"];

  for (let index = 0; index < jsonData.length; index++) {
    if (jsonData[index][variables[0]] === variables[1]) {
      for (let i = index + 1; i < jsonData.length; i++) {
        if (jsonData[i][variables[0]] === "XI. CANTIDADES EN SILOS") {
          break;
        }
        let program = Object.values(jsonData[i + 1]);
        // console.log(program);
        if (program.includes("Pr.") || program.includes("P")) {
          let prIndex = program.findIndex(
            (value) => value === "Pr." || value === "P"
          );
          defPr = program.slice(prIndex + 1, prIndex + 13);
          const regex = /^([^(]+)/;
          lin = program[0].match(regex)[0];
          const regex2 = /\(([^)]+)\)/;
          med = program[0].match(regex2)[1];
        }
        if (program.includes("Ej.") || program.includes("E")) {
          let ejIndex = program.findIndex(
            (value) => value === "Ej." || value === "E"
          );
          let defEj = program.slice(ejIndex + 1, ejIndex + 13);
          // console.log(defEj);
          // console.log(lin);
          result2.push({
            empresa: "EMAPA",
            producto: lin,
            medida: med,
            pr: defPr,
            ej: defEj,
            ej2023: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          });
        }
      }
    }
  }
  return result2;
}

export let objectCapacidad = ObtenerAcopio();

console.log(Produccion);
