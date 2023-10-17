import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log('Reauthenticating...');

    // send the refresh request again
    const refreshResult = await baseQuery('/refresh', api, extraOptions);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;

      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      
      // retry the initial request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // if the refresh request fails, logout
      console.log('logging out...');
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});