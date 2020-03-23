import * as queryString from 'query-string';
import React from 'react'

const stringifiedParams = queryString.stringify({
  client_id: '774648009457-on61oomjuk44beuqaga91kf2ucbdetda.apps.googleusercontent.com',
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
  return (
    <div>
      <button>
        <a href={googleLoginUrl}>Login to google</a>
      </button>
    </div>
  )
}