const Adress = require('../models/Adress')

class addressController {

    static async createAdress(req, res, next) {
        const { village, district, city, province, country, phone, zip } = req.body
        try {
            const addressData = await Adress.findOne({ user: req._userId })
            if (addressData) {
                const newAdress = {village, district, city, province, country, phone, zip}
        for(let key in newAdress) if(!newAdress[key]) delete newAdress[key]
        const addressData = await Adress.findOneAndUpdate({user : req._userId},newAdress,{new : true})
        res.status(200).json({result : true, addressData})
            }
            else {
                const address = await new Adress({
                    user: req._userId,
                    village, district, city, province, country, phone,zip
                })
                address.save()
                res.status(200).json({ success: true, data: address })
            }
        }
        catch (e) { next({name :'NOT_FOUND' }) }
    }
    static async getAdress(req,res,next){
        try{
            const addressData = await Adress.findOne({user : req._userId})
            .populate('user')
            res.status(200).json({success : true, data : addressData})
        }
        catch(e){next({name :'NOT_FOUND' })}
    }
    static async updateAdress(req,res,next){
      const {village, district, city, province, country, phone, zip} = req.body
      try{
        const newAdress = {village, district, city, province, country, phone, zip}
        for(let key in newAdress) if(!newAdress[key]) delete newAdress[key]
        const addressData = await Adress.findOneAndUpdate({user : req._userId},newAdress,{new : true})
        res.status(200).json({result : true, addressData})
      }
        catch (e){next({name :'NOT_FOUND' })}
    }
    static async deleteAddress(req,res,next){
        if(await Adress.findOneAndDelete({user : req._userId})){
        res.status(200).json({result : true, message : 'Delete Success'})
        }
        else {next({name :'NOT_FOUND' })}
    }

}

module.exports = addressController