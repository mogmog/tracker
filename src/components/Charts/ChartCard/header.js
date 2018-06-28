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
    const { text, icon, thin, colorIndex, tooltip } = this.props;
    return (<div style={{'border-bottom-width' : (thin ? '1px' : '4px') }} className={styles.header + ' colorIndex_' + colorIndex} >  {icon} { text }
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


