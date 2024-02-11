import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    comment:{
        type: String,
        //required: true
    },
    bookId:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    userImage:{
        type: String,
        required: true,
        default: "https://randomuser.me/api/portraits/lego/1.jpg"
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

export default mongoose.model("Comment", CommentSchema);