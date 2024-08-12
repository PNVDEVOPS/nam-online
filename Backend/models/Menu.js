import mongoose from 'mongoose';

const { Schema } = mongoose; 

const MenuSchema = new mongoose.Schema({
    cafe: { type: Schema.Types.ObjectId, ref: 'Cafe', unique: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }]
  });
  

export default mongoose.model('Menu', MenuSchema);