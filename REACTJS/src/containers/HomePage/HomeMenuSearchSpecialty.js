import React, { useState, useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getAllClinic, getAllDoctors, getAllSpecialty } from "../../services/userService";

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  menuSpecialty: {
    position: "absolute !important",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  titleHeader: {
    fontWeight: "600 !important",
    backgroundColor: "#ebebeb !important",
    marginTop: "-7px !important",
  },
  sectionHeader: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    marginTop: "10px",
    padding: "5px 10px"

  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    listStyleType: "none",
    cursor: "pointer",
    padding: "5px 10px"
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    boxSizing: "border-box",
  },
  closeButton: {
    textAlign: "right",
    padding: "10px",
    cursor: "pointer",
  },
}));

const HomeMenuSearchSpecialty = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dataSpecialty, setDataSpecialty] = useState([]);
  const [dataClinic, setDataClinic] = useState([]);
  const [dataDoctors, setDataDoctors] = useState([]);
  const [filteredSpecialty, setFilteredSpecialty] = useState([]);
  const [filteredClinic, setFilteredClinic] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const specialtyRes = await getAllSpecialty({});
        if (specialtyRes.errCode === 0) {
          setDataSpecialty(specialtyRes.data || []);
        }

        const clinicRes = await getAllClinic({});
        if (clinicRes.errCode === 0) {
          setDataClinic(clinicRes.data || []);
        }

        const doctorsRes = await getAllDoctors({});
        if (doctorsRes.errCode === 0) {
          setDataDoctors(doctorsRes.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setOpen(props.showMenuSearchSpecialty);
  }, [props.showMenuSearchSpecialty]);

  useEffect(() => {
    const filterData = () => {
      const query = searchQuery ? removeDiacritics(searchQuery.toLowerCase()) : '';

      const filteredSpecialties = dataSpecialty.filter(option =>
        removeDiacritics(option.name.toLowerCase()).includes(query)
      );
      setFilteredSpecialty(filteredSpecialties);

      const filteredClinics = dataClinic.filter(option =>
        removeDiacritics(option.name.toLowerCase()).includes(query)
      );
      setFilteredClinic(filteredClinics);

      const filteredDoctors = dataDoctors.filter(option =>
        removeDiacritics(option.firstName.toLowerCase()).includes(query)
      );
      setFilteredDoctors(filteredDoctors);
    };

    filterData();
  }, [searchQuery, dataSpecialty, dataClinic, dataDoctors]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewDetail = (type, id) => () => {
    history.push(`/detail-${type}/${id}`);
    setOpen(false);
  };

  const handleClose = () => {
    props.handleClickShowHomeMenuSearchSpecialty();
  };

  return (
    <Menu
      id="long-menu"
      keepMounted
      open={props.showMenuSearchSpecialty}
      anchorReference="none"
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 7,
          width: "58ch",
        },
      }}
      className={classes.menuSpecialty}
    >
      <li key="close-button" className={classes.closeButton} onClick={handleClose}>
        Close
      </li>
      <li key="search-input" className={classes.titleHeader}>
        <TextField
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          variant="outlined"
          className={classes.searchInput}
        />
      </li>
      <li key="specialty-header" className={classes.sectionHeader}>
        Chuyên khoa
      </li>
      {filteredSpecialty.map(option => (
        <li
          key={option.id}
          onClick={handleViewDetail("specialty", option.id)}
          className={classes.menuItem}
        >
          <Avatar src={option.image} className={classes.avatar} />
          {option.name}
        </li>
      ))}

      <li key="clinic-header" className={classes.sectionHeader}>
        Bệnh viện
      </li>
      {filteredClinic.map(option => (
        <li
          key={option.id}
          onClick={handleViewDetail("clinic", option.id)}
          className={classes.menuItem}
        >
          <Avatar src={option.image} className={classes.avatar} />
          {option.name}
        </li>
      ))}

      <li key="doctor-header" className={classes.sectionHeader}>
        Bác sỹ
      </li>
      {filteredDoctors.map((option) => {
        let imageBase64 = "";
        if (option.image) {
          imageBase64 = Buffer.from(option.image, "base64").toString("binary");
        }
        const imageUrl = imageBase64;
        return (
          <li
            key={option.id}
            onClick={handleViewDetail("doctor", option.id)}
            className={classes.menuItem}
          >
            <Avatar src={imageUrl} className={classes.avatar} />
            {option.firstName}
          </li>
        );
      })}
    </Menu>
  );
};

export default HomeMenuSearchSpecialty;
