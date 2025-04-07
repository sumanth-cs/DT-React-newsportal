import NirvanKand from "../models/nirvanKand.model.js"
import { errorHandler } from "../utils/error.js"

// Get content
export const getContent = async (req, res) => {
    try {
        const content = await NirvanKand.findOne();

        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//update content
export const updateContent = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(
            errorHandler(403, "You are not authorized to update this post!")
        )
    }
    try {
        const { title, subtitle, shlokas } = req.body;
        const updatedContent = await NirvanKand.findByIdAndUpdate(
            req.params.id,
            { title, subtitle, shlokas },
            { new: true }
        );
        res.status(200).json(updatedContent);
    } catch (error) {
        next(error);
    }
};

