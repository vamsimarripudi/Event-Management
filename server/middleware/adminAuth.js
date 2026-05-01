const adminAuth = (req,res,next) => {
    const key = req.headers["x-admin-key"]

    if(!key){
        return res.status(401).json({message: "Missing admin key."})

    }

    if(key !== process.env.ADMIN_KEY){
        return res.status(403).json({message: "Invalid admin key."})

    }

    next()

}
module.exports = adminAuth;