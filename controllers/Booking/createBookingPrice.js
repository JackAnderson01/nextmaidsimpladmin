import ExtraEntity from "../../schema/Price/ExtraSchema";
import RoomEntity from "../../schema/Price/RoomSchema";
import ServiceTypeEntity from "../../schema/Price/ServiceTypeSchema";
import BookingEntity from "../../schema/booking/BookingSchema";

const createBookingPrice = async (
  bookingId,
  servicetype,
  rooms,
  extras,
  howoften,
  voucher
) => {
  var serviceTypesPrice = null;

  if (servicetype != null && servicetype != []) {
    serviceTypesPrice = await ServiceTypeEntity.findOne({
      name: servicetype,
    });
  }

  var roomPrices = null;
  if (servicetype != null) {
    roomPrices = await RoomEntity.find({ serviceType: servicetype });
  } else {
    const booking = await BookingEntity.findOne({ _id: bookingId });

    if (bookingId != null && booking != null && booking.servicetype != null) {
      roomPrices = await RoomEntity.find({ serviceType: booking.servicetype });
    }
  }

  const extrasPrice = await ExtraEntity.find({});

  var price = 0;
  if (servicetype != null && servicetype != [] && serviceTypesPrice != null) {
    price += serviceTypesPrice.price;
  }

  if (rooms != null && roomPrices != null) {
    for (const room of rooms) {
      if (room.roomName === "bedroom" && room.quantity > 0) {
        price +=
          roomPrices.find((room) => room.roomName === "bedroom").price *
          (room.quantity - 1);
      } else if (room.roomName === "livingroom" && room.quantity > 0) {
        price +=
          roomPrices.find((room) => room.roomName === "livingroom").price *
          (room.quantity - 1);
      } else if (room.roomName === "kitchen" && room.quantity > 0) {
        price +=
          roomPrices.find((room) => room.roomName === "kitchen").price *
          (room.quantity - 1);
      } else if (room.roomName === "bathroom" && room.quantity > 0) {
        price +=
          roomPrices.find((room) => room.roomName === "bathroom").price *
          (room.quantity - 1);
      } else if (room.roomName === "half-bathroom" && room.quantity > 0) {
        price +=
          roomPrices.find((room) => room.roomName === "half-bathroom").price *
          (room.quantity - 1);
      }
    }
  }

  // addti = [
  //   "oven",
  //   "walls",
  //   "windows",
  //   "fridge",
  //   "cabinets",
  //   "organizing",
  //   "dishwasher",
  //   "garage",
  //   "laundry",
  //   "blinds",
  //   "washerAndDryer",
  //   "microwave",
  // ];

  if (extras != null) {
    for (const extra of extras) {
      if (extra === "oven") {
        price += extrasPrice.find(
          (extra) => extra.serviceName === "oven"
        ).price;
      } else if (extra === "windows") {
        price += extrasPrice.find(
          (extra) => extra.serviceName === "windows"
        ).price;
      } else if (extra === "cabinets") {
        price += extrasPrice.find(
          (extra) => extra.serviceName === "cabinets"
        ).price;
      } else if (extra === "garage") {
        price += extrasPrice.find(
          (extra) => extra.serviceName === "garage"
        ).price;
      } else if (extra === "organizing") {
        price += extrasPrice.find(
          (extra) => extra.serviceName === "organizing"
        ).price;
      } else if (extra === "dishwasher") {
        price += extrasPrice.find(
          (extra) => extra.serviceName === "dishwasher"
        ).price;
      } else if (extra === "microwave") {
        price += extrasPrice.find(
          (extra) => extra.serviceName === "microwave"
        ).price;
      } else if (extra === "blinds") {
        price += extrasPrice.find(
          (extra) => extra.serviceName === "blinds"
        ).price;
      } else if (extra === "fridge") {
        price += extrasPrice.find(
          (extra) => extra.serviceName === "fridge"
        ).price;
      }
    }
  }

  if (howoften != null) {
    if (howoften === "weekly") {
      price = price * 0.85; //15% off
    } else if (howoften === "biweekly") {
      price = price * 0.9; //10% off
    } else if (howoften === "monthly") {
      price = price * 0.95; //5% off
    }
  }

  if (voucher != null) {
    if (voucher.discountPrice != 0) {
      price = price - voucher.discountPrice;
    } else {
      const difference = price * voucher.discountPercent;
      price = price - difference;
    }
  }

  return price;
};

export default createBookingPrice;
