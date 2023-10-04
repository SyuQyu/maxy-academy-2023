import React, { useRef, useState, useEffect } from 'react';
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
  Button,
  Card,
  CardHeader,
  CardContent,
  f7
} from 'framework7-react';
import { checkUserLoggedIn } from '../services/auth';
import notes from '../services/notes'
import CardsComponents from '../components/cards';
import { data } from 'dom7';
const HomePage = () => {
  const [user, setUser] = useState(null);
  const notificationFull = useRef(null);
  const logOut = async () => {
    const logUserOut = await logout()
    if(logUserOut){
      setUser(null);
      showNotificationFull();
    }
  };
  var arrayData = [];
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


  const showNotificationFull = () => {
    // Create toast
    if (!notificationFull.current) {
      notificationFull.current = f7.notification.create({
        icon: '<i class="icon icon-f7"></i>',
        title: 'Notes',
        titleRightText: 'now',
        subtitle: 'goodbye :)',
        text: 'successfuly logout',
        closeTimeout: 3000,
      });
    }
    // Open it
    notificationFull.current.open();
  };

  const onPageBeforeOut = () => {
    f7.notification.close();
  };
  const onPageBeforeRemove = () => {
    // Destroy toasts when page removed
    if (notificationFull.current) notificationFull.current.destroy();
  };

  const getNotes = () => {
    notes.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arrayData.push(doc.data());
    });
    return notes;
  };

  useEffect(() => {
    checkUser();
    if (user) {
      getNotes();
    }
  }, []);

  return (
    <Page name="home" onPageBeforeOut={onPageBeforeOut} onPageBeforeRemove={onPageBeforeRemove}>
      {
        console.log(getNotes(), 'dataNotes', user, 'user')
      }
      {/* Top Navbar */}
      <Navbar large sliding={false}>
        {
          user !== null ? (
            <>
              <NavTitle sliding>Notes, Hi {user.email}</NavTitle>
              <NavTitleLarge>Notes, Hi {user.email}</NavTitleLarge>
            </>
          ) : (
            <>
              <NavTitle sliding>Notes</NavTitle>
              <NavTitleLarge>Notes</NavTitleLarge>
            </>
          )
        }
        <NavRight className="grid grid-cols-2 grid-gap">
          {
            user !== null ? (
              <Button fill onClick={logOut}>Logout</Button>
            ) : null
          }
          {
            user !== null ? null : (
              <>
                <Button fill loginScreenOpen="#my-login-screen">Login</Button>
                <Button fill loginScreenOpen="#my-register-screen">Register</Button>
              </>
            )
          }
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
        <ListItem link="/camera/" title="Access Camera" />
        <ListItem link="/location/" title="Access Location" />
      </List>
      <BlockTitle>Notes</BlockTitle>
      <Block>
        {
          user !== null ? (
            <div className="grid grid-cols-2 medium-grid-cols-4 grid-gap">
              {
                arrayData.map((doc) => {
                  console.log(doc, 'doc.data()');
                  return (
                    <CardsComponents data={doc} />
                  )
                })
              }
            </div>
          ) : (
            "You are not logged in"
          )
        }
      </Block>
    </Page>
  );
}
export default HomePage;