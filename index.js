import inquirer from "inquirer";
import clipboardy from "clipboardy"
import chalk from "chalk"

let abort = false

const generarClave = (base, cantCaracteres) => {
  let clave = ""
  for (let i = 0; i < cantCaracteres; i++) {
    let random = Math.floor(Math.random() * base.length)
    clave += base.charAt(random)
  }
  return clave
}

const generarBase = () => {
  let opciones = [
    {
      name: "mayusculas",
      value: 'mayusculas',
    },
    {
      name: "numeros",
      value: 'numeros',
    },
    {
      name: "simbolos",
      value: 'simbolos',
    },
  ];

  inquirer
    .prompt([
      {
        type: "number",
        name: "cantCaracteres",
        message: "Cuantos caracteres deseas que tengas tu clave? min10 / max20",
        default: 10,
        validate: function (value) {
          const valid = !isNaN(value) && value >= 7 && value <= 25;
          return valid || "Por favor, ingresa un numero entre 7 y 25";
        },
      },
      {
        type: "checkbox",
        name: "opciones",
        message: "Selecciona segun tus preferencias. Deseas incluir:",
        choices: opciones,
      },
    ])
    .then((answers) => {
      let cantCaracteres = answers.cantCaracteres
      let base = "abcdegfhijklmnopqrstuvwxyz"

      for (let i = 0; i < answers.opciones.length; i++) {
        if (answers.opciones[i] == 'mayusculas') {
          let mayusculas = "ABCDEGFGHIJKLMNOPQRSTUVXYZ"
          base += mayusculas
        }

        if (answers.opciones[i] == 'numeros') {
          let numeros = "0123456789"
          base += numeros
        }

        if (answers.opciones[i] == 'simbolos') {
          let simbolos = "!@#$%^&*()_+-=[]{};:',<.>/?"
          base += simbolos
        }
      }

      clipboardy.writeSync(generarClave(base, cantCaracteres))
      console.log(chalk.bgGreen('Clave copiada al portapapeles !'))
    })
    .catch((error) => {
      console.error(chalk.bgRed('Ocurrio un error al generar la clave.'));
      return error
    });
}

generarBase()

// do{
//   generarBase()
// }while(abort = false)