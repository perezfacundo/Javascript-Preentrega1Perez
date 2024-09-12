import inquirer from "inquirer"
import clipboardy from "clipboardy"
import chalk from "chalk"

let accion = ""
let parametros = [
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

const darBienvenida = () => {
  console.log("Bienvenido/a !")
}

const queAccionRealizar = () => {
  inquirer.prompt({
    'type': 'list',
    'name': 'accion',
    'message': "Que deseas hacer ?",
    'choices': ['Quiero generar una clave', 'Quiero validar una clave']
  })
    .then(answers => {
      return answers.accion
    })
}

const validarClave = () => {

}

const generarClave = (base, cantCaracteres) => {
  let clave = ""
  for (let i = 0; i < cantCaracteres; i++) {
    let random = Math.floor(Math.random() * base.length)
    clave += base.charAt(random)
  }
  return clave
}

const solicitarParametros = () => {
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
        name: "parametros",
        message: "Selecciona segun tus preferencias. Deseas incluir:",
        choices: parametros,
      },
    ])
    .then((answers) => {
      let cantCaracteres = answers.cantCaracteres
      let base = "abcdegfhijklmnopqrstuvwxyz"

      for (let i = 0; i < answers.parametros.length; i++) {
        if (answers.parametros[i] == 'mayusculas') {
          let mayusculas = "ABCDEGFGHIJKLMNOPQRSTUVXYZ"
          base += mayusculas
        }

        if (answers.parametros[i] == 'numeros') {
          let numeros = "0123456789"
          base += numeros
        }

        if (answers.parametros[i] == 'simbolos') {
          let simbolos = "!@#$%^&*()_+-=[]{};:',<.>/?"
          base += simbolos
        }
      }

      clipboardy.writeSync(generarClave(base, cantCaracteres))
      console.log(chalk.bgGreen('Clave copiada al portapapeles. Haz click derecho donde necesites pegarla y listo !'))
    })
    .catch((error) => {
      console.error(chalk.bgRed('Ocurrio un error al generar la clave.'));
      return error
    });
}

const preguntar = () => {
  inquirer.prompt({
    'type': 'confirm',
    'name': 'continuar',
    'message': 'Desea cerrar el programa ?'
  })
    .then(answers => {
      if (answers.continuar) {
        return false
      } else {
        return true
      }
    })
}

// Funcionamiento general
let abort = false
while (!abort) {
  darBienvenida()
  accion = queAccionRealizar()
  if (accion = 'Quiero generar una clave') {
    solicitarParametros()
  } else {
    validarClave()
  }
  abort = preguntar()
  console.log(abort)
}

