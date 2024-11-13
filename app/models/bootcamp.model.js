module.exports = (sequelize, DataTypes) => {
  const Bootcamp = sequelize.define("bootcamp", {
    title: {
      type: DataTypes.STRING,
      validate:{
          notEmpty: {
              args: true,
              msg: "El campo no puede estar vacío"
          }
      }
    },
    cue: {
      type: DataTypes.INTEGER,
      validate:{
          notEmpty: {
              args: true,
              msg: "El campo no puede estar vacío"
          },
          isInt:{
              args: true,
              msh: "Debes ingresar un numero entero entre 5 y 20"
          },
          max: 20,
          min: 5
      }
    },
    description: {
      type: DataTypes.STRING,
      validate:{
          notEmpty: {
              args: true,
              msg: "El campo no puede estar vacío"
          }
      }
    }
  });

  return Bootcamp;
};
