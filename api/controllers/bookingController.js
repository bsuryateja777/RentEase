import UserBookings from '../models/UserBookings.js';

export const createBooking = async (req, res) => {
  const { place, user, userBookingDetails } = req.body;

  const booking = await UserBookings.create({
    place: place._id,
    owner: place.owner._id,
    guest: user._id,
    fromDate: userBookingDetails.fromDate,
    toDate: userBookingDetails.toDate,
    purpose: userBookingDetails.purpose,
    price:userBookingDetails.price,
  });

  res.status(201).json({ message: 'Booking created', booking });
};

export const getUserBookings = async (req, res) => {
  const bookings = await UserBookings.find({ guest: req.params.id })
    .populate('place')
    .populate('owner');

  res.json(bookings);
};

export const getOwnerGuests = async (req, res) => {
  const bookings = await UserBookings.find({ owner: req.params.id })
    .populate('place')
    .populate('guest');

  res.json(bookings);
};

export const deleteBooking = async (req, res) => {
  await UserBookings.findByIdAndDelete(req.params.id);
  res.json({ message: 'Booking deleted' });
};
