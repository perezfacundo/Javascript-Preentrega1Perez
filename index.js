import inquirer from 'inquirer';

let generar = true

// Proceso general
do {
    const clave = generarClave()
    generar = preguntarNuevaClave()
}while(generar === true)

// Funcion general
function generarClave() {

    let opciones = [
        {
            'name':'mayusculas',
            'value':'mayusculas'
        },
        {
            'name':'numeros',
            'value':'numeros'
        },
        {
            'name':'simbolos',
            'value':'simbolos'
        },
    ]

    inquirer.prompt([
        {
            'type': "number",
            'name': "cantCaracteres",
            'message': "Cuantos caracteres deseas que tengas tu clave? min10 / max20",
            'default': 10,
            'validate': function(value) {
                const valid = !isNaN(value) && value >= 7 && value <= 25
                return valid || 'Por favor, ingresa un numero entre 7 y 25'
            }
        },
        {
            'type': 'checkbox',
            'name': 'opciones',
            'message': "Selecciona segun tus preferencias. Deseas incluir:",
            'choices': opciones
        }
    ])
    .then(answers => {
        console.log(answers)

        // GENERACION DE LA CLAVE

        return clave   
    })
    .catch(error => {
        console.error(error)
    })
}

// Funcion complementaria
function preguntarNuevaClave() {
    let confirm = false
    inquirer.prompt({
        'type': 'confirm',
        'name': 'nuevaClave',
        'message': "Desea generar una nueva clave ?",
    })

    // devolver true o false
}