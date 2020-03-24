import * as queryString from 'query-string';
import React from 'react';

const stringifiedParams = queryString.stringify({
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: 'http://localhost:3000/auth/redirect',
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '), // space seperated string
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});

const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

export function Login() {
  console.log(process.env.REACT_APP_CLIENT_ID);
  return (
    <div>
      <button>
        <a href={googleLoginUrl}>Login to google</a>
      </button>
    </div>
  );
}
