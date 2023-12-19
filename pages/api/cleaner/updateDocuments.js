import UpdateDocumentsController from "../../../controllers/ServiceProvider/UpdateDocumentsController.js";
import connection from "../../../lib/connection.js";
// import IncomingForm from "formidable/Formidable.js";

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "10mb",
//     },
//   },
//   maxDuration: 5,
// };

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

const UpdateDocuments = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      // const form = new IncomingForm();

      // form.parse(req, (err, fields, files) => {
      //   if (err) {
      //     return res
      //       .status(500)
      //       .json({ success: false, error: "Error parsing form data." });
      //   }

      //   // Do something with the uploaded file
      //   // const uploadedFile = files.file; // Assuming the file input on the frontend is named "file"

      //   // Here, you can save the file to storage or perform any other necessary actions
      //   // For simplicity, we'll just respond with the file details
      //   // res.status(200).json({
      //   //   name: uploadedFile.name,
      //   //   type: uploadedFile.type,
      //   //   size: uploadedFile.size,
      //   //   path: uploadedFile.path,
      //   // });

      //   // let result = await UpdateDocumentsController(req, res);
      // });

      let result = await UpdateDocumentsController(req, res);
      break;
  }
};

export default UpdateDocuments;

// import formidable from "express-formidable";
// import UpdateDocumentsController from "../../../controllers/ServiceProvider/UpdateDocumentsController.js";
// import connection from "../../../lib/connection.js";

// const UpdateDocuments = async (req, res) => {
//   await connection();

//   // console.log(req.body);
//   const form = new formidable({
//     // uploadDir: "./public/uploads", // Set the directory to save the uploaded files
//     // keepExtensions: true, // Keep file extensions
//     // maxFileSize: 10 * 1024 * 1024, // Set the maximum file size (e.g., 10 MB)
//     maxFieldsSize: 10 * 1024 * 1024,
//   });

//   // console.log(req.body);

//   // Set a timeout for form processing (e.g., 30 seconds)
//   const formProcessingTimeout = 30000; // 30 seconds
//   let isRequestTimedOut = false;

//   const timeoutId = setTimeout(() => {
//     isRequestTimedOut = true;
//     res.status(500).json({ success: false, error: "Request timed out." });
//   }, formProcessingTimeout);

//   form(req, res, async (err, fields, files) => {
//     // clearTimeout(timeoutId); // Clear the timeout since the form processing completed
//     console.log("Here 84");

//     if (err) {
//       return res
//         .status(500)
//         .json({ success: false, error: "Error parsing form data." });
//     }

//     console.log("Here 97");

//     let result = await UpdateDocumentsController(req, res); //, uploadedFile);

//     console.log("Here 107");

//     return res.status(result.success ? 200 : 500).json(result);
//   });

//   console.log("Here 113");
// };

// export default UpdateDocuments;
