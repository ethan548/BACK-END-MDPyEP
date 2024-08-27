import XLSX from "xlsx";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// let result = [];
let result2 = [];
let lin = null;
let med = null;
let defPr = null;
// capacidad

let result3 = [];
let linCapa = null;
let medCapa = null;
let defPrCapa = null;

export function transformProduccion(filePath) {
  const workbook = XLSX.readFile(filePath);

  let result = [];
  function Produccion(workbook) {
    workbook.SheetNames.forEach((element) => {
      let sheet = workbook.Sheets[element];
      let jsonData = XLSX.utils.sheet_to_json(sheet);
      // console.log(jsonData[0])
      for (let i = 0; i < jsonData.length; i++) {
        if (
          jsonData[i]["__EMPTY_1"] !== "EMPRESA" &&
          jsonData[i]["__EMPTY_1"] !== undefined &&
          !(
            Number(jsonData[i]["__EMPTY_1"]) === jsonData[i]["__EMPTY_1"] &&
            !Number.isInteger(jsonData[i]["__EMPTY_1"])
          )
        ) {
          // console.log(jsonData[i+1]);
          let {
            __EMPTY_1: Empresa,
            __EMPTY_2: Producto,
            __EMPTY_3: Medida,
          } = jsonData[i];
          let myProg = Object.values(jsonData[i]).slice(5, 17);
          // console.log(myProg);
          
          let myProy = Object.values(jsonData[i+1]).slice(1, -1);
          // console.log(myProy);

          let myEjec = Object.values(jsonData[i + 2]).slice(1, -1);
          // console.log(myEjec);
          let myEjec2023 = Object.values(jsonData[i + 3]).slice(1, 13);
          // console.log(myEjec2023);
          result.push({
            empresa: Empresa,
            producto: Producto,
            medida: Medida,
            pr: myProg,
            py: myProy,
            ej: myEjec,
            ej2023: myEjec2023,
          });
        }
      }
    });
    const nuevosAcopio = ObtenerAcopio();
    nuevosAcopio.map((element) => {
        result.push(element);
    });
    // const nuevosCapacidad = ObtenerCapacidad();
    // nuevosCapacidad.map((element) => {
    //     result.push(element);
    // });
    result2 = [];
    result3 = [];
    // console.log(nuevosAcopio);
    // console.log(result);
    return result;
  }

  function agruparPorEmpresa(datos) {
    const agrupados = {};

    datos.forEach(({ empresa, producto, medida, pr, py, ej, ej2023 }) => {
      if (!agrupados[empresa]) {
        agrupados[empresa] = {
          productos: [],
          medidas: [],
          prs: [],
          pys: [],
          ejs: [],
          ej2023s: [],
        };
      }
      agrupados[empresa].productos.push(producto);
      agrupados[empresa].medidas.push(medida);
      agrupados[empresa].prs.push(pr);
      agrupados[empresa].pys.push(py);
      agrupados[empresa].ejs.push(ej);
      agrupados[empresa].ej2023s.push(ej2023);
    });

    return Object.entries(agrupados).map(
      ([empresa, { productos, medidas, prs, pys, ejs, ej2023s }]) => ({
        empresa,
        productos,
        medidas,
        prs,
        pys,
        ejs,
        ej2023s,
      })
    );
  }
  const myNewObject = agruparPorEmpresa(Produccion(workbook));
  // myNewObject.map((element) => {
  //   console.log(element.empresa, element.pys);
  // });
  return myNewObject;
}

//******************************* PARTE DE LOS ACOPIOS ************************************ */

function ObtenerAcopio() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
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
        // console.log(element);
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

          // console.log(lin);
          result2.push({
            empresa: "EMAPA",
            producto: "ACOPIO "+lin,
            medida: med,
            pr: defPr,
            py: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // nuevo 
            ej: defEj,
            ej2023: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          });
        }
      }
    }
  }
  return result2;
}

// *************************************** PARTE DE LA CAPACIDAD DE QUIPUS ****************************** //

function ObtenerCapacidad(){
  const __dirname = dirname(fileURLToPath(import.meta.url));
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
      let pr = Capacidad(jsonData, Object.keys(jsonData[0]));
      if (element === "QUIPUS") {
        // console.log(element);
        EmpPr = pr;
      }
      // console.log(pr);
    }
    //    console.log(element);
  });
  // console.log(EmpPr);
  return EmpPr;
}

function Capacidad(jsonData, key) {
  const variables = [key[0], "VIII. CAPACIDAD INSTALADA Y UTILIZADA (% USO) ", "TOTAL"];

  for (let index = 0; index < jsonData.length; index++) {
    if (jsonData[index][variables[0]] === variables[1]) {
      for (let i = index + 1; i < jsonData.length; i++) {
        if (jsonData[i][variables[0]] === 'IX. INVERSIONES (EN BOLIVIANOS)') {
          break;
        }
        let program = Object.values(jsonData[i + 1]);
        // console.log(program);
        if (program.includes("P")) {
          let prIndex = program.findIndex(
            (value) => value === "Pr." || value === "P"
          );
          defPrCapa = program.slice(prIndex + 1, prIndex + 13);
          linCapa = program[0];
          medCapa = program[2];
        }
        if (program.includes("E")) {
          let ejIndex = program.findIndex(
            (value) => value === "Ej." || value === "E"
          );
          let defEjCapa = program.slice(ejIndex + 1, ejIndex + 13);

          // console.log(lin);
          result3.push({
            empresa: "QUIPUS",
            producto: linCapa,
            medida: medCapa,
            pr: defPrCapa,
            py: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // nuevo
            ej: defEjCapa,
            ej2023: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          });
        }
      }
    }
  }
  return result3;
}
