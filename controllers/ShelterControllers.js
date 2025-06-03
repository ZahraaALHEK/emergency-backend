 const User = require('../models/UserSchema');
 const Shelter = require('../models/ShelterSchema');
 exports.post = async (req,res) => {
    try {
        // using token 
         const userToken = req.user;
        const userName = req.user.name;
        
        const Sponsor = await User.findById(req.body["sponsorId"]);

        if(Sponsor != userToken){
             return res.status(404).json({"message" : "you are not authonticed"});
        }
        // req.user , protect midlware
        if(!Sponsor){
            return res.status(404).json({"message" : "Sponsor does not exist"});
        }
        
        //test dont allow user add shelter of status of pending
        const newShelter = await Shelter.create({
            sponsorId : req.body["sponsorId"],
            location : req.body["location"],
            City : req.body["City"],
            Region : req.body["Region"],
            numberOfPeople : req.body["numberOfPeople"],
            availabilityDate : req.body["availabilityDate"],
            facilitiesAvaliable : req.body["facilitiesAvaliable"],
            sponsorPrivateNumber : req.body["sponsorPrivateNumber"],
            sponsorName : req.body["sponsorName"],
            sponsorEmail : req.body["sponsorEmail"],
            mobileForSeekers : req.body["mobileForSeekers"]
        });
        if(!newShelter){
            return res.status(400).json({
  success: false,
  message: "Missing or invalid fields",
  data: null
})
        }
         return res.status(201).json({"success": true,
   "message": "Shelter add successfully","data" : newShelter});
         
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "success" : false ,
            "message" : error,
            "data" : null
        });
    }
 } ;

 exports.put = async (req , res) => {
    try {
        const userToken = req.user;
        
    
        var currentShelterID = req.param["id"] ;
        const oldShelter = await Shelter.findById(currentShelterID);
        const sponsor = await User.findById("sponsorId");
        if(sponsor != userToken){
             return res.status(404).json({"message" : "you are not authonticed"});
        }
        if(!sponsor) {
            return res.status(400).json({"success": false,
            "message": "Invalid or missing fields",
            "data": null});
        }
        
        oldShelter.sponsorId = req.body["sponsorId"];
        oldShelter.location = req.body["location"];
        oldShelter.address = req.body["address"];
        oldShelter.City = req.body["City"];
        oldShelter.Region = req.body["Region"];
        oldShelter.numberOfPeople = req.body["numberOfPeople"];
        oldShelter.availabilityDate = req.body["availabilityDate"];
        oldShelter.facilitiesAvailable = req.body["facilitiesAvailable"];
        oldShelter.sponsorPrivateNumber = req.body["sponsorPrivateNumber"];
        oldShelter.sponsorName = req.body["sponsorName"];
        oldShelter.sponsorEmail = req.body["sponsorEmail"];
        oldShelter.mobileForSeekers = req.body["mobileForSeekers"];

        await oldShelter.save();
        res.status(200).json({
            "success": true,
            "message": "Shelter updated successfully",
            "data": oldShelter
        });
        } catch (e) {
        console.error(e);
        res.status(500).json({"message" : e.message});
        
    }
 };
 exports.delete = async (params) => {
    
 }