// import Joi from "@hapi/joi";
// import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
// import BookingEntity from "../../schema/BookingSchema";

// const validator = Joi.object({
//   bookingId: Joi.string().min(3).required(),
//   email: Joi.string().email().required(),
// });

// export default async function CancelBookingByUserController(req, res) {
//   try {
//     ValidateTokenController(req, res, "user");

//     const { bookingId, email } = req.body;

//     const { error } = await validator.validateAsync(req.body);

//     if (error) {
//       return res
//         .status(400)
//         .send({ sucess: false, error: error.details[0].message });
//     }

//     const existingBooking = await BookingEntity.findOne({
//       _id: bookingId,
//       userEmail: email,
//     });

//     if (existingBooking != null) {
//       if (existingBooking.status === "cancelled") {
//         return res.status(200).send({
//           sucess: true,
//           error: "Booking already cancelled",
//         });
//       }

//       if (existingBooking.progress === "completed") {
//         return res.status(200).send({
//           sucess: false,
//           error: "Cannot cancel a booking that is completed.",
//         });
//       }

//       const updatedBooking = await BookingEntity.findOneAndUpdate(
//         { _id: bookingId, userEmail: email },
//         {
//           progress: "completed",
//           status: "cancelled",
//         }
//       );

//       return res.status(200).send({ sucess: true, result: updatedBooking });
//     }

//     return res
//       .status(404)
//       .json({ success: false, result: null, message: "No such booking found" });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err });
//   }
// }
