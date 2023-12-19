import mongoose from "mongoose";

const connection = async () => {
  try{
    const connect = await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }
  catch(e){
    console.log("Database Connection Error: ", e.message)
  }
}

export default connection;