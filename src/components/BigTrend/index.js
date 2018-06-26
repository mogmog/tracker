import React from 'react';
import { Icon, Row, Col } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const BigTrend = ({ colorful = true, reverseColor = false, flag, children, percent, graph, className, ...rest }) => {
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
        <div>
        <Row>
          <Col>
            <span className={styles[flag]}><Icon type={`caret-${flag}`} /></span>
            <span className={styles.value}> {percent}% </span>
          </Col>
        </Row>
        <Row>
          <Col>
            {graph}
          </Col>
        </Row>
        </div>
      )}

    </div>
  );
};

export default BigTrend;
