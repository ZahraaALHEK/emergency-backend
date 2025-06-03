const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ShelterSchema = new Schema({
sponsorId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required : true ,


},
// persona : {
//     type : String ,
//     require : [true , " the persona of shelter is require"]
// },
location : {
    type : String ,
    enum : ["Point"],
    default : "Point",
    required : [true , "the location is require"] ,
    coordinates : {
    type : [Number],
    require : true
},

} ,
address : {
    type : String ,
    require : true
},
City : {
    type : String ,
    enum : ["Beirut",
    "Tripoli",
    "Sidon",
    "Tyre",
    "Byblos",
    "Jounieh",
    "Zahle",
    "Baalbek",
    "Nabatieh",
    "Aley",
    "Batroun",
    "Jbeil",
    "Zgharta",
    "Bint Jbeil",
    "Chouf",
    "Hermel",
    "Marjayoun",
    "Rashaya",
    "Jezzine",
    "Akkar",
    "Miniyeh-Danniyeh",
    "Bcharre",
    "Douma",
    "Amioun",
    "Baabda",
    "Bhamdoun",
    "Bekaa",
    "Anjar",
    "Barja",
    "Chekka",
    "Damour",
    "Dbayeh",
    "Deir el Qamar",
    "Faqra",
    "Hammana",
    "Harissa",
    "Kfarhim",
    "Kfardebian",
    "Nahr Ibrahim",
    "Qana",
    "Qornet Shehwan",
    "Rayfoun",
    "Saida",
    "Sour",
    "Zaarour"],
    required : true
}, 
Region : {
    type : String ,
    enum : ["Beirut",
    "Mount Lebanon",
    "North Lebanon",
    "South Lebanon",
    "Bekaa",
    "Nabatieh",
    "Akkar",
    "Baalbek-Hermel"],
    require : true
},
numberOfPeople : {
    type : Number ,
    require : true
},
availabilityDate : {
    type : Date ,
    require : true
},

facilitiesAvaliable:{
    type : [{
        type : String ,
        enum : ["Water",
"Food",
"Electricity",
"Internet",
"Heating",
"Medical aid"]
    }],
    require : true
},

sponsorPrivateNumber: {
    type: Number,
    required: true,
    validate : function (number) {
        const str = number.toString();
        const regex = /^\d{9}$/ ;
        return regex.test(str);

    },
    message : props => props.value + "is not a valid sponsor number! Must be 8 digits" ,
},
sponsorName : {
    type : String ,
    require : true
},
sponsorEmail  :{
    type : String ,
    require : true
},
mobileForSeekers :{
    type: Number,
    required: true,
    validate : function (number) {
        const str = number.toString();
        const regex = /^\d{8}$/ ;
        return regex.test(str);

    },
    message : props => props.value + "is not a valid sponsor number! Must be 8 digits" ,
}
// ,images : [{
//     type : String ,
//     require : [true , "images are require"],


// }],


    
},
{
    timestamps : true,
});
ShelterSchema.index({ location: '2dsphere' });
module.exports = mongoose.model("Shelter",ShelterSchema);
