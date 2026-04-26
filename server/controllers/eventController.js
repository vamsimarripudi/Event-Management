const {Event} = require("../models/Event");


const getAllEvents = async (req,res) => {
    try{
        const events = await Event.find();
        res.json(events);
        
    }
    catch(error){
        res.status(500).json({message:error.message})
    }   
}

const getEventById = async (req,res) => {
    try{
        const event = await Event.findById(req.params.id);
        if(!event){
            return res.status(404).json({message:"Event not found"})
        }
        res.json(event);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }   
}


const searchEvents = async (req,res) => {
    const {query} = req.query;
    try{
        const events = await Event.find({$or:[
            {name:{$regex:query, $options:"i"}},
            {category:{$regex:query, $options:"i"}},
            {location:{$regex:query, $options:"i"}}
        ]});
        res.json(events);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}



module.exports = {getAllEvents, getEventById, searchEvents};

