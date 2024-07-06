import { Op } from "sequelize";
import db from "../models/index";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;

  return result;
};

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.patientName
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        //check limit booking on table schedule
        let schedule = await db.Schedule.findOne({
          where: {
            date: data.date,
            timeType: data.timeType,
            doctorId: data.doctorId,
          },
          raw: false, //chu y cho nay do ben file config cau hinh cho query
        });

        if (schedule) {
          if (schedule.currentNumber < schedule.maxNumber) {
            schedule.currentNumber = parseInt(schedule.currentNumber) + 1;
            await schedule.save();
          } else {
            resolve({
              errCode: 3,
              errMessage: "Limit max number booking!",
            });
          }
        } else {
          resolve({
            errCode: 3,
            errMessage: "Limit max number booking!",
          });
        }

        let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        await emailService.sendSimpleEmail({
          receiverEmail: data.email,
          patientName: data.patientName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });

        //upsert patient
        // let user = await db.User.findOrCreate({
        //   where: { email: data.email },
        //   defaults: {
        //     email: data.email,
        //     roleId: "R3",
        //     gender: data.selectedGender,
        //     address: data.address,
        //     firstName: data.patientName,
        //   },
        // });

        let user = await db.User.findOne({
          where: { email: data.email },
        });

        //create a booking record
        if (user) {
          await db.Booking.create({
            statusId: "S1",
            doctorId: data.doctorId,
            patientId: user.id,
            date: data.date,
            timeType: data.timeType,
            token: token,
            patientName: data.patientName,
            patientPhoneNumber: data.phoneNumber,
            patientAddress: data.address,
            patientReason: data.reason,
            patientGender: data.selectedGender,
            patientBirthday: data.date,
          });
        }
        // if (user && user[0]) {
        //   await db.Booking.findOrCreate({
        //     where: { patientId: user[0].id },
        //     defaults: {
        //       statusId: "S1",
        //       doctorId: data.doctorId,
        //       patientId: user[0].id,
        //       date: data.date,
        //       timeType: data.timeType,
        //       token: token,
        //     },
        //   });
        // }
        resolve({
          errCode: 0,
          errMessage: "Save infor patient succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: { doctorId: data.doctorId, token: data.token, statusId: "S1" },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Update the appointment succeed!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been activated or does not exist!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let filterHistory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.patientId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let startDate = data.startDate ? data.startDate : null;
        let endDate = data.endDate ? data.endDate : null;

        let dataHistories = [];
        if (startDate && endDate) {
          dataHistories = await db.History.findAll({
            where: {
              patientId: data.patientId,
              createdAt: {
                [Op.lt]: new Date(
                  new Date(endDate).getTime() + 60 * 60 * 24 * 1000 - 1
                ),
                [Op.gt]: new Date(startDate),
              },
            },
            order: [["createdAt", "DESC"]],
            attributes: [
              "id",
              "patientId",
              "doctorId",
              "description",
              "drugs",
              "files",
              "reason",
              "createdAt",
              "updatedAt",
            ],
            include: [
              {
                model: db.User,
                as: "doctorDataHistory",
                attributes: ["id", "email", "firstName", "lastName"],
                include: [
                  {
                    model: db.Doctor_Infor,
                    attributes: ["id", "doctorId", "specialtyId", "clinicId"],
                    include: [
                      {
                        model: db.Specialty,
                        as: "specialtyData",
                        attributes: ["name"],
                      },
                      {
                        model: db.Clinic,
                        as: "clinicData",
                        attributes: ["name"],
                      },
                    ],
                  },
                ],
              },
            ],
            raw: true,
            nest: true,
          });
        } else {
          dataHistories = await db.History.findAll({
            where: {
              patientId: data.patientId,
            },
            order: [["createdAt", "DESC"]],
            attributes: [
              "id",
              "patientId",
              "doctorId",
              "description",
              "drugs",
              "files",
              "reason",
              "createdAt",
              "updatedAt",
            ],
            include: [
              {
                model: db.User,
                as: "doctorDataHistory",
                attributes: ["id", "email", "firstName", "lastName"],
                include: [
                  {
                    model: db.Doctor_Infor,
                    attributes: ["id", "doctorId", "specialtyId", "clinicId"],
                    include: [
                      {
                        model: db.Specialty,
                        as: "specialtyData",
                        attributes: ["name"],
                      },
                      {
                        model: db.Clinic,
                        as: "clinicData",
                        attributes: ["name"],
                      },
                    ],
                  },
                ],
              },
            ],
            raw: true,
            nest: true,
          });
        }

        resolve({
          errCode: 0,
          data: dataHistories,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
  filterHistory: filterHistory,
};
