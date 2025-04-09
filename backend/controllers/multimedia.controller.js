import Multimedia from '../models/multimedia.model.js';

export const getMultimedia = async (req, res) => {
    try {
        const media = await Multimedia.find().sort('-createdAt');
        res.json(media);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addMultimedia = async (req, res) => {
    try {
        const { title, description, url, type } = req.body;
        const newMedia = await Multimedia.create({ title, description, url, type });
        res.status(201).json(newMedia);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteMultimedia = async (req, res) => {
    try {
        // The auth middleware should have already verified the user is an admin
        // But we can double check here
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Unauthorized - Admin access required' });
        }

        const deletedItem = await Multimedia.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Multimedia item not found' });
        }
        res.json({ message: 'Multimedia item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};