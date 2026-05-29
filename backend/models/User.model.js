import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  username:{
tyep:String
  },
  email: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "hotelOwner"],
    default: "user"
  },
  recentSearchedCities: [
    {
      type: String
    }
  ]
}, { timestamps: true })


const User = mongoose.model("User", userSchema);
export default User;