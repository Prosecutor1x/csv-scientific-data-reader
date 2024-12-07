const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// Route to fetch all files with metadata
router.get('/files', async (req, res) => {
  try {
    // Fetch all files and metadata from the database
    const files = await prisma.file.findMany();

    // Map the data into a structured response
    const response = files.map(file => ({
      id: file.id,
      filename: file.filename,
      uploadDate: file.uploadDate,
      rowCount: file.rowCount,
      columns: file.columns,
      fileUrl: file.fileUrl,
    }));

    res.status(200).json({
      message: 'Files fetched successfully',
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching files',
      error: error.message,
    });
  }
});

module.exports = router;
