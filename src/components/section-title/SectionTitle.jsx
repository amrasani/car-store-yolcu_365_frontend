import React from 'react';

const SectionTitle = ({ title }) => {
  return (
    <div className="container text-start mb-4" dir="rtl">
      <h2 className="text-danger fw-bold">{title}</h2>
      <div className="bg-danger" style={{ width: '50px', height: '3px' }}></div>
    </div>
  );
};

export default SectionTitle;