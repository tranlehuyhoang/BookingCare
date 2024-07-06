import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./NotFound.scss";
const NotFound = () => {
  let history = useHistory();

  useEffect(() => {
    document.title = "ERROR 404";
  }, []);

  const handleClickBtn = () => {
    history.push("/home");
  };
  return (
    <>
      <div className="error404">
        <div className="error-img"></div>
        <div className="error-content">
          <h3>Xin lỗi, chúng tôi không tìm thấy trang mà bạn cần!</h3>
          <div className="list-contact">
            <div className="itemct">
              <button className="btn btn-primary" onClick={handleClickBtn}>
                Trở về trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NotFound;
