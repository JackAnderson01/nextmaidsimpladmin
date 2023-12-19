import PostHowOftenController from "../../../../controllers/Admin/HowOften/PostHowOftenController.js";
import connection from "../../../../lib/connection.js";

const postHowOften = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result1 = await PostHowOftenController(req, res);
      break;
  }
};

export default postHowOften;
