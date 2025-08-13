import multer from "multer";
import path from "path";

const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads', 'user'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
})

const uploadUser = multer({ storage:storageUser }).single("userFoto");

const storageChanel = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads', 'chanel'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
})

const uploadChanel = multer({ storage:storageChanel }).single("chanelFoto");

export { uploadChanel, uploadUser };