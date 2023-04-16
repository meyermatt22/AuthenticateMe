import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  if(sessionUser) console.log('user logged in **')

  return (
    <div id='headerBoxRight'>
      {sessionUser ? (
        <div id='createSpotButton'>
      <NavLink to={`/spots/new`} id='createSpotButton'>
          Create a New Spot
        </NavLink>
        </div>
      ) : (
        <>
        </>
      )}
    <ul>

      {isLoaded && (
        <div id='profileArea'>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </ul>
    </div>
  );
}

export default Navigation;
