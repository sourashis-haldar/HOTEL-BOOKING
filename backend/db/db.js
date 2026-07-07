import mongoose from "mongoose"

const ConectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}/hotel-booking`);
    console.log("Data Base Connected Successfully ")
  } catch (error) {
    console.log("databse error", error);
  }
}

export default ConectDB;


