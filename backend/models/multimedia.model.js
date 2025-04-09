import mongoose from 'mongoose';

const multimediaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    url: { type: String, required: true },
    type: { type: String, enum: ['youtube', 'reel'], required: true },
    thumbnail: { type: String, default: '' },
}, { timestamps: true });

const Multimedia = mongoose.model('Multimedia', multimediaSchema);

export default Multimedia;
