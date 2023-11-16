import fs from 'fs'
import { yarg } from './config/plugings/args.plugings'

const { l: limit, b: base, s: show } = yarg

// Contenido que quieres escribir en el archivo
let outPutMessage = ''
const header = `
================================
         Tabla del ${base}
================================

`
for (let i: number = 1; i <= limit; i++) {
  const multiplo = base * i
  outPutMessage += `${base} x ${i} = ${multiplo} \n`
}
outPutMessage = header + outPutMessage

// Ruta del archivo que deseas crear o modificar
const outputPath = `outputs`

fs.mkdirSync(outputPath, { recursive: true })

// Escribe en el archivo
fs.writeFile(`${outputPath}/tabla-${base}.txt`, outPutMessage, (err: any) => {
  if (err) {
    console.error('Error al escribir en el archivo:', err)
    return
  }
  console.log('File Created!');
  if(show) console.log(outPutMessage)
})
