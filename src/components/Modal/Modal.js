import React, {Component} from 'react';
import {Modal, Carousel, Button } from 'antd';
import {Motion, spring} from 'react-motion';
import PropTypes from "prop-types";
import styles from './Modal.less';

class HDModal extends Component {
  constructor(props) {
    super(props);
    this.state = {modalvisible: false, open: false};
  }

  slide() {
    this.carousel.goTo(this.state.open ? 0 : 1);
    this.setState({'open': !this.state.open});
  }

  render() {

    const {title, width, footer, component1, component2, visible} = this.props;
    const { open} = this.state;

    return (
      <Modal title={title} visible={visible} width={width} footer={footer}>

        <Button onClick={this.slide.bind(this)}>slide me</Button>

        <div className={styles.wrapper}>

          <Carousel ref={(carousel) => {this.carousel = carousel}} dots={false}>
            <div> {component1} </div>
            <div> {component2} </div>
          </Carousel>

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






