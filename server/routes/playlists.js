const Playlist = require("../models/Playlist");
const {Op}=require("sequelize");

const PlaylistRouter=require("express").Router();

PlaylistRouter
    .route("/playlists")
    .get(async (req, res) => {
        try{
        // filtrarea in functie de doua campuri
        const query={}
        const allowedFilters = ['descriere', 'createdAt']
        const filterKeys=Object.keys(req.query).filter(e=>allowedFilters.indexOf(e)!== -1)
        if(filterKeys.length > 0){
            query.where={}
            for(const key of filterKeys){
                query.where[key]={
                    [Op.like]: `%${req.query[key]}%`
                }
            }

        }

        // sortarea 

        const sortField=req.query.sortField
        let sortOrder='ASC'
        if(req.query.sortOrder && req.query.sortOrder === '-1'){
            sortOrder='DESC'
        }

        if(sortField){
            query.order=[[sortField,sortOrder]]
        }


        
        const playlists=await Playlist.findAll(query);
        playlists.dataCreare=playlists.createdAt;
        return res.status(200).json(playlists);
        }
        catch(err){
            return res.status(500).json(err);
        }
    })
    .post(async (req, res) => {
        try{
            const newPlaylist=await Playlist.create(req.body);
            return res.status(200).json(newPlaylist);
        }catch(err){
            return res.status(500).json(err);
        }
    })




    module.exports=PlaylistRouter;