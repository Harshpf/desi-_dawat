// const addressModel = require("../../model/address")


// exports.getAddress = async(req,res) =>{

//     try{
//         const userId = req.userId;
//         const allAddress = await addressModel.find({userId:userId});
//         res.status(200).json({msg:"all address", allAddress});
//     }catch(err){
//         res.status(500).json({msg:"error while fetching address", message:err.message});
//     }

// }

// exports.addNewAddress = async(req,res) =>{

//     try{
//         const address = req.body;
//         const userId = req.userId;
        
//         // const addressExist = await addressModel.findOne({pincode:address.pinCode});
//         // if(addressExist){
//         //     return res.status(200).json("address already exist , add a new address");
//         // }

//         const newAddress = new addressModel({
//             userId: userId,
//             userName: address.userName,
//             pinCode: address.pinCode,
//             phoneNumber: address.phoneNumber,
//             state: address.state,
//             district: address.district,
//             city: address.city,
//             landMark: address.landMark
//         });

//         await newAddress.save();
//         res.status(200).json("address saved succesfully",newAddress);
//     }catch(err){
//         res.status(500).json({msg:"error from updating address ", message:err.message});
//     }

// }


// exports.updateAddress = async (req, res) => {
//   try {
//     const { id } = req.params;         
//     const updateData = req.body;       

//     const updatedAddress = await addressModel.findByIdAndUpdate(
//       id,
//       { $set: updateData },          
//       { new: true, runValidators: true }
//     );

//     if (!updatedAddress) {
//       return res.status(404).json({ msg: "Address not found" });
//     }

//     res.status(200).json({msg: "Address updated successfully",updatedAddress});

//   } catch (err) {
//     res.status(500).json({msg: "Error while updating address",error: err.message});
//   }
// };


// exports.deleteAddress = async(req,res) =>{

//     try{
//         const addressId = req.params.id;
//         const deletedAddress = await addressModel.findOneAndDelete({_id:addressId});
//         res.status(200).json({msg:"address deleted succesfully",deletedAddress});

//     }catch(err){
//         res.status(500).json({msg:"error while deleteing address ", message:err.message});
//     }

// }


const addressModel = require("../../model/address");

// ----------------------------------------------
// GET ALL ADDRESSES
// ----------------------------------------------
exports.getAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const allAddress = await addressModel.find({ userId });

    res.status(200).json({
      msg: "All addresses fetched successfully",
      allAddress,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error fetching addresses",
      message: err.message,
    });
  }
};

// ----------------------------------------------
// ADD NEW ADDRESS
// ----------------------------------------------
exports.addNewAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const addr = req.body;

    const newAddress = new addressModel({
      userId,
      fullName: addr.fullName,
      phone: addr.phone,
      email: addr.email,
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      landmark: addr.landmark,
      addressType: addr.addressType || "Home",
      saveAddress: addr.saveAddress || false,
    });

    await newAddress.save();

    // Return updated addresses list
    const allAddress = await addressModel.find({ userId });
    res.status(200).json({
      msg: "Address added successfully",
      allAddress,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error saving address",
      message: err.message,
    });
  }
};

// ----------------------------------------------
// UPDATE ADDRESS
// ----------------------------------------------
exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedAddress = await addressModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ msg: "Address not found" });
    }

    const allAddress = await addressModel.find({ userId: req.userId });
    res.status(200).json({
      msg: "Address updated successfully",
      allAddress,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error updating address",
      message: err.message,
    });
  }
};

// ----------------------------------------------
// DELETE ADDRESS
// ----------------------------------------------
exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    await addressModel.findByIdAndDelete(id);

    const allAddress = await addressModel.find({ userId: req.userId });
    res.status(200).json({
      msg: "Address deleted successfully",
      allAddress,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error deleting address",
      message: err.message,
    });
  }
};

