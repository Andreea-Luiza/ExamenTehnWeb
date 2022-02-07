const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

const Song=sequelize.define("Song",{
    id:{
        type: DataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true
    },
    titlu: {
        type: DataTypes.STRING,
        validate:{
            min: 5,
        }
      },
    
     url:{
        type: DataTypes.STRING,
        validate:{
            isUrl:true,
        }
        
     },
     stilMuzica:{
        type: DataTypes.STRING,
     },
     idPlaylist:{
        type: DataTypes.INTEGER,
     }
});

module.exports=Song;