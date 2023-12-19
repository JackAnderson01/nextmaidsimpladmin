import ApplyVoucherController from "../../../controllers/Booking/ApplyVoucherController.js";
import connection from "../../../lib/connection.js";

const applyVoucher = async (req, res) => {
  await connection();

  const method = req.method;
  switch (method) {
    case "POST":
      await ApplyVoucherController(req, res);
      break;
  }
};

export default applyVoucher;
