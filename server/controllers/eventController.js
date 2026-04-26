const {Event} = require("../models/Event");


    // GET /events?page=1&search=optional
const getAllEvents = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = 10;
    const skip = (page - 1) * limit;

    const { search = "" } = req.query;

    let filter = {};
    if (search.trim()) {
      const regex = new RegExp(search, "i");
      filter = {
        $or: [
          { name: regex },
          { organizer: regex },
          { category: regex },
          { "location.city": regex },
          { "location.state": regex },
          { tags: regex }
        ]
      };
    }

    // total count for pagination
    const total = await Event.countDocuments(filter);

    // IMPORTANT: stable sort for consistent paging
    const events = await Event.find(filter)
      .sort({ "dateTime.start": 1, _id: 1 })
      .skip(skip)
      .limit(limit);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
      data: events
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};   


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

