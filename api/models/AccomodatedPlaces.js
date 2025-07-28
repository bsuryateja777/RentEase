import mongoose from 'mongoose';

const accomodatedPlacesSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  pricep1N: Number,
  pricep2N: Number,
});

const AccomodatedPlaces = mongoose.model('AccomodatedPlaces', accomodatedPlacesSchema);

export default AccomodatedPlaces;
