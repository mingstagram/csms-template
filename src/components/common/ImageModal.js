import React, { useState } from "react";
import Modal from "react-modal";
import "../../styles/projectStyle.css";
import leftArrow from "../../assets/images/modal-left-arrow.png";
import rightArrow from "../../assets/images/modal-right-arrow.png";
import closeBtn from "../../assets/images/close-fill@2x.png";

const ImageModal = ({ isOpen, onRequestClose, imageUrls, sort, msg }) => {
  const imgDownloadUrl = "/image/api/getImage/";
  const shouldShowButtons = sort === "matrix-list";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  //   const shouldShowButtons = true;

  const handleClose = (e) => {
    e.stopPropagation();
    onRequestClose(null);
  };

  const handleNextImage = (e) => {
    // 인덱스를 증가시키고 execimageUrlss.length로 나눠서 순환하게 만듭니다.
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrevImage = (e) => {
    // 인덱스를 감소시키고 음수이면 execimageUrlss.length - 1로 설정하여 순환하게 만듭니다.
    e.stopPropagation();
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Image Modal"
      className="image-modal-content"
      overlayClassName="image-modal-overlay"
      ariaHideApp={false}
    >
      {shouldShowButtons && (
        <>
          {currentImageIndex > 0 && (
            <button
              className="image-modal-btn image-modal-btn-left"
              onClick={handlePrevImage}
            >
              <img
                src={leftArrow}
                alt="Left Arrow"
                style={{ width: "50px", height: "50px" }}
              />
            </button>
          )}
          {currentImageIndex < imageUrls.length - 1 && (
            <button
              className="image-modal-btn image-modal-btn-right"
              onClick={handleNextImage}
            >
              <img
                src={rightArrow}
                alt="Right Arrow"
                style={{ width: "50px", height: "50px" }}
              />
            </button>
          )}
        </>
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          alignItems: "flex-start",
          position: "absolute",
          top: 40,
          left: 90,
          fontFamily: "LGSmart_H",
          fontSize: "16px",
          fontWeight: 600,
        }}
      >
        <span className="Ellipse_2"></span>
        <div className="Detail_Font1">{msg}</div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          position: "absolute",
          top: 20,
          left: 820,
          fontFamily: "LGSmart_H",
          fontSize: "16px",
          fontWeight: 600,
        }}
      >
        <button
          onClick={handleClose}
          style={{
            background: "#d9d9d9",
            padding: "5px",
            borderRadius: "5px",
            border: "none",
          }}
        >
          <img
            src={closeBtn}
            alt="Close"
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
          />
        </button>
      </div>
      <img
        src={
          sort === "matrix-detail"
            ? imageUrls
            : imgDownloadUrl + imageUrls[currentImageIndex]
        }
        alt="Modal Preview"
        className="image-modal-image"
        style={{ maxWidth: "700px", maxHeight: "400px" }}
      />
    </Modal>
  );
};

export default ImageModal;
