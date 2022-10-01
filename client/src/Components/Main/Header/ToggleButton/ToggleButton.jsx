import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../header.module.scss';

class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { selected, toggleSelected } = this.props;
    return (
      <div className={`${styles.toggle_container} ${selected ? `${styles.container_disable}` : ''}`} onClick={toggleSelected} aria-hidden="true">
        <div className={`${styles.dialog_button} ${selected ? '' : `${styles.disabled}`}`}>
          {selected ? 'Y' : 'N'}
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
