import mongoose from "mongoose"

const NirvanKandSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  shlokas: [{ type: String }],
});

const NirvanKand = mongoose.model("NirvanKand", NirvanKandSchema);

export default NirvanKand;