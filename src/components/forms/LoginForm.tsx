import { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const navigate = useNavigate();

  const schema = yup
    .object({
      email: yup.string().required().email().label("Email"),
      password: yup.string().required().label("Password"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Login successful", { position: "top-center" });
        localStorage.setItem("token", result.token); // Store token in localStorage
        localStorage.setItem("userId",result.userID)
        onSuccess(); // Close the modal
        navigate("/"); // Navigate to dashboard
        window.location.reload();
      } else {
        toast.error(result.message, { position: "top-center" });
      }
    } catch (error) {
      toast.error("An error occurred", { position: "top-center" });
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Email*</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Youremail@gmail.com"
            />
            <p className="form_error">{errors.email?.message}</p>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Password*</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              {...register("password")}
              placeholder="Enter Password"
            />
            <span className="placeholder_icon">
              <span
                className={`passVicon ${isPasswordVisible ? "eye-slash" : ""}`}
              >
                <img
                  onClick={togglePasswordVisibility}
                  src="/assets/images/icon/icon_68.svg"
                  alt=""
                />
              </span>
            </span>
            <p className="form_error">{errors.password?.message}</p>
          </div>
        </div>
        <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Keep me logged in</label>
            </div>
            <Link to="/forgot-password">Forget Password?</Link>
          </div>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn-two w-100 text-uppercase d-block mt-20"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
