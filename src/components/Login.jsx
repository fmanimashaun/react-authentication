import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/authApiSlice';
import usePersist from '../hooks/usePersist';
import useInput from '../hooks/useInput';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [user, userAttribs, resetUser] = useInput('user','');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [persist, setPersist] = usePersist();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  // set focus on the user input when component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // clear the error message when user or pwd changes
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ username: user, password: pwd }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      resetUser();
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Invalid Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive">
            {errMsg}
          </p>

          <h1>Sign In with Redux</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              ref={userRef}
              autoComplete="off"
              {...userAttribs}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />

            <button type="submit">Sign In</button>
            <div className="persistCheck">
              <input
                type="checkbox"
                name="persist"
                id="persist"
                onChange={setPersist}
                checked={persist}
              />
              <label htmlFor="persist">Remember Me:</label>
            </div>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
