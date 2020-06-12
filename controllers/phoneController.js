const UserModel = require('../models/user')
const handler = require('../handler')

exports.register = async (req, res) => {
  try {
    const {
      phone,
    } = req.body
    const findTarget = await UserModel.findOne({
      phone: phone
    })
    if (findTarget && findTarget.verified === true) {
      return res.json({
        data: 'phone has verified'
      })
    } else {
      // generator code sms
      const codeSms = handler.genCode(6)
      // send sms code
      handler.sendSms(phone, `verify code: ${codeSms}`)
      // save code to db
      const userInstance = new UserModel({
        phone,
        verify_code: codeSms
      })

      await userInstance.save()

      return res.json({
        success: true,
      })
    }
  } catch (error) {
    console.log('err', error)
    return res.json({
      error: error.message
    })
  }
}

exports.verify = async (req, res) => {
  try {
    const {
      phone,
      code,
    } = req.body

    const target = await UserModel.find({ phone: phone }).sort({ created_at: -1 }).limit(1)
    const verified = (code == target[0].verify_code) ? true : false
    if (verified) {
      target[0].verified = true
      await target[0].save()
      return res.json({
        success: true,
        data: {
          user: target
        }
      })
    } else {
      return res.json({
        success: false,
        data: 'wrong code'
      })
    }
  } catch (error) {
    console.log('err', error)
    return res.json({
      error: error.message
    })
  }
}
