const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Pasta onde as imagens serão armazenadas
const pastaUploads = path.join(__dirname, "../../uploads");

// Cria a pasta uploads automaticamente
if (!fs.existsSync(pastaUploads)) {
  fs.mkdirSync(pastaUploads, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pastaUploads);
  },

  filename: (req, file, cb) => {
    const extensao = path
      .extname(file.originalname)
      .toLowerCase();

    const nomeOriginal = path
      .basename(file.originalname, extensao)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const nomeArquivo =
      `${nomeOriginal}-${Date.now()}${extensao}`;

    cb(null, nomeArquivo);
  },
});

const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    const extensoesPermitidas = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
    ];

    const extensao = path
      .extname(file.originalname)
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