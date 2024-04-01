import mongoose from "mongoose";

//schema for File
const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
        trim: true,
    },
    path: String,
    mimetype: String,
    bucket: { type: mongoose.Schema.Types.ObjectId, ref: 'Buckets' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Files = mongoose.model("Files", fileSchema);
export default Files;