import React, { Fragment, useState } from "react";
import { signupReq } from "./fetchApi";
import { useSnackbar } from 'notistack';

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    userRole: "",
    error: false,
    loading: false,
    success: false,
  });

  const { enqueueSnackbar } = useSnackbar();

  const alert = (msg, type) => (
    <div className={`text-sm text-${type}-500`}>{msg}</div>
  );

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    if (data.cPassword !== data.password) {
      return setData({
        ...data,
        error: {
          cPassword: "Password doesn't match",
          password: "Password doesn't match",
        },
      });
    }

    try {
      let responseData = await signupReq({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
        userRole: parseInt(data.userRole), // important: convert to number
      });

      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
          cPassword: "",
        });
      } else if (responseData.success) {
        setData({
          success: responseData.success,
          name: "",
          email: "",
          password: "",
          cPassword: "",
          userRole: "",
          loading: false,
          error: false,
        });
        enqueueSnackbar('Account Created Successfully..!', { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="text-center text-2xl mb-6">Register</div>
      <form className="space-y-4">
        {data.success ? alert(data.success, "green") : ""}
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name">Name*</label>
          <input
            value={data.name}
            onChange={(e) =>
              setData({ ...data, success: false, error: {}, name: e.target.value })
            }
            className={`px-4 py-2 border ${data.error.name ? "border-red-500" : ""}`}
          />
          {data.error.name && alert(data.error.name, "red")}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email">Email*</label>
          <input
            value={data.email}
            onChange={(e) =>
              setData({ ...data, success: false, error: {}, email: e.target.value })
            }
            className={`px-4 py-2 border ${data.error.email ? "border-red-500" : ""}`}
          />
          {data.error.email && alert(data.error.email, "red")}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            value={data.password}
            onChange={(e) =>
              setData({ ...data, success: false, error: {}, password: e.target.value })
            }
            className={`px-4 py-2 border ${data.error.password ? "border-red-500" : ""}`}
          />
          {data.error.password && alert(data.error.password, "red")}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label htmlFor="cPassword">Confirm Password*</label>
          <input
            type="password"
            value={data.cPassword}
            onChange={(e) =>
              setData({ ...data, success: false, error: {}, cPassword: e.target.value })
            }
            className={`px-4 py-2 border ${data.error.cPassword ? "border-red-500" : ""}`}
          />
          {data.error.cPassword && alert(data.error.cPassword, "red")}
        </div>

        {/* Role Selector */}
        <div className="flex flex-col">
          <label htmlFor="userRole">Select Role*</label>
          <select
            value={data.userRole}
            onChange={(e) =>
              setData({ ...data, success: false, error: {}, userRole: e.target.value })
            }
            className={`px-4 py-2 border ${data.error.userRole ? "border-red-500" : ""}`}
          >
            <option value="">-- Select Role --</option>
            <option value="0">User</option>
            <option value="1">Admin</option>
          </select>
          {data.error.userRole && alert(data.error.userRole, "red")}
        </div>

        {/* Submit Button */}
        <div
          onClick={formSubmit}
          className="px-4 py-2 bg-black text-white text-center cursor-pointer"
        >
          Create an account
        </div>
      </form>
    </Fragment>
  );
};

export default Signup;
