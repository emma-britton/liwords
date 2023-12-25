import React from 'react';

import { Link } from 'react-router-dom';
import './topbar.scss';
import { DisconnectOutlined, SettingOutlined } from '@ant-design/icons';
import { notification, Dropdown } from 'antd';
import {
  useLoginStateStoreContext,
  useResetStoreContext,
  useTournamentStoreContext,
} from '../store/store';
import { LoginModal } from '../lobby/login';
import { useMountedState } from '../utils/mounted';
import { isClubType } from '../store/constants';
import { flashError, useClient } from '../utils/hooks/connect';
import { AuthenticationService } from '../gen/api/proto/user_service/user_service_connectweb';

const TopMenu = React.memo((props: Props) => {
  const playMenuItems = [
    {
      key: 'omgwords',
      label: (
        <Link to="/" className="plain">
          OMGWords
        </Link>
      ),
    },
    {
      key: 'editor',
      label: (
        <Link to="/editor" className="plain">
          Board editor
        </Link>
      ),
    },
    {
      key: 'anagrams',
      label: (
        <a
          href="//anagrams.mynetgear.com/"
          target="_blank"
          className="plain"
          rel="noopener noreferrer"
        >
          Anagrams
        </a>
      ),
    },
    {
      key: 'licensetospell',
      label: (
        <a
          href="https://seattlephysicstutor.com/plates.html"
          className="plain"
          target="_blank"
          rel="noopener noreferrer"
        >
          License to Spell
        </a>
      ),
    },
  ];

  const studyMenuItems = [
    {
      label: (
        <a
          href="https://aerolith.org"
          className="plain"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aerolith
        </a>
      ),
      key: 'aerolith',
    },
    {
      label: (
        <a
          href="http://randomracer.com/"
          className="plain"
          target="_blank"
          rel="noopener noreferrer"
        >
          Random Racer
        </a>
      ),
      key: 'randomracer',
    },
    {
      key: 'wordtree',
      label: (
        <a
          href="https://seattlephysicstutor.com/tree.html"
          className="plain"
          target="_blank"
          rel="noopener noreferrer"
        >
          Word Tree
        </a>
      ),
    },
  ];

  const aboutMenuItems = [
    {
      key: 'team',
      label: (
        <Link className="plain" to="/team">
          Meet the Woogles team
        </Link>
      ),
    },
    {
      key: 'tos',
      label: (
        <Link className="plain" to="/terms">
          Terms of Service
        </Link>
      ),
    },
  ];

  return (
    <div className="top-header-menu">
      <div>
        <Dropdown
          overlayClassName="user-menu"
          menu={{ items: playMenuItems }}
          placement="bottom"
          trigger={['click']}
          getPopupContainer={() =>
            document.getElementById('root') as HTMLElement
          }
        >
          <p>Play</p>
        </Dropdown>
      </div>
      <div>
        <a href="/puzzle">Puzzles</a> {/* why isn't this a Link? */}
      </div>
      <div>
        <Dropdown
          overlayClassName="user-menu"
          menu={{ items: studyMenuItems }}
          placement="bottom"
          trigger={['click']}
          getPopupContainer={() =>
            document.getElementById('root') as HTMLElement
          }
        >
          <p>Study</p>
        </Dropdown>
      </div>
      <div>
        <a href="https://blog.woogles.io">Blog</a>
      </div>
      <div className="top-header-left-frame-special-land">
        <Dropdown
          overlayClassName="user-menu"
          menu={{ items: aboutMenuItems }}
          placement="bottom"
          trigger={['click']}
          getPopupContainer={() =>
            document.getElementById('root') as HTMLElement
          }
        >
          <p>About</p>
        </Dropdown>
      </div>
    </div>
  );
});

type Props = {
  tournamentID?: string;
};

export const TopBar = React.memo((props: Props) => {
  const { useState } = useMountedState();

  const { loginState } = useLoginStateStoreContext();
  const { resetStore } = useResetStoreContext();
  const { tournamentContext } = useTournamentStoreContext();
  const { username, loggedIn, connectedToSocket } = loginState;
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const authClient = useClient(AuthenticationService);

  const handleLogout = async () => {
    try {
      await authClient.logout({});
      notification.info({
        message: 'Success',
        description: 'You have been logged out.',
      });
      resetStore();
    } catch (e) {
      flashError(e);
    }
  };

  const userMenuItems = [
    {
      label: (
        <Link className="plain" to={`/profile/${encodeURIComponent(username)}`}>
          Profile
        </Link>
      ),
      key: 'profile',
    },
    {
      label: (
        <Link className="plain" to={`/settings`}>
          Settings
        </Link>
      ),
      key: 'settings',
    },
    {
      label: (
        <a className="plain" href="/clubs">
          Clubs
        </a>
      ),
      key: 'clubs',
    },
    {
      label: (
        <a className="plain" href="/donate">
          Donate
        </a>
      ),
      key: 'donate',
    },
    {
      label: 'Log out',
      key: 'logout',
    },
  ];

  const homeLink = props.tournamentID ? tournamentContext.metadata?.slug : '/';

  return (
    <nav className="top-header" id="main-nav">
      <div className="container">
        <Link
          to={homeLink}
          className={`logo${props.tournamentID ? ' tournament-mode' : ''}`}
        >
          <div className="site-icon-rect">
            <div className="site-icon-w">W</div>
          </div>

          <div className="site-name">Woogles.io</div>
          {props.tournamentID ? (
            <div className="tournament">
              Back to
              {isClubType(tournamentContext.metadata?.type)
                ? ' Club'
                : ' Tournament'}
            </div>
          ) : null}
        </Link>
        <TopMenu />
        {loggedIn ? (
          <div className="user-info">
            <Dropdown
              overlayClassName="user-menu"
              menu={{
                items: userMenuItems,
                onClick: ({ key }) => {
                  if (key === 'logout') {
                    handleLogout();
                  }
                },
              }}
              trigger={['click']}
              placement="bottomRight"
              getPopupContainer={() =>
                document.getElementById('root') as HTMLElement
              }
            >
              <button className="link">
                {username}
                <SettingOutlined />
              </button>
            </Dropdown>
            {!connectedToSocket ? (
              <DisconnectOutlined style={{ color: 'red', marginLeft: 5 }} />
            ) : null}
          </div>
        ) : (
          <div className="user-info">
            <button className="link" onClick={() => setLoginModalVisible(true)}>
              Log In
            </button>
            <Link to="/register">
              <button className="primary">Sign Up</button>
            </Link>
            <LoginModal {...{ loginModalVisible, setLoginModalVisible }} />
          </div>
        )}
      </div>
    </nav>
  );
});
