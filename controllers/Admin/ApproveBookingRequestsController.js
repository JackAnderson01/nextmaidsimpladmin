// import Joi from "@hapi/joi";
// import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
// import BookingEntity from "../../schema/BookingSchema";
// import scheduleBooking from "../Booking/SubscriptionSchedulerController";

// const adminValidator = Joi.object({
//   bookingId: Joi.string().min(3).required(),
//   isApproved: Joi.boolean().required(),
// });

// export default async function ApproveBookingController(req, res) {
//   try {
//     ValidateTokenController(req, res, "admin");

//     const { bookingId, isApproved } = req.body;
//     const { error } = adminValidator.validate(req.body);

//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     const existingBooking = await BookingEntity.findOne({
//       _id: bookingId,
//     });

//     if (existingBooking) {
//       const updatedBooking = await BookingEntity.findOneAndUpdate(
//         { _id: bookingId },
//         {
//           isApproved: isApproved,
//         },
//         { new: true }
//       );

//       if (!updatedBooking) {
//         return res
//           .status(404)
//           .json({ success: false, error: "Booking not found" });
//       }

//       if (isApproved == true) {
//         if (existingBooking.howoften !== "onetime") {
//           var interval = 7;
//           if (existingBooking.howoften === "biweekly") {
//             interval = 14;
//           } else if (existingBooking.howoften === "monthly") {
//             interval = 30;
//           }

//           await scheduleBooking(existingBooking.userEmail, interval, bookingId);
//         }

//         checkIfCleanerAccepted(existingBooking);
//       }

//       return res.status(200).json({ success: true, result: updatedBooking });
//     }

//     return res
//       .status(400)
//       .json({ success: false, error: "Booking not updated" });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// }

// const checkIfCleanerAccepted = async (booking) => {
//   // Set a timer to check the field again in 10 minutes.
//   setTimeout(async () => {
//     const newValue = booking.serviceProviderEmail;

//     if (newValue === null) {
//       booking.progress = "not accepted";

//       await booking.save();
//     }
//   }, 8 * 60 * 60 * 1000);
// };
