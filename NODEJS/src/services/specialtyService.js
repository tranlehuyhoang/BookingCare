const db = require("../models");
const { Op } = require("sequelize");

let createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
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

let getAllSpecialty = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let options = {};

      if (dataInput.limit) options.limit = parseInt(dataInput.limit);

      let data = await db.Specialty.findAll(options);

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

let getDetailSpecialtyById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Specialty.findOne({
          where: { id: inputId },
          attributes: [
            "id",
            "name",
            "descriptionHTML",
            "descriptionMarkdown",
            "image",
          ],
        });

        if (data) {
          //do something
          let doctorSpecialty = [];
          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId },
              attributes: ["doctorId", "provinceId"],
            });
          } else {
            //find by location
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId, provinceId: location },
              attributes: ["doctorId", "provinceId"],
            });
          }

          data.doctorSpecialty = doctorSpecialty;
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

let filterSpecialties = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let options = {
        where: {},
        raw: true,
        nest: true,
      };
      let name = data.name;

      if (name) {
        options.where.name = {
          [Op.like]: "%" + name + "%",
        };
      }

      let dataSpecialties = [];
      dataSpecialties = await db.Specialty.findAll(options);

      if (dataSpecialties && dataSpecialties.length > 0) {
        dataSpecialties.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }

      resolve({
        errCode: 0,
        errMessage: "Ok!",
        data: dataSpecialties,
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

let deleteSpecialty = (specialtyId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let specialty = await db.Specialty.findOne({
        where: { id: specialtyId },
      });
      if (!specialty) {
        resolve({
          errCode: 2,
          errMessage: `The specialty isn't exist`,
        });
      }
      if (specialty) {
        await db.Specialty.destroy({
          where: { id: specialtyId },
        });
      }
      resolve({
        errCode: 0,
        errMessage: `The specialty is deleted`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateSpecialtyData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let specialty = await db.Specialty.findOne({
        where: { id: data.id },
        raw: false, //chu y cho nay do ben file config cau hinh cho query
      });
      if (specialty) {
        specialty.descriptionHTML = data.descriptionHTML;
        specialty.descriptionMarkdown = data.descriptionMarkdown;
        specialty.name = data.name;
        if (data.image) specialty.image = data.image;
        await specialty.save();

        resolve({
          errCode: 0,
          message: "Update the specialty succeed!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Specialty's not found!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
  filterSpecialties: filterSpecialties,
  deleteSpecialty: deleteSpecialty,
  updateSpecialtyData: updateSpecialtyData,
};
