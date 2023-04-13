import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  if(sessionUser) console.log('user logged in **')

  return (
    <div className='headerBoxRight'>
      {sessionUser ? (
        <>
      <NavLink to={`/spots`}>
          Create a New Spot
        </NavLink>
        </>
      ) : (
        <>
        </>
      )}
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
    </div>
  );
}

export default Navigation;
