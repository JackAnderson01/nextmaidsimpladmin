import BookingEntity from "../../schema/booking/BookingSchema";
import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import scheduleBooking from "./SubscriptionSchedulerController";
import VoucherEntity from "../../schema/feedback_rewards/VoucherSchema";
import createBookingPrice from "./createBookingPrice";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";
// import { trackReferrers } from "../Voucher/getReferCodeByEmailController";

const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;
const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;

const bookingValidator = Joi.object({
  id: Joi.string().allow(null).min(3).required(),
  servicetype: Joi.string().allow(null).valid("deep", "base").required(),
  rooms: Joi.array()
    .items(
      Joi.object({
        roomName: Joi.string()
          .valid(
            "bedroom",
            "bathroom",
            "kitchen",
            "livingroom",
            "half-bathroom"
          )
          .required(),
        quantity: Joi.number().required().allow(null),
      })
    )
    .allow(null)
    .required(),
  extras: Joi.array()
    .items(
      Joi.string().valid(
        "oven",
        "windows",
        "fridge",
        "cabinets",
        "organizing",
        "dishwasher",
        "garage",
        "blinds",
        "microwave"
      )
    )
    .allow(null)
    .required(),
  date: Joi.string().regex(dateRegex).required().allow(null),
  time: Joi.string().required().allow(null),
  howoften: Joi.string()
    .allow(null)
    .valid("onetime", "weekly", "biweekly", "monthly")
    .required(),
  name: Joi.string().allow(null).required(),
  preferredName: Joi.string().allow(null).required(),
  userEmail: Joi.string().email().required(),
  serviceProviderEmail: Joi.string().email().allow(null),
  contact: Joi.string().allow(null).required(),
  country: Joi.string().allow(null).required(),
  state: Joi.string().allow(null).required(),
  city: Joi.string().allow(null).required(),
  zipcode: Joi.string().allow(null).required(),
  comments: Joi.string().allow(null).max(300).required(),
  serviceProvidersArray: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        accepted: Joi.boolean().required(),
      })
    )
    .allow(null)
    .required(),
  location: Joi.string().allow(null).max(100).required(),
  latitude: Joi.number().allow(null).required(),
  longitude: Joi.number().allow(null).required(),
  voucherId: Joi.string().allow(null),
});

export default async function PostBookingController(req, res) {
  try {
    await ValidateTokenController(req, res, "user");

    const {
      id,
      servicetype,
      rooms,
      extras,
      date,
      time,
      howoften,
      name,
      preferredName,
      userEmail,
      contact,
      city,
      state,
      country,
      zipcode,
      comments,
      location,
      latitude,
      longitude,
      serviceProvidersArray,
      voucherId,
    } = req.body;

    const { error } = bookingValidator.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    if (date != null && time != null && !FutureDateValidator(date, time)) {
      return res.status(400).json({
        success: false,
        error: "Booking has to be made 36 hours ahead.",
      });
    }

    var bookingExists =
      id != null
        ? await BookingEntity.findOne(
            { _id: id },
            { areDetailsComplete: 0, isPaymentDone: 0 }
          )
        : null;

    const finalTimeRequired = calculateTime(
      servicetype
      // , rooms, extras
    );
    const voucher = await VoucherEntity.findOne({ _id: voucherId });

    const finalPrice = await createBookingPrice(
      null,
      servicetype,
      rooms,
      extras,
      howoften,
      voucher != null
        ? voucher
        : bookingExists == null
        ? null
        : bookingExists.voucher
    );

    // const finalPrice = calculatePrice(
    //   servicetype,
    //   rooms,
    //   extras,
    //   howoften,
    //   voucher != null
    //     ? voucher
    //     : bookingExists == null
    //     ? null
    //     : bookingExists.voucher
    // );

    if (bookingExists == null) {
      const bookingDetails = new BookingEntity({
        servicetype,
        rooms,
        extras,
        date,
        time,
        howoften,
        name,
        preferredName,
        userEmail,
        serviceProviderEmail: null,
        contact,
        country,
        state,
        city,
        zipcode,
        comments,
        progress: "pending",
        status: "booking-confirmed",
        serviceProvidersArray,
        voucherId,
        price: Math.round(finalPrice),
        location,
        latitude,
        longitude,
        timeRequired: (finalTimeRequired / 60).toFixed(2),
        voucher: voucher,
        // areDetailsComplete: false,
      });

      const savedBooking = await bookingDetails.save();

      if (
        savedBooking !== null &&
        savedBooking.servicetype !== null &&
        savedBooking.rooms !== null &&
        savedBooking.extras !== null &&
        // savedBooking.date !== null &&
        // savedBooking.time !== null &&
        savedBooking.howoften !== null &&
        savedBooking.name !== null &&
        savedBooking.preferredName !== null &&
        savedBooking.userEmail !== null &&
        savedBooking.contact !== null &&
        savedBooking.country !== null &&
        savedBooking.state !== null &&
        savedBooking.city !== null &&
        savedBooking.zipcode !== null &&
        savedBooking.serviceProvidersArray !== null &&
        savedBooking.serviceProvidersArray.length !== 0 &&
        savedBooking.price !== null &&
        savedBooking.location !== null &&
        savedBooking.latitude !== null &&
        savedBooking.longitude !== null
      ) {
        //TODO: Move this to stripe payment
        if (savedBooking.howoften !== "onetime") {
          var interval = 7;
          if (savedBooking.howoften === "biweekly") {
            interval = 14;
          } else if (savedBooking.howoften === "monthly") {
            interval = 30;
          }

          await scheduleBooking(
            savedBooking.userEmail,
            interval,
            savedBooking._id
          );
        }

        checkIfCleanerAccepted(savedBooking);
      }

      const projectedSavedBooking = await BookingEntity.findOne(
        { _id: savedBooking._id },
        { areDetailsComplete: 0, isPaymentDone: 0 }
      );

      res.status(201).json({ success: true, result: projectedSavedBooking });
    } else {
      if (
        bookingExists.serviceProviderEmail != null ||
        bookingExists.progress === "confirmed"
      ) {
        return res.status(200).json({
          success: false,
          error: "Can't update booking after booking is accepted by cleaner.",
        });
      }

      const finalPrice = await createBookingPrice(
        id,
        servicetype ?? bookingExists.servicetype,
        rooms == null
          ? bookingExists.rooms
          : rooms.length == 0
          ? bookingExists.rooms
          : rooms,
        extras == null
          ? bookingExists.extras
          : extras.length == 0
          ? bookingExists.extras
          : extras,
        howoften ?? bookingExists.howoften,
        voucher != null
          ? voucher
          : bookingExists == null
          ? null
          : bookingExists.voucher
      );

      // const finalPrice = calculatePrice(
      //   servicetype ?? bookingExists.servicetype,
      //   rooms == null
      //     ? bookingExists.rooms
      //     : rooms.length == 0
      //     ? bookingExists.rooms
      //     : rooms,
      //   extras == null
      //     ? bookingExists.extras
      //     : extras.length == 0
      //     ? bookingExists.extras
      //     : extras,
      //   howoften ?? bookingExists.howoften,
      //   voucher != null
      //     ? voucher
      //     : bookingExists == null
      //     ? null
      //     : bookingExists.voucher
      // );

      const finalTimeRequired = calculateTime(
        servicetype ?? bookingExists.servicetype
        // rooms == null
        //   ? bookingExists.rooms
        //   : rooms.length == 0
        //   ? bookingExists.rooms
        //   : rooms,
        // extras == null
        //   ? bookingExists.extras
        //   : extras.length == 0
        //   ? bookingExists.extras
        //   : extras
      );

      const updateUser = await BookingEntity.updateOne(
        { _id: id },
        {
          servicetype: servicetype ?? bookingExists.servicetype,
          rooms:
            rooms == null
              ? bookingExists.rooms
              : rooms.length == 0
              ? bookingExists.rooms
              : rooms,
          extras:
            extras == null
              ? bookingExists.extras
              : extras.length == 0
              ? bookingExists.extras
              : extras,
          date: date ?? bookingExists.date,
          time: time ?? bookingExists.time,
          howoften: howoften ?? bookingExists.howoften,
          name: name ?? bookingExists.name,
          preferredName: preferredName ?? bookingExists.preferredName,
          userEmail: userEmail ?? bookingExists.userEmail,
          serviceProviderEmail: null,
          contact: contact ?? bookingExists.contact,
          country: country ?? bookingExists.country,
          state: state ?? bookingExists.state,
          city: city ?? bookingExists.city,
          zipcode: zipcode ?? bookingExists.zipcode,
          comments: comments ?? bookingExists.comments,
          progress: "pending",
          status: "booking-confirmed" ?? bookingExists.status,
          serviceProvidersArray:
            serviceProvidersArray == null
              ? bookingExists.serviceProvidersArray
              : serviceProvidersArray.length == 0
              ? bookingExists.serviceProvidersArray
              : serviceProvidersArray,
          price: Math.round(finalPrice),
          timeRequired: (finalTimeRequired / 60).toFixed(2),
          location: location ?? bookingExists.location,
          latitude: latitude ?? bookingExists.latitude,
          longitude: longitude ?? bookingExists.longitude,
          voucher: voucher ?? bookingExists.voucher,
          // areDetailsComplete: //Chcek if details are complete
        },
        { areDetailsComplete: 0, isPaymentDone: 0 }
      );

      const updatedBooking = await BookingEntity.findOne(
        { _id: id },
        { areDetailsComplete: 0, isPaymentDone: 0 }
      );

      if (
        updatedBooking != null &&
        updatedBooking.servicetype !== null &&
        updatedBooking.rooms !== null &&
        updatedBooking.extras !== null &&
        updatedBooking.date !== null &&
        updatedBooking.time !== null &&
        updatedBooking.howoften !== null &&
        updatedBooking.name !== null &&
        updatedBooking.preferredName !== null &&
        updatedBooking.userEmail !== null &&
        updatedBooking.contact !== null &&
        updatedBooking.country !== null &&
        updatedBooking.state !== null &&
        updatedBooking.city !== null &&
        updatedBooking.zipcode !== null &&
        updatedBooking.serviceProvidersArray !== null &&
        updatedBooking.serviceProvidersArray.length !== 0 &&
        updatedBooking.price !== null &&
        updatedBooking.location !== null &&
        updatedBooking.latitude !== null &&
        updatedBooking.longitude !== null
      ) {
        //TODO: Move this to stripe payment
        if (updatedBooking.howoften !== "onetime") {
          var interval = 7;
          if (updatedBooking.howoften === "biweekly") {
            interval = 14;
          } else if (updatedBooking.howoften === "monthly") {
            interval = 30;
          }

          await scheduleBooking(updatedBooking.userEmail, interval, id);
        }

        checkIfCleanerAccepted(updatedBooking);
      }

      //To maintain the wallet of service provider
      // if (progress === "completed") {
      //   if (serviceProviderEmail != null) {
      //     const walletRecord = await WalletEntity.findOne({
      //       email: serviceProviderEmail,
      //     });

      //     await WalletEntity.findOneAndUpdate(
      //       { email: serviceProviderEmail },
      //       { balance: walletRecord.balance + price }
      //     );
      //   }

      //   trackReferrers(userEmail);
      // }

      res.status(200).json({ success: true, result: updatedBooking });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
}

const checkIfCleanerAccepted = async (booking) => {
  // Set a timer to check the field again in 10 minutes.
  setTimeout(async () => {
    const newValue = booking.serviceProviderEmail;

    if (newValue === null) {
      booking.progress = "not accepted";

      await booking.save();

      sendNotificationsByEmail(
        "MaidSimpl",
        "Booking not accepted by any cleaner",
        booking.userEmail
      );
    }
  }, 12 * 60 * 60 * 1000);
};

const calculateTime = (servicetype) => {
  let time = 0;
  if (servicetype != null) {
    time += servicetype === "base" ? 120 : 180;
  }

  return time;
};

function FutureDateValidator(scheduledDate, scheduledTime) {
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;
  const timeRegex = /^([1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)$/;

  const isValidDate = dateRegex.test(scheduledDate);
  const isValidTime = timeRegex.test(scheduledTime);

  if (!isValidDate || !isValidTime) {
    return false;
  }

  const [month, day, year] = scheduledDate.split("/");
  const [hour, minute, period] = scheduledTime.split(/:| /);

  const scheduledDateTime = new Date(
    year,
    month - 1,
    day,
    period.toLowerCase() === "pm" ? +hour + 12 : +hour,
    +minute
  );

  const timeDifferenceInMilliseconds = scheduledDateTime - Date.now();
  const timeDifferenceInHours =
    timeDifferenceInMilliseconds / (1000 * 60 * 60 * 1);

  console.log(timeDifferenceInHours);
  return timeDifferenceInHours >= 36;
}
