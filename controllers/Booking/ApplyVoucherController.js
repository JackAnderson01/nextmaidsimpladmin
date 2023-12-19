import BookingEntity from "../../schema/booking/BookingSchema";
import VoucherEntity from "../../schema/feedback_rewards/VoucherSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

export default async function ApplyVoucherController(req, res) {
  try {
    await ValidateTokenController(req, res, "user");

    const { voucherId, bookingId } = req.body;

    const bookingExists = await BookingEntity.findOne({ _id: bookingId });

    if (bookingExists == null) {
      res.status(404).json({ success: false, error: "No such Booking found" });
    } else {
      const voucher = await VoucherEntity.findOne({ _id: voucherId });

      let newPrice = 0;
      if (voucher.discountPrice != 0) {
        newPrice = bookingExists.price - voucher.discountPrice;
      } else {
        newPrice =
          bookingExists.price - bookingExists.price * voucher.discountPercent;
      }

      const updateBooking = await BookingEntity.updateOne(
        { _id: bookingId },
        {
          price: newPrice,
          voucher,
        },
        {
          isPaymentDone: 0,
          areDetailsComplete: 0,
        }
      );

      res.status(200).json({ success: true, result: updateBooking });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}
