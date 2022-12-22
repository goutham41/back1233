const MB = 5; // 5 MB 
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (req, res, next) => {
    const files = req.body.images

    const filesOverLimit = []
    // Which files are over the limit?
    Object.keys(files).forEach(key => {
        if (files[key].size > FILE_SIZE_LIMIT) {
            filesOverLimit.push(files[key].name)
        }
    })

    if (filesOverLimit.length) {
        const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';

        const sentence = `Upload failed. Your file is over the size limit of ${MB} MB.`.replaceAll(",", ", ");

        const message = filesOverLimit.length < 3
            ? sentence.replace(",", " and")
            : sentence.replace(/,(?=[^,]*$)/, " and");

        return res.status(413).json({ status: "error", message });

    }

    next()
}

module.exports = fileSizeLimiter