import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import * as queryString from 'query-string'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from './actions.js'

export function LoginCallback() {
  const location = useLocation()
  let history = useHistory()
  const { code } = queryString.parse(location.search)
  let [userData, setUserData] = useState({
    email: '',
    name: '',
    username: '',
  })
  let dispatch = useDispatch()

  useEffect(() => {
    async function fetchData(code) {
      const { data } = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: 'post',
        data: {
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
          redirect_uri: 'http://localhost:3000/auth/redirect',
          grant_type: 'authorization_code',
          code,
        },
      })

      const { data: fetchedUserData } = await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      })
      setUserData({
        ...userData,
        email: fetchedUserData.email,
        name: fetchedUserData.name,
      })
    }
    fetchData(code)
  }, [])

  async function handleSubmit() {
    const {
      data: { found: userExists },
    } = await axios.get(
      `http://localhost:8000/api/auth/check?username=${userData.username}`,
    )
    if (!userExists) {
      const { data } = await axios({
        url: 'http://localhost:8000/api/auth/login',
        method: 'post',
        data: userData,
      })
      localStorage.setItem('woyl-token', data.token)
      dispatch(login(data.user))
      history.push('/dashboard')
    }
  }

  return (
    <div className="w-full max-w-xs mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            value={userData.name}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            value={userData.email}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
            value={userData.username}
          />
        </div>
        <div className="flex items-center mx-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => handleSubmit()}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}
