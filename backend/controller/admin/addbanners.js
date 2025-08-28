const bannerModel = require("../../model/banner")
const upload = require("../../middleware/multermiddleware")

exports.getAllBanners = async (req, res) => {
    try {
        const banners = await bannerModel.find();
        res.status(200).json({ banners });
    } catch (err) {
        res.status(500).json({ msg: "Error fetching banners", message: err.message });
    }
};

exports.addBanner = [upload.single('images'), async (req, res) => {
try {
    const { Name } = req.body;
    const file = req.file;

    if (!Name || !file) return res.status(400).json({ message: "Name and image required" });

    const banner = new bannerModel({
      Name,
      image: file.path,
    });

    await banner.save();
    res.status(201).json(banner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding banner", error: err.message });
  }
}];

// exports.addBanner = [upload.single('images'), async (req, res) => {

//      try {
//     const { Name } = req.body;
//     const file = req.file;

//     if (!Name || !file) {
//       return res.status(400).json({ message: "Name and image required" });
//     }

//     const newBanner = { Name, image: file.path };

//     // ATOMIC: Push into the single document's banners array; create doc if not exists
//     const updatedDoc = await bannerModel.findOneAndUpdate(
//       {}, // match any existing single document
//       {
//         $push: { banners: newBanner },
//         $setOnInsert: { createdAt: new Date() }, // set on first insert
//       },
//       { new: true, upsert: true } // return updated document; create if missing
//     );

//     return res.status(201).json(updatedDoc);
//     } catch (err) {
//         res.status(500).json({ msg: "err from adding banner", message: err.message });
//     }
// }]

exports.deleteImage = async(req,res) =>{
    try{
        const imageId = req.params.id;
         console.log(imageId)
        const deleteImage = await bannerModel.findByIdAndDelete(imageId);
        res.status(200).json({msg:"image deleted",deleteImage});
    }catch(err){
            res.status(500).json({ msg: "err from deleting banner" ,message:err.message});
    }
}