import mongoose from "mongoose";

const BookSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    year_published:{
        type: Number,
        required: true
    },
    imageUrl:{
        type: String,
        required: false,
        default: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.P-nIodv7WzkQ4wYYPsXWaQAAAA%26pid%3DApi&f=1&ipt=5f877b9f0be93f5eaeb93b2edeca8109f41b702002a3c45bf481c76a7c7e5c68&ipo=images"
    },
    description:{
        type: String,
        required: true
    },
    publisher:{
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    like: {
        type: Boolean
    },
    ownersOfLike: {
        type: Array
    },
    countLikes: {
        type: Number
    },
    ownerId:{
        type: String,
        required: true
    }
    
},
{
    timestamps: true
}
)

export default mongoose.model("Book", BookSchema);