require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Booking Care" <ntddatj03@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
      <h3><b>Xin chào ${dataSend.patientName}!</b></h3>
      <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên website của chúng tôi</p>
      <p>Thông tin đặt lịch khám bệnh:</p>
      <div><b>Thời gian: ${dataSend.time}</b></div>
      <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

      <p>Nếu các thông tin trên là chính xác, vui lòng nhấn vào đường dẫn bên dưới để hoàn tất thủ tục đặt lịch khám bệnh.</p>
      <p><a href=${dataSend.redirectLink} target="_blank">Nhấn vào đây để xác nhận</a></p>

      <div>Xin chân thành cảm ơn!</div>
      `;
  }
  if (dataSend.language === "en") {
    result = `
      <h3><b>Dear ${dataSend.patientName}!</b></h3>
      <p>You received this email because you booked an online medical appointment on ours website</p>
      <p>Information to schedule an appointment:</p>
      <div><b>Time: ${dataSend.time}</b></div>
      <div><b>Doctor: ${dataSend.doctorName}</b></div>
      
      <p>If the above information is correct, please click on the link below to complete the procedure to book an appointment.</p>
      <div><a href=${dataSend.redirectLink} target="_blank">Click here to confirm</a></div>
      
      <div>Sincerely thank!</div>
      `;
  }
  return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
      <h3><b>Xin chào ${dataSend.patientName}!</b></h3>
      <p>Bạn nhận được email này vì đã hoàn tất thủ tục khám bệnh bên chúng tôi</p>
      <p>Thông tin đơn thuốc được gửi trong tệp tin đính kèm.</p>
      <div>Xin chân thành cảm ơn!</div>
      `;
  }
  if (dataSend.language === "en") {
    result = `
      <h3><b>Dear ${dataSend.patientName}!</b></h3>
      <p>You are receiving this email because you have completed your medical examination procedure with us</p>
      <p>Prescription information is sent in the attached file</p>
      <div>Sincerely thank!</div>
      `;
  }
  return result;
};
let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Booking Care" <ntddatj03@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Thông tin khám bệnh", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
          {
            // encoded string as an attachment
            filename: `remedy-${
              dataSend.patientId
            }-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64,")[1],
            encoding: "base64",
          },
        ],
      });

      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

let sendForgotPasswordEmail = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Booking Care" <ntddatj03@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin lấy lại mật khẩu", // Subject line
    html: getBodyHTMLEmailForgotPassword(dataSend),
  });
};

let getBodyHTMLEmailForgotPassword = (dataSend) => {
  let result = "";
  // if (dataSend.language === "vi") {
  result = `
    <h3><b>Xin chào!</b></h3>
    <p>Bạn nhận được email này vì đã yêu cầu lấy lại mật khẩu do quên mật khẩu</p>
    <p>Nếu yêu cầu lấy lại mật khẩu là đúng, vui lòng click vào đường dẫn bên dưới để hoàn tất thủ tục lấy lại mật khẩu.</p>
    <p><a href=${dataSend.redirectLink} target="_blank">Nhấn vào đây</a></p>
    <p>Nếu bạn không yêu cầu lấy lại mật khẩu, hãy bỏ qua email này!</p>
    <div>Xin chân thành cảm ơn!</div>
    `;
  // }
  // if (dataSend.language === "en") {
  //   result = `
  //   <h3><b>Hello!</b></h3>
  //   <p>You received this email because you requested to reset your password due to a forgotten password</p>
  //   <p>If the password retrieval request is correct, please click on the link below to complete the password retrieval procedure</p>
  //   <p><a href=${dataSend.redirectLink} target="_blank">Click here</a></p>
  //   <p>If you did not request a password reset, please ignore this email!</p>
  //   <div>Sincerely thanks!</div>
  //   `;
  // }
  return result;
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
  sendForgotPasswordEmail: sendForgotPasswordEmail,
};
