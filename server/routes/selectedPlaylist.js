const Playlist=require("../models/Playlist");

const selectedPlaylist=require("express").Router();

selectedPlaylist
    .route("/playlists/:id")
    .get(async(req,res) => {
        try{
         
            const playlist=await Playlist.findAll(
                {
                    where:{
                        id:req.params.id
                          }
                })
            return res.status(200).json(playlist);

            }
            catch(err){
                return res.status(500).json(err);
            }
    })
    .put(async(req,res) => {
        try{
            
            const playlist=await Playlist.findAll({
                where:
                {
                    id: req.params.id,

                }
            })

            const updatedPlaylist=await Playlist.update({
                descriere:req.body.descriere,
                dataCreare:req.body.dataCreare
            },{
                where:{
                    id:req.params.id
                }
            })

            return res.status(200).json({error:`The playlist with id ${req.params.id} has been updated`}); 
            
        }
        catch(err){
            res.status(405).send({ message: err.message });
        }
    })
    .delete(async (req,res)=>{
        try{
            await Playlist.destroy({
                where:{
                    id: req.params.id,
                }
            });

            return res
          .status(404)
          .json({
            error: `The playlist with id ${req.params.id} has been deleted`,
          });
        }
        catch (err) {
            res.status(405).send({ message: err.message });
          }
    })



module.exports =selectedPlaylist;