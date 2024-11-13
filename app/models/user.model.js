module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    firstName: {
      type: DataTypes.STRING,
      validate:{
          notEmpty: {
              args: true,
              msg: "El campo no puede estar vacío"
          }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate:{
          notEmpty: {
              args: true,
              msg: "El campo no puede estar vacío"
          }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate:{
          notEmpty: {
              args: true,
              msg: "El campo no puede estar vacío"
          },
          isEmail:{
              args: true,
              msg: 'El formato de correo es inválido'
          }
      },
      unique: {
          args: true,
          msg: 'El correo ingresado ya se encuentra registrado en la base de datos'
      }
    }
  });

  return User;
};