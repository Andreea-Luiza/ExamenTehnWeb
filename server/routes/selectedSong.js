const Playlist=require("../models/Playlist");
const Song=require("../models/Song");

const selectedSongRouter=require("express").Router();


selectedSongRouter
    .route("/playlists/:idPlaylist/songs/:idSong")
    .get(async(req,res)=>{
        try{
            const playlist = await Playlist.findByPk(req.params.idPlaylist);
            if(playlist){
                const song = await Song.findAll({
                    where:{
                        idPlaylist: playlist.id,
                        id: req.params.idSong
                    }
                })

                return res.status(200).json(song);
            }
            else{
                res.status(405).send({ message: err.message });

            }
        }
        catch(err){
            return res.status(500).json(err);
        }

    })
    .put(async(req, res)=>{
        try{
            const playlist=await Playlist.findByPk(req.params.idPlaylist);
            if(playlist){

                const song=await Song.findAll({
                    where: {
                        idPlaylist:playlist.id,
                        id:req.params.idSong
                    }
                })

                const updatedSong=await Song.update({
                    titlu: req.body.titlu,
                    url: req.body.url,
                    stilMuzica: req.body.stilMuzica,
                    idPlaylist:playlist.id
                },{ where:{
                    id: req.params.idSong
                }
                })

                return res.status(200).json({error:`The song with id ${req.params.idSong} has been updated`});

            }
            else{
                res.status(405).send({ message: err.message });

            }
        }
        catch(err){
            res.status(405).send({ message: err.message });
        }
    })
    .delete(async (req,res) => {
        try{

            const playlist=await Playlist.findByPk(req.params.idPlaylist);
            if(playlist){
                const song=await Song.destroy({
                    where:{
                        idPlaylist: playlist.id,
                        id:req.params.idSong
                    }
                })

                return res.status(200).json({ error: `Song with id ${req.params.idSong} has been deleted` });

            }
            else{
                res.status(404).send({ message: err.message });

            }
        }
        catch(err){
            res.status(404).send({ message: err.message });

        }
    })


module.exports = selectedSongRouter;