const express = require('express')
const sequelize = require('./sequelize')
const {Op}=require("sequelize");


const Playlist=require('./models/Playlist');
const Song=require('./models/Song');

Playlist.hasMany(Song, {foreignKey: "idPlaylist", sourceKey: "id" });
Song.belongsTo(Playlist, {foreignKey: "idPlaylist", targetKey: "id"});



const app = express()

const port = 8080;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use("/api",require("./routes/playlists"));
app.use("/api",require("./routes/selectedPlaylist"));
app.use("/api",require("./routes/songs"));
app.use("/api",require("./routes/selectedSong"));


app.get('/export', async (req, res, next) => {
    try{
      const result = [];
      for(let m of await Playlist.findAll()){
        const playlist = {
          id: m.id,
          descriere: m.descriere,
          dataCreare: m.dataCreare,
          songs: []
        };
        for(let c of await m.getSongs()){
            playlist.songs.push({
            id: c.id,
            titlu: c.titlu,
            url: c.url,
            stilMuzica: c.stilMuzica,
          });
      }
      result.push(playlist);
    }
      if(result.length > 0){
        res.json(result);
      }else{
        res.sendStatus(204);
      }
    } 
    catch (err) {
      next(err);
    }
  });



  app.get("/paginare", async (req, res) => {
    try{
  
    const query={}
  
    const page=req.query.page
    const limit=req.query.limit
  
    const startIndex=(page -1)* limit 
    const endIndex=page*limit
  
    const playlist=await Playlist.findAll(query);
    const finalPlaylist=playlist.slice(startIndex, endIndex)
   
    return res.status(200).json(finalPlaylist);
    }
    catch(err){
        return res.status(500).json(err);
    }
  })

app.listen(port, async () => {
    console.log("Server started on http://localhost:8080");
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully");
    } catch (err) {
      console.error("Unable to connect to the database:", err);
    }
  });