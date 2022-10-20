import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './toggleButton.module.scss';
import Moon from '../../../../img/HeaderImg/Moon.png';
import Sun from '../../../../img//HeaderImg/Sun.png';

class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { selected, toggleSelected } = this.props;
    return (
      <div className={`${styles.theme_control_container} ${selected ? `${styles.container_disable}` : ''}`}
        onClick={toggleSelected} aria-hidden="true">
        {selected ?
          <img className={ `${styles.theme_control_icon} ${styles.moon}`} src={Moon} alt="theme_icon_moon" />
          :
          <img className={`${styles.theme_control_icon} ${styles.sun}`} src={Sun} alt="theme_icon_sun" />
        }
        <div className={`${styles.dialog_button} ${selected ? '' : `${styles.disabled}`}`}>
        </div>
      </div>
    );
  }
}

ToggleButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  toggleSelected: PropTypes.func.isRequired,
};

export default ToggleButton;
