const UserModel = require('../models/user')
// const handler = require('../handler')

exports.register = async (req, res) => {
  try {
    let result
    const {
      phone,
      first_name,
      last_name,
      email,
      country,
      province,
      city,
      address_line,
      postal_code
    } = req.body
    const foundTarget = await UserModel.findOne({
      phone: phone
    })
    if (foundTarget.verified) {
      foundTarget.first_name = first_name
      foundTarget.last_name = last_name
      foundTarget.email = email
      foundTarget.country = country
      foundTarget.province = province
      foundTarget.city = city
      foundTarget.address_line = address_line
      foundTarget.postal_code = postal_code
      result = await foundTarget.save()
      console.log('result:', result)
    }

    return res.json({
      data: result
    })
    
  } catch (error) {
    console.log('err', error)
    return res.json({
      error: error.message
    })
  }
}
