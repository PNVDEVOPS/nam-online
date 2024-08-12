import mongoose, { Schema } from 'mongoose';

const MenuItemSchema = new Schema({
    name: { type: String, required: true },
    categories: { type: Schema.Types.ObjectId, ref: 'MenuCategory' },
    description: { type: String },
    price: { type: Number, required: true },
    weight: { type: Number }, 
    image: { type: String }, 
});

export default mongoose.model('MenuItem', MenuItemSchema);