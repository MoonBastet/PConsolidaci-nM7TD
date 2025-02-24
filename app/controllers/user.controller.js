const db = require("../models");
const User = db.users;
const Bootcamp = db.bootcamps;

// Crear usuarios
exports.createUser = (user) => {
  return User.create({
    name: user.name,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })
    .then((user) => {
      console.log(
        `>> Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`
      );
      return user;
    })
    .catch((err) => {
      console.log(`>> Error al crear el usuario ${err}`);
    });
};

// Obtener bootcamps de un usuario
exports.findUserById = (userId) => {
  return User.findByPk(userId, {
    include: [
      {
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["title", "description"],
        through: {
          attributes: [],
        },
      },
    ],
  })

    .then((user) => {
      if (!user) {
        return "El usuario consultado no existe";
      }

      return user;
    })
    .catch((err) => {
      console.log(`>> Error mientras se encontraba el usuario:${err}`);
    });
};

// Obtener todos los usuarios con sus bootcamps
exports.findAll = () => {
  return User.findAll({
    include: [
      {
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["title", "description"],
        through: { attributes: [] },
      },
    ],
  })
    .then((users) => {
      return users;
    })
    .catch((err) => {
      console.log(`>> Error mientras se encontraba los usuarios:${err}`);
    });
};

//Actualizar usuario por ID
exports.updateUserById = (_id, _firstName, _lastName, _email) => {
  let newData = { firstName: _firstName, lastName: _lastName, email: _email };

  return User.update(newData, {
    where: {
      id: _id,
    },
  })
    .then((response) => {
      console.log(response);
      console.log(">> Se ha modificado el user con id " + _id);
      response.close;
    })
    .catch((err) => {
      console.log(`>> Error al modificar el usuario:${err}`);
    });
};

//Eliminar usuario por ID
exports.deleteUserById = (_id) => {
  return User.destroy({
    where: {
      id: _id,
    },
  })
    .then((response) => {
      console.log(response);
      console.log(">> Se ha eliminado el user con id " + _id);
      response.close;
    })
    .catch((err) => {
      console.log(`>> Error al eliminar el usuario:${err}`);
    });
};