// controllers/mediaController.js
const mediaService = require("../services/mediaServices");

exports.getUploadUrl = async (req, res) => {
  try {
    const { fileName, fileType, scope } = req.query;

    const result = await mediaService.getUploadUrl({
      userId: req.user.id,
      fileName,
      fileType,
      scope,
    });

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    const { key } = req.body;

    await mediaService.deleteFile(key);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};