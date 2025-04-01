import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        authorName: {
            type: String,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: String,
            default: "uncategorized",
            required: true,
            index: true,
        },
        image: {
            type: String,
            default:
                "https://euaa.europa.eu/sites/default/files/styles/width_600px/public/default_images/news-default-big.png?itok=NNXAZZTc",
        },
        content: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
)

const Post = mongoose.model("Post", postSchema)

export default Post