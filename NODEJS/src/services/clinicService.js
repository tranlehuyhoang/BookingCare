const db = require("../models");
const { Op } = require("sequelize");

let createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });

        resolve({
          errCode: 0,
          errMessage: "Ok!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateClinicData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let clinic = await db.Clinic.findOne({
        where: { id: data.id },
        raw: false, //chu y cho nay do ben file config cau hinh cho query
      });
      if (clinic) {
        clinic.name = data.name;
        clinic.address = data.address;
        clinic.descriptionMarkdown = data.descriptionMarkdown;
        clinic.descriptionHTML = data.descriptionHTML;
        if (data.previewImgURL) clinic.image = data.previewImgURL;
        await clinic.save();

        resolve({
          errCode: 0,
          message: "Update the user succeed!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Hospital's not found!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllClinic = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let options = {};

      if (dataInput.limit) options.limit = parseInt(dataInput.limit);

      let data = await db.Clinic.findAll(options);

      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }

      resolve({
        errCode: 0,
        errMessage: "Ok!",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let filterClinics = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let options = {
        where: {},
        raw: true,
        nest: true,
      };
      let name = data.name;
      let address = data.address;

      if (name) {
        options.where.name = {
          [Op.like]: "%" + name + "%",
        };
      }
      if (address) {
        options.where.address = {
          [Op.like]: "%" + address + "%",
        };
      }

      let dataClinics = [];
      dataClinics = await db.Clinic.findAll(options);

      if (dataClinics && dataClinics.length > 0) {
        dataClinics.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }

      resolve({
        errCode: 0,
        errMessage: "Ok!",
        data: dataClinics,
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: { id: inputId },
          attributes: [
            "id",
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
            "image",
          ],
        });
        if (data) {
          //do something
          let doctorClinic = [];
          doctorClinic = await db.Doctor_Infor.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
          });
          data.doctorClinic = doctorClinic;
        } else {
          data = {};
        }
        resolve({
          errCode: 0,
          errMessage: "Ok!",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteClinic = (clinicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinic = await db.Clinic.findOne({
        where: { id: clinicId },
      });
      if (!clinic) {
        resolve({
          errCode: 2,
          errMessage: `The clinic isn't exist`,
        });
      }
      if (clinic) {
        await db.Clinic.destroy({
          where: { id: clinicId },
        });
      }
      resolve({
        errCode: 0,
        errMessage: `The clinic is deleted`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
  filterClinics: filterClinics,
  updateClinicData: updateClinicData,
  deleteClinic: deleteClinic,
};
