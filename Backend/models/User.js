import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatarUrl: String,
    role: {
        type: String,
        enum: ["user", "admin"], // Определяем возможные значения для роли
        default: "user", // Значение по умолчанию
      },
}, 
{
    timestamps: true,
},

);



export default mongoose.model('User', UserSchema)