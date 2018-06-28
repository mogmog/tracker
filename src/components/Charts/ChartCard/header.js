import React, {Component} from 'react';
import { Tooltip, Icon } from 'antd';
import styles from './header.less';

export default class ChartCardHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    console.log(this.props);
    const { text, icon, colorIndex, tooltip } = this.props;
    return (<div className={styles.header + ' colorIndex_' + colorIndex} >  {icon} { text }
      <span className={styles.tooltip}>

        {
          tooltip && <Tooltip title={tooltip}>
            <Icon type="info-circle-o" />
          </Tooltip>
        }

      </span>
    </div>)
  }

}

ChartCardHeader.defaultProps = {
  colorIndex : null
}


