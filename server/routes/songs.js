const Playlist=require("../models/Playlist");
const Song=require("../models/Song");

const songRouter=require("express").Router();

songRouter
    .route("/playlists/:idPlaylist/songs")
    .get(async(req,res)=>{
        try{
            const playlist=await Playlist.findAll({
                where:{
                    id: req.params.idPlaylist
                }
            })

            if(playlist){
                const song =await Song.findAll({
                    where:{
                        idPlaylist:req.params.idPlaylist
                    }
                })

                return res.status(200).json(song);
            }
        }
        catch(err){
            res.status(405).send({ message: err.message });
        }
    })
    .post(async(req, res) => {
        try{

            const playlist=await Playlist.findByPk(req.params.idPlaylist);
            if(playlist){
                const newSong=await Song.create({ 
                    titlu:req.body.titlu,
                    url: req.body.url,
                    stilMuzica:req.body.stilMuzica,
                    idPlaylist:playlist.id
                })
                return res.status(200).json(newSong);
            }
        }
        catch(err){
            return res.status(500).json(err);
        }
    })


module.exports = songRouter;