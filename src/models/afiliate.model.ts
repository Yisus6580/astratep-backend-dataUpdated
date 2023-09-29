import mongoose, { model, Model } from 'mongoose';
import { IAfiliate } from '../interfaces/afiliate';

const afiliateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    grade: { type: String, required: true },
    email: { type: String, required: false },
    numberPhone: { type: String, required: false },
    address: { type: String, required: false },
    imageUrl: {
      publicId: { type: String, require: false },
      url: { type: String, require: false },
    },
    jobAddress: { type: String, required: true },
    position: { type: String, required: true },
    antiquity: { type: String, required: true },
    state: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AfiliateModel: Model<IAfiliate> =
  mongoose.models.Afiliate || model('Afiliate', afiliateSchema);

export default AfiliateModel;
