const db = require('./app/models')
const userController = require('./app/controllers/user.controller')
const bootcampController = require('./app/controllers/bootcamp.controller')


const run = async() =>{

// Creando los 5 usuarios indicados:

    const user1 = await userController.createUser({
        firstName: 'Mateo',
        lastName: 'Díaz',
        email: 'mateo.diaz@correo.com'
    })

    const user2 = await userController.createUser({
        firstName: 'Santiago',
        lastName: 'Mejías',
        email: 'santiago.mejias@correo.com'
    })

    const user3 = await userController.createUser({
        firstName: 'Lucas',
        lastName: 'Rojas',
        email: 'lucas.rojas@correo.com'
    })

    const user4 = await userController.createUser({
        firstName: 'Facundo',
        lastName: 'Fernandez',
        email: 'facundo.fernandez@correo.com'
    })

// Creando los 3 bootcamp indicados:

    const bootcamp1 = await bootcampController.createBootcamp({
        title: 'Introduciendo El Bootcamp De React.',
        cue: 10,
        description: 'React es la librería más usada en JavaScript para el desarrollo de interfaces.'
    })

    const bootcamp2 = await bootcampController.createBootcamp({
        title: 'Bootcamp Desarrollo Web Full Stack.',
        cue: 12,
        description: 'Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.'
    })

    const bootcamp3 = await bootcampController.createBootcamp({
        title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning.',
        cue: 18,
        description: 'Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning.'
    })

// Agregando los users a los bootcamp


    //bootcamp 1
    await bootcampController.addUser(bootcamp1.id,user1.id)
    await bootcampController.addUser(bootcamp1.id,user2.id)

    //bootcamp 2
    await bootcampController.addUser(bootcamp2.id,user1.id)

    //bootcamp 3
    await bootcampController.addUser(bootcamp3.id,user1.id)
    await bootcampController.addUser(bootcamp3.id,user2.id)
    await bootcampController.addUser(bootcamp3.id,user3.id)


// Realizar las siguientes consultas:
// • Consultando el Bootcamp por id, incluyendo los usuarios.

    const query1 = await bootcampController.findById(bootcamp1.id);
    console.log("Bootcamp 1: ", JSON.stringify(query1,null,2));

// • Listar todos los Bootcamp con sus usuarios.

    const query2 = await bootcampController.findAll()
    console.log("Todos los Bootcamp: ", JSON.stringify(query2,null,2));

// • Consultar un usuario por id, incluyendo los Bootcamp.

    const query3 = await userController.findUserById(user2.id);
    console.log(`Usuario id ${user2.id}`, JSON.stringify(query3,null,2));

// • Listar los usuarios con sus Bootcamp.

    const query4 = await userController.findAll();
    console.log("Todos los Usuarios: ", JSON.stringify(query4,null,2));

// • Actualizar el usuario según su id; por ejemplo: actualizar el usuario con id=1 por Pedro Sánchez.

    const query5 = await userController.updateUserById(user1.id, "Pedro", "Sánchez");
    const usuarioModificado = await userController.findUserById(user1.id)
    console.log("Actualizar usuario: ", JSON.stringify(usuarioModificado,null,2));

// • Eliminar un usuario por id; por ejemplo: el usuario con id=1.

    const query6 = await userController.deleteUserById(user1.id)
    const usuarioEliminado = await userController.findUserById(user1.id)
    console.log("Usuario eliminado: ", JSON.stringify(usuarioEliminado,null,2));

}

db.sequelize.sync({
    force: true
}).then(()=>{
    console.log('Eliminando y resincronizando la base de datos');
    run()
})