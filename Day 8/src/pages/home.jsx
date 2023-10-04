import React from 'react';
import { useState, useEffect } from 'react';
import { logout } from '../services/auth';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Button
} from 'framework7-react';
import { checkUserLoggedIn } from '../services/auth';
const HomePage = () => {
  const [user, setUser] = useState(null);

  const logOut = async () => {
    logout()
    setUser(null);
  };

  const checkUser = async () => {
    try {
      const user = await checkUserLoggedIn();
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking user login:', error);
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Page name="home">
      {
        console.log(user)
      }
      {/* Top Navbar */}
      <Navbar large sliding={false}>
        {
          user !== null ? (
            <>
              <NavTitle sliding>firebaseAuth, Hi {user.email}</NavTitle>
              <NavTitleLarge>firebaseAuth, Hi {user.email}</NavTitleLarge>
            </>
          ) : (
            <>
              <NavTitle sliding>firebaseAuth</NavTitle>
              <NavTitleLarge>firebaseAuth</NavTitleLarge>
            </>
          )
        }
        <NavRight className="grid grid-cols-2 grid-gap">
          {
            user !== null ? (
              <Button fill onClick={logOut}>Logout</Button>
            ) : null
          }
          <Button fill loginScreenOpen="#my-login-screen">Login</Button>
          <Button fill loginScreenOpen="#my-register-screen">Register</Button>
        </NavRight>
      </Navbar>
      {/* Toolbar */}
      <Toolbar bottom>
        <Link>Left Link</Link>
        <Link>Right Link</Link>
      </Toolbar>
      {/* Page content */}
      <Block>
        <p>Here is your blank Framework7 app. Let's see what we have here.</p>
        {
          user ?
            (
              <>
                <p>You are logged in as {user.displayName} {user.email}</p>
              </>

            ) : (
              <p>user is not signed in</p>
            )
        }
      </Block>
      <BlockTitle>Navigation</BlockTitle>
      <List strong inset dividersIos>
        <ListItem link="/about/" title="About" />
        <ListItem link="/form/" title="Form" />
      </List>

      <BlockTitle>Modals</BlockTitle>
      <Block className="grid grid-cols-2 grid-gap">
        <Button fill popupOpen="#my-popup">Popup</Button>
        <Button fill loginScreenOpen="#my-login-screen">Login Screen</Button>
      </Block>

      <BlockTitle>Panels</BlockTitle>

      <List strong inset dividersIos>
        <ListItem
          title="Dynamic (Component) Route"
          link="/dynamic-route/blog/45/post/125/?foo=bar#about"
        />
        <ListItem
          title="Default Route (404)"
          link="/load-something-that-doesnt-exist/"
        />
        <ListItem
          title="Request Data & Load"
          link="/request-and-load/user/123456/"
        />
      </List>
      <List strong inset dividersIos>
        <ListItem
          title="Dynamic (Component) Route"
          link="/dynamic-route/blog/45/post/125/?foo=bar#about"
        />
        <ListItem
          title="Default Route (404)"
          link="/load-something-that-doesnt-exist/"
        />
        <ListItem
          title="Request Data & Load"
          link="/request-and-load/user/123456/"
        />
      </List>
    </Page>
  );
}
export default HomePage;