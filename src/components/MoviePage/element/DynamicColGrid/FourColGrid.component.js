import React from 'react';
import PropTypes from 'prop-types';
import './FourColGrid.styles.css';

const FourColGrid = ({ header, loading, children, dynamicClass, headerClass }) => {

  const renderElements = () => {
    return children.map((element, i) => (
        <div key={i} className="rmdb-grid-element">
          {element}
        </div>
    ));
  }

  return (
    <div className={`rmdb-grid ${dynamicClass}`}>
      {header && !loading ? <h2 className={`${headerClass}`}>{header}</h2> : null}
      <div className="rmdb-grid-content">
         {renderElements()}
      </div>
    </div>
  )
}

FourColGrid.propTypes = {
  header: PropTypes.string,
  loading: PropTypes.bool
}

export default FourColGrid;
