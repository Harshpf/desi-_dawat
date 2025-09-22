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
    const { Name ,Tag } = req.body;
    const file = req.file;

    const existBanner = await bannerModel.findOne({Name:Name});
    if(existBanner){
      return res.status(409).json("banner with this name already exist");
    }
    console.log(Tag)
    if (!Name || !file) return res.status(400).json({ message: "Name and image required" });
  
    const banner = new bannerModel({
      Name: Name,
      image: file.path,
      tag:Tag
    });

    await banner.save();
    res.status(201).json({msg:"new banner added succesfully",banner});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding banner", error: err.message });
  }
}];

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