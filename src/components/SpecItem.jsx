import React from "react";

const SpecItem = ({ specs }) => {
  if (!specs || specs.length === 0) return null;

  return (
    <div className="car-specs-container p-3 border rounded shadow-sm bg-white mt-4">
      <h4 className="mb-4 text-danger border-bottom pb-2">المواصفات الفنية</h4>
      <div className="row">
        {specs.map((spec, index) => (
          <div key={index} className="col-md-6 mb-3">
            <div className="d-flex align-items-center justify-content-between p-2 bg-light rounded shadow-sm">
              <div className="d-flex align-items-center">
                
                <i className={`bi ${spec.icon_class || 'bi-info-circle'} me-2 text-danger`}></i>
              
                <span className="text-muted small">{spec.lable}</span>
              </div>
              <span className="fw-bold text-dark small">{spec.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecItem;