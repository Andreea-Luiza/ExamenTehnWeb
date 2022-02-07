const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

const Playlist=sequelize.define("Playlist",{
    id:{
        type: DataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true
    },
        descriere: {
            type: DataTypes.STRING,
            validate:{
                min: 3,
            }
          },
         dataCreare:{
             type: DataTypes.DATE,
         }
    
    });
    
    
    module.exports=Playlist;