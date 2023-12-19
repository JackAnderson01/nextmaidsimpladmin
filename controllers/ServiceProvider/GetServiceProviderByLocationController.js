import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
import AvailabilityEntity from "../../schema/service_provider/AvailabilitySchema";
import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import BookingEntity from "../../schema/booking/BookingSchema";

const cityValidator = Joi.object({
  city: Joi.string().min(3).required(),
  bookingId: Joi.string().min(4).required(),
  page: Joi.number().integer().min(1),
  pageSize: Joi.number().integer().min(1),
});

export default async function GetServiceProviderByLocationController(req, res) {
  try {
    await ValidateTokenController(req, res, "user");

    const { city, page = 1, pageSize = 2, bookingId } = req.body;

    const { error } = await cityValidator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const bookingRecord = await BookingEntity.findOne({ _id: bookingId });
    const bookingTime = bookingRecord.time;
    const bookingDate = bookingRecord.date;

    // Ensure the `city` field is indexed case-insensitively
    await ServiceProviderEntity.createIndexes([{ city: 1 }, { city: "text" }]);

    // Use a prefix search with the $regex operator
    const cityRegex = createCityRegex(city.toLowerCase());

    const pipeline = [
      {
        $match: {
          isApproved: true,
          city: {
            $regex: cityRegex,
          },
        },
      },
      {
        $project: {
          documents: 0,
        },
      },
    ];

    const cleanerRecords = await ServiceProviderEntity.aggregate(pipeline);

    //TODO open tomorrow
    const availabilities = await AvailabilityEntity.find({
      email: { $in: cleanerRecords.map((cleaner) => cleaner.email) },
    });

    const filteredCleanerRecords = cleanerRecords.filter((cleaner) => {
      const cleanerEmail = cleaner.email;

      // Find the corresponding availability
      const matchedAvailability = availabilities.find(
        (availability) => availability.email === cleanerEmail
      );

      return matchedAvailability == null
        ? false
        : isInValidDateTimeRange(bookingTime, bookingDate, matchedAvailability);
    });

    if (filteredCleanerRecords.length > 0) {
      return res.status(200).json({
        success: true,
        result: filteredCleanerRecords,
      });
    } else {
      res.status(200).json({
        success: false,
        result: filteredCleanerRecords,
        message: "No results found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
}

function createCityRegex(cityName) {
  // Escape special characters in the city name
  const escapedCityName = cityName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Allow case-insensitive matching and optional variations
  const regexString = `^${escapedCityName}(?:\\s*(?:-|\\s*(?:city))?\\s*(east|west|north|south)?)?$`;

  return new RegExp(regexString, "i");
}

function convertTimeStringToDateTime(timeString) {
  const [time, meridiem] = timeString.split(" ");
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(
    meridiem === "PM" ? parseInt(hours, 10) + 12 : parseInt(hours, 10)
  );
  date.setMinutes(parseInt(minutes, 10));
  return date;
}

// Function to convert date string to Date object
function convertDateStringToDateTime(dateString) {
  const [month, day, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`);
}

function isInValidDateTimeRange(bookingTime, bookingDate, availability) {
  const bookingDateTime = convertTimeStringToDateTime(bookingTime);
  const timeFromDateTime = convertTimeStringToDateTime(availability.timeFrom);
  const timeTillDateTime = convertTimeStringToDateTime(availability.timeTill);

  // Convert bookingDate and dateFrom/dateTill to Date objects
  const bookingDateDateTime = convertDateStringToDateTime(bookingDate);
  const dateFromDateTime = convertDateStringToDateTime(availability.dateFrom);
  const dateTillDateTime = convertDateStringToDateTime(availability.dateTill);

  const validTimeRange =
    bookingDateTime >= timeFromDateTime && bookingDateTime <= timeTillDateTime;
  const validDateRange =
    bookingDateDateTime >= dateFromDateTime &&
    bookingDateDateTime <= dateTillDateTime;

  return validTimeRange && validDateRange;
}
