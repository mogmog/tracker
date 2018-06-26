import React from 'react';
import {Icon } from 'antd';

import styles from './Facebook.less';

const Facebook = ({name, date, content , ...rest}) => (
  <div className={styles.facebook}>

    <div className="fb" >
      <div className="post">
        <div className="top">
          <div className="img fileinput-preview">

          </div>
          <div className="name">
            <a href="#">
              <Icon style={{ fontSize: 32 }} type={'facebook'}/>
              <span className="text-name"> {name} </span></a>
            <div class="date">
              <span className="text-when">Posted on {date}  </span> ·
            </div>
            <div className="top_arrow"></div>
          </div>
        </div>
        <div className="clearfix"></div>
        <div className="img_message"></div>
        <span className="text-message">{content}
       </span>
        <div className="txtbottom">
          <a className="text-liketext">Like</a> · <a className="text-commenttext">Comment</a> · <a className="text-sharetext">Share</a>
        </div>
      </div>

    </div>
  </div>

);

export default Facebook;