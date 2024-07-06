import drugService from "../services/drugService";

let handleCreateNewDrug = async (req, res) => {
  let message = await drugService.createNewDrug(req.body);
  return res.status(200).json(message);
};

let handleEditDrug = async (req, res) => {
  let data = req.body;
  let message = await drugService.updateDrugData(data);
  return res.status(200).json(message);
};

let filter = async (req, res) => {
  let data = req.body;
  let message = await drugService.filter(data);
  return res.status(200).json(message);
};

let getDrugInfoById = async (req, res) => {
  let message = await drugService.getDrugInfoById(req.query.drugId);

  return res.status(200).json(message);
};

let handleDeleteDrug = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  if (id) {
    let message = await drugService.deleteDrugById(id);
    return res.status(200).json(message);
  }
};

module.exports = {
  handleCreateNewDrug: handleCreateNewDrug,
  handleEditDrug: handleEditDrug,
  handleDeleteDrug: handleDeleteDrug,
  filter: filter,
  getDrugInfoById: getDrugInfoById,
};
