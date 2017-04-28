import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Flex } from 'reflexbox';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import AppFooter from '../shared-components/AppFooter';
import Navbar from '../shared-components/Navbar';
import { actions as authActions, selectors as authSelectors } from '../auth';
import HomePage from '../shared-components/HomePage';
import BooksPage from '../books/BooksPage';
import NotFoundPage from '../shared-components/NotFoundPage';
import ScrollToTop from '../shared-components/ScrollToTop';
import GaTracker from '../shared-components/GaTracker';
import RestrictedPage from '../auth/RestrictedPage';

import { toggleDropdown, toggleDrawer } from './reducer';
import { getIsDropdownOpen, getIsDrawerOpen } from './selectors';

const App = ({ history, isDropdownOpen, profile, actions }) => (
  <ConnectedRouter history={history}>
    <GaTracker>
      <ScrollToTop>
        <Flex column style={{ height: '100%' }}>
          <Navbar
            profile={profile}
            handleLogin={() => actions.loginRequest()}
            handleLogout={() => actions.logout()}
            onToggleDropdown={() => actions.toggleDropdown()}
            onToggleDrawer={() => actions.toggleDrawer()}
            isDropdownOpen={isDropdownOpen}
          />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/books">
              <RestrictedPage>
                <BooksPage />
              </RestrictedPage>
            </Route>
            <Route component={NotFoundPage} />
          </Switch>
          <AppFooter />
        </Flex>
      </ScrollToTop>
    </GaTracker>
  </ConnectedRouter>
);

App.propTypes = {
  isDropdownOpen: PropTypes.bool.isRequired,
  profile: PropTypes.object,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

App.defaultProps = {
  profile: null,
};

const mapStateToProps = state => (
  {
    isDropdownOpen: getIsDropdownOpen(state),
    isDrawerOpen: getIsDrawerOpen(state),
    profile: authSelectors.getProfile(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({ toggleDropdown, toggleDrawer, ...authActions }, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
