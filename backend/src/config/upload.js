const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),

  fileFilter: (req, file, cb) => {
    const extensoesPermitidas = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
    ];

    const extensao = file.originalname
      .substring(file.originalname.lastIndexOf("."))
      .toLowerCase();

    if (!extensoesPermitidas.includes(extensao)) {
      return cb(
        new Error(
          "Formato de imagem não permitido. Use JPG, JPEG, PNG ou WEBP."
        )
      );
    }

    cb(null, true);
  },

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;