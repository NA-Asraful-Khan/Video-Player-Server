const mongoose= require ('mongoose')

exports.dbConnection = async()=>{
    mongoose.set('strictQuery',true)
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('DB connected')
    }).catch((err)=>{
        console.log(err)
    })
    
}

