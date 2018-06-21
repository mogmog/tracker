import React from 'react';
import { Icon, Row, Col } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const BigTrend = ({ colorful = true, reverseColor = false, flag, children, className, ...rest }) => {
  const classString = classNames(
    styles.trendItem,
    {
      [styles.trendItemGrey]: !colorful,
      [styles.reverseColor]: reverseColor && colorful,
    },
    className
  );

  return (
    <div {...rest} className={classString} title={typeof children === 'string' ? children : ''}>

      {flag && (
        <Row>
          <Col span={24}>
            <span className={styles[flag]}><Icon type={`caret-${flag}`} /></span>
            <span className={styles.value}> {children} </span>
          </Col>
        </Row>
      )}

    </div>
  );
};

export default BigTrend;
