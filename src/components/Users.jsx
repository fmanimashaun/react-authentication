import { useGetUsersQuery } from '../features/users/usersApiSlice';

const Users = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();


  // const navigate = useNavigate();
  // const location = useLocation();

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>{error?.message}</div>
      ) : isSuccess ? (
        <>
          <h1>Users</h1>
          {users?.length ? (
            <ul>
              {users.map((user) => (
                <li key={user._id}>{user.username}</li>
              ))}
            </ul>
          ) : (
            <p>No users to display</p>
          )}
        </>
      ) : null}
    </>
  );
};

export default Users;
