import React from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Navbar from '../components/Navbar'


function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
      <>
        <Navbar />
        <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
      </>
    )
}

export default withPageAuthRequired(Profile, {
    onRedirecting: () => <div>loading...</div>,
    onError: error => <div>error... idiot</div>
});