const { storage } = require("firebase-admin");
const { analyzeCSV } = require("../services/fileParserService");
const firestore = require("../services/firebaseService");
const prisma = require("@prisma/client").PrismaClient;
const fs = require("fs");
const path = require("path");

const prismaClient = new prisma();

const uploadFile = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  try {
    // Analyze CSV
    const analysis = await analyzeCSV(file.path);
    const bucket = storage().bucket(
      "cloud-functions-tutorial-69027.firebasestorage.app"
    ); // Firebase Storage bucket
    const fileData = fs.readFileSync(file.path);
    const filePath = file.path;
    const fileName = file.originalname;

    const fileUpload = bucket.file(`csv-files/${fileName}`); // Path within Firebase Storage

    // Upload the file to Firebase Storage
    await bucket.upload(filePath, {
      destination: fileUpload.name, // Upload to 'csv-files' folder
      metadata: {
        contentType: file.mimetype,
      },
    });
    const url = `cloud-functions-tutorial-69027.firebasestorage.app/csv-files/${fileName}`;
    const metadata = await prismaClient.file.create({
      data: {
        filename: file.originalname,
        rowCount: analysis.rowCount,
        columns: analysis.columns,
        fileUrl: url,
      },
    });

    // Cleanup local file
    fs.unlinkSync(file.path);

    res.status(200).json({ message: "File uploaded", metadata });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing file", error: error.message });
  }
};

module.exports = { uploadFile };
