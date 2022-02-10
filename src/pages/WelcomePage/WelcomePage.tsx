import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

const Welcome = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <Outlet />
    </div>
  );
};
export default Welcome;

export const WelcomeName = () => {
  const { name } = useParams();
  return <p>Greetings {name}</p>;
};
