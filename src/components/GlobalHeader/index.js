import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const {
      currentUser = {},
      collapsed,
      fetchingNotices,
      isMobile,
      logo,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      match
    } = this.props;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item disabled>
          <Icon type="user" />Account
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />Logout
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    return (
      <div className={styles.header}>
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}

        <span>
          <Link to="/problemset/list" className={styles.logo} key="logo">
           <Icon type="left" />
          </Link>

        </span>


       {/* <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />*/}
        <div className={styles.right}>
         {/* <HeaderSearch
            className={`${styles.action} ${styles.search}`}
            placeholder="站内搜索"
            dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
            onSearch={value => {
              console.log('input', value); // eslint-disable-line
            }}
            onPressEnter={value => {
              console.log('enter', value); // eslint-disable-line
            }}
          />*/}
          {/*<Tooltip title="使用文档">
            <a
              target="_blank"
              href="http://pro.ant.design/docs/getting-started"
              rel="noopener noreferrer"
              className={styles.action}
            >
              <Icon type="question-circle-o" />
            </a>
          </Tooltip>*/}
         {/* <NoticeIcon
            className={styles.action}
            count={currentUser.notifyCount}
            onItemClick={(item, tabProps) => {
              console.log(item, tabProps); // eslint-disable-line
            }}
            onClear={onNoticeClear}
            onPopupVisibleChange={onNoticeVisibleChange}
            loading={fetchingNotices}
            popupAlign={{ offset: [20, -16] }}
          >
            <NoticeIcon.Tab
              list={noticeData['通知']}
              title="通知"
              emptyText="你已查看所有通知"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['消息']}
              title="消息"
              emptyText="您已读完所有消息"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['待办']}
              title="待办"
              emptyText="你已完成所有待办"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
            />
          </NoticeIcon>*/}

            <svg width="210px" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 597.64 50.23"><defs></defs><title>HD_logo_WHITE</title><path className="cls-1" d="M59,13.34V62.92H51.13V41.06h-25V62.92H18.31V13.34h7.82V34.08h25V13.34Z" transform="translate(-18.31 -13.15)"/><path className="cls-1" d="M97,56.22a12.54,12.54,0,0,0,6.49-1.54,12.26,12.26,0,0,0,4.16-4A16.93,16.93,0,0,0,109.93,45a31.89,31.89,0,0,0,.66-6.53V13.34h7.89V38.48a37.58,37.58,0,0,1-1.19,9.6A22.22,22.22,0,0,1,113.53,56a18,18,0,0,1-6.67,5.34,22.54,22.54,0,0,1-9.81,2,22.08,22.08,0,0,1-10-2.06,18,18,0,0,1-6.6-5.52,22.67,22.67,0,0,1-3.63-7.93,38.14,38.14,0,0,1-1.12-9.29V13.34h7.82V38.48a32.14,32.14,0,0,0,.66,6.6,16.89,16.89,0,0,0,2.23,5.66,11.83,11.83,0,0,0,4.19,4A12.8,12.8,0,0,0,97,56.22Z" transform="translate(-18.31 -13.15)"/><path className="cls-1" d="M178.26,62.92V27.23l-14.74,27H159.2l-14.81-27V62.92h-7.82V13.34h8.38l16.41,30.31,16.41-30.31h8.38V62.92Z" transform="translate(-18.31 -13.15)"/><path className="cls-1" d="M200.18,62.92l20-49.59h6.42l19.9,49.59h-8.31l-5.31-13.48H213.73l-5.17,13.48Zm23.19-40.86-8.24,21.58h16.2Z" transform="translate(-18.31 -13.15)"/><path className="cls-1" d="M266,28V62.92H258.2V13.34h6.15L292.7,49.09V13.4h7.89V62.92H294.1Z" transform="translate(-18.31 -13.15)"/><path className="cls-1" d="M320.91,63V13.5h16.74a25.75,25.75,0,0,1,10.39,2,21,21,0,0,1,7.43,5.3,21.94,21.94,0,0,1,4.43,7.85,30.82,30.82,0,0,1,1.46,9.59,29.54,29.54,0,0,1-1.67,10.22A22.43,22.43,0,0,1,355,56.23a20.93,20.93,0,0,1-7.46,5A26,26,0,0,1,337.65,63ZM356.49,38.2a25.58,25.58,0,0,0-1.26-8.2,18.51,18.51,0,0,0-3.66-6.45,16.41,16.41,0,0,0-5.9-4.22,20.15,20.15,0,0,0-8-1.5H325.72V58.71h11.93a19.81,19.81,0,0,0,8.13-1.57,16.54,16.54,0,0,0,5.9-4.33,18.78,18.78,0,0,0,3.59-6.49A26,26,0,0,0,356.49,38.2Z" transform="translate(-18.31 -13.15)"/><path className="cls-1" d="M378.37,63V13.57h4.81V63Z" transform="translate(-18.31 -13.15)"/><path className="cls-1" d="M438.85,55.85q-6.91,7.53-15.84,7.53a20,20,0,0,1-9.24-2.16,24.36,24.36,0,0,1-7.32-5.72,27,27,0,0,1-4.85-8.06,25.38,25.38,0,0,1-1.74-9.24,26.65,26.65,0,0,1,1.71-9.49,25.68,25.68,0,0,1,4.74-8,22.94,22.94,0,0,1,7.25-5.51,20.67,20.67,0,0,1,9.17-2.06,25.24,25.24,0,0,1,6.59.8,20.27,20.27,0,0,1,5.3,2.23,17.62,17.62,0,0,1,4.08,3.42A20.55,20.55,0,0,1,441.64,24l-3.77,2.51a16,16,0,0,0-6.35-6.77,18,18,0,0,0-8.86-2.16,15.71,15.71,0,0,0-7.43,1.75,17.9,17.9,0,0,0-5.65,4.64A21.21,21.21,0,0,0,406,30.56a24,24,0,0,0-1.26,7.71,22.21,22.21,0,0,0,1.43,8,21.06,21.06,0,0,0,3.94,6.59,19.21,19.21,0,0,0,5.89,4.5A16.36,16.36,0,0,0,423.36,59a17.35,17.35,0,0,0,8.09-2,24.65,24.65,0,0,0,7.39-6.24v-8.3h-11V38.69H443V63h-4.19Z" transform="translate(-18.31 -13.15)"/><path className="cls-1" d="M461.2,63V13.57H466V63Z" transform="translate(-18.31 -13.15)"/><path className="cls-1" d="M520.43,17.83H502.78V63H497.9V17.83H480.25V13.5h40.18Z" transform="translate(-18.31 -13.15)"/><path className="cls-1" d="M523.06,63,543.78,13.5h4L568.47,63h-5.23l-6.42-15.49H534.57L528.22,63ZM545.8,19.22,535.61,43.71h20.09Z" transform="translate(-18.31 -13.15)"/><path className="cls-1" d="M582.47,63V13.5h4.81V58.71H616V63Z" transform="translate(-18.31 -13.15)"/></svg>

          <span style={{'display' : 'inline-block', 'transform' : 'translateY(-2px)'}}>

          {currentUser.name ? (
            <Dropdown overlay={menu} >
              <span className={`${styles.action} ${styles.account}`}>
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />

          )}
          </span>

        </div>
      </div>
    );
  }
}
