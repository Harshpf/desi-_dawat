const addressModel = require("../../model/address")


exports.getAddress = async(req,res) =>{

    try{
        const userId = req.userId;
        const allAddress = await addressModel.findOne({userId:userId});
        res.status(200).json({msg:"all address",allAddress});
    }catch(err){
        res.status(500).json({msg:"error while fetching address", message:err.message});
    }

}

exports.addNewAddress = async(req,res) =>{

    try{
        const address = req.body;
        const userId = req.userId;
        
        const addressExist = await addressModel.findOne({pincode:address.pinCode});
        if(addressExist){
            res.status(200).json("address already exist , add a new address");
        }

        const newAddress = new addressModel({
            userId: userId,
            userName: address.userName,
            pinCode: address.pinCode,
            phoneNumber: address.phoneNumber,
            state: address.state,
            district: address.district,
            city: address.city,
            landMark: address.landMark
        });

        await newAddress.save();
        res.status(200).json("address added",newAddress);
    }catch(err){
        res.status(500).json({msg:"error from updating address ", message:err.message});
    }

}


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

    res.status(200).json({msg: "Address updated successfully",updatedAddress});

  } catch (err) {
    res.status(500).json({msg: "Error while updating address",error: err.message});
  }
};


exports.deleteAddress = async(req,res) =>{

    try{
        const addressId = req.params.id;
        const deletedAddress = await addressModel.findOne({_id:addressId});
        res.status(200).json({msg:"deleted address",deletedAddress});

    }catch(err){
        res.status(500).json({msg:" ", message:err.message});
    }

}