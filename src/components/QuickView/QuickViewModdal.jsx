import { useContext, useEffect } from "react";
import { QuickViewContext } from "../../context/QuickViewContext";

const QuickViewModdal = () => {
    const STRAPI_BASE_URL = "http://localhost:1337";
    const { isOpen, closeQuickView } = useContext(QuickViewContext);
    const imageUrl = `${STRAPI_BASE_URL}${isOpen?.main_image?.url}`;
  console.log(isOpen);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-flex" onClick={closeQuickView}>
        <div className="modal-dialog moodal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isOpen.title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeQuickView}
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-column justify-content-center mb-3">
                <img
                  src={imageUrl}
                  alt={isOpen?.title}
                  className="img-fluid"
                  style={{ maxHeight: "300px" }}
                />

                <p>Price: {isOpen?.price}</p>
                <p>description: {isOpen?.category?.descraption}</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickViewModdal;
