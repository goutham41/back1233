const path = require("path");

const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    const files = req.body.images;

    const fileExtensions = [];
    Object.keys(files).forEach((key) => {
      console.log(files[key].name);
      fileExtensions.push(path.extname(files[key].name));
    });

    // Are the file extension allowed?
    const allowed = fileExtensions.every((ext) =>
      allowedExtArray.includes(ext)
    );

    if (!allowed) {
      const message =
        `Upload failed. Only ${allowedExtArray.toString()} files are allowed.`.replaceAll(
          ",",
          ", "
        );

      return res.status(422).json({ status: "error", message });
    }

    next();
  };
};

module.exports = fileExtLimiter;
