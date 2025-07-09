import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  // Return null if no file provided (optional file upload)
  if (!file) {
    return null;
  }

  // Check if file has required properties
  if (!file.originalname || !file.buffer) {
    throw new Error("Invalid file object - missing originalname or buffer");
  }

  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export default getDataUri;