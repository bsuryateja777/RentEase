import { Router } from 'express';
import { createBooking, getUserBookings, getOwnerGuests, deleteBooking } from '../controllers/bookingController.js';

const router = Router();

router.post('/:id/booking', createBooking);
router.get('/my-bookings/:id', getUserBookings);
router.get('/my-guests/:id', getOwnerGuests);
router.delete('/delete-booking/:id', deleteBooking);

export default router;
