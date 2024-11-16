/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')

admin.initializeApp()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.pass
  }
})

exports.sendVerificationEmail = functions.firestore
  .document('emailVerifications/{email}')
  .onCreate(async (snap, context) => {
    const data = snap.data()
    const email = context.params.email
    
    const mailOptions = {
      from: '취준생을 위한 커리어 플랫폼 <noreply@yourapp.com>',
      to: email,
      subject: '이메일 인증 코드',
      html: `
        <h2>이메일 인증 코드</h2>
        <p>아래 인증 코드를 입력해주세요:</p>
        <h1 style="color: #4F46E5;">${data.code}</h1>
        <p>이 코드는 3분 동안 유효합니다.</p>
      `
    }

    try {
      await transporter.sendMail(mailOptions)
      return null
    } catch (error) {
      console.error('이메일 전송 실패:', error)
      throw new functions.https.HttpsError('internal', '이메일 전송 실패')
    }
  })
