import React, { PureComponent } from 'react';
import {
  Icon
} from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';

export default class DashboardHeader extends PureComponent {

  render() {
    const { } = this.props;

    return (
      <div className={styles.header}>


        <div className={styles.problem}>
          To what extent, and in what ways is Russia using mainstream media channels to expand its sphere of influence over Estonia?
        </div>

       {/* <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />*/}
        <div className={styles.right}>

        </div>
      </div>
    );
  }
}
