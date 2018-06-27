import React, {Component} from 'react';
import {Modal, Carousel, Button } from 'antd';
import {Motion, spring} from 'react-motion';
import PropTypes from "prop-types";
import styles from './Modal.less';

class HDModal extends Component {
  constructor(props) {
    super(props);
    this.state = {modalvisible: this.props.modalvisible, open: false};
  }

  componentDidUpdate(oldprops) {
    if (this.props.pane != oldprops.pane) {
      this.carousel.goTo(this.props.pane);
    }
  }

  render() {

    const {title, width, footer, component1, component2 , toggle} = this.props;
    const { open, visible } = this.state;

    return (
      <Modal style={{height : '700px'}} title={title} visible={true} width={width} footer={footer} onCancel={ toggle }>

        <div className={styles.wrapper}>

          <div> {component1} </div>
          {/*<Carousel ref={(carousel) => {this.carousel = carousel}} dots={false}>
            <div> {component1} </div>
            <div> {component2} </div>
          </Carousel>*/}

        </div>

      </Modal>);
  }
}

HDModal.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  footer: PropTypes.array

};

HDModal.defaultProps = {
  title: 'Modal Title',
  width: '70%',
  footer: [],
  component1 : <span> 1 </span>,
  component2 : <span> 2 </span>,

};

export default HDModal;






