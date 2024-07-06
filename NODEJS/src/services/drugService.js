import db from "../models/index";
const { Op } = require("sequelize");

let createNewDrug = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Drug.create({
        name: data.name,
      });

      resolve({
        errCode: 0,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let filter = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //name
      let drugs = await db.Drug.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${data.name}%`,
              },
            },
          ],
        },
      });

      resolve(drugs);
    } catch (e) {
      reject(e);
    }
  });
};

let getDrugInfoById = (drugId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let drug = await db.Drug.findOne({
        where: { id: drugId },
        raw: true,
      });

      if (drug) {
        resolve(drug);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateDrugData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let drug = await db.Drug.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (drug) {
        drug.name = data.name;

        await drug.save();

        resolve({
          errCode: 0,
        });
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteDrugById = (drugId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Drug.destroy({
        where: {
          id: drugId,
        },
      });
      resolve({
        errCode: 0,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  deleteDrugById: deleteDrugById,
  updateDrugData: updateDrugData,
  getDrugInfoById: getDrugInfoById,
  createNewDrug: createNewDrug,
  filter: filter,
};
