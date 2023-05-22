import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginByEmailAndPassword } from "src/redux/slices/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);

  const LoginSubmit = (e) => {
    e.preventDefault();
    const formValues = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(loginByEmailAndPassword(formValues));
  };

  // useEffect(() => {
  //   if (isAuth) navigate("/app");
  // }, [isAuth, navigate]);

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="/" className="flex items-center mb-6">
          <img className="w-48 h-36" src="/logo/logo_full.png" alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              התחברות לממשק המשתמש
            </h1>

            {/* Form */}
            <form className="space-y-4 md:space-y-6" onSubmit={LoginSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  אימייל אלקטרוני
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@email.com"
                  required
                  ref={emailRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  סיסמה
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                  ref={passwordRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>

              {/* Btn */}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                התחברות
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
