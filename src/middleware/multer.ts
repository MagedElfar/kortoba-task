import multer from "multer";
import path from "path";
import {v4 as uuid4} from "uuid"



// Multer instance for local file upload
const localUpload = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname , ".." , ".." , "public" , "media"));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = uuid4();
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });

  return multer({ storage: storage }).single("image")
};

export default localUpload;