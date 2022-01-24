import mongoose from 'mongoose';

console.log(process.env.MONGODB_URL);

export const dbConnect = () => mongoose.connect(process.env.MONGODB_URL!);
