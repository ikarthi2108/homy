import { useState } from "react";
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from "react-router-dom";
import axios from "axios";

interface FormData {
   name: string;
   email: string;
   mobile: string;
   password: string;
   otp?: string;
}

const RegisterForm = () => {
   const schema = yup
      .object({
         name: yup.string().required().label("Name"),
         email: yup.string().required().email().label("Email"),
         mobile: yup.string().required().label("Mobile"),
         password: yup.string().required().min(6).label("Password"),
         otp: yup.string().when('isOtpStep', {
            is: true,
            then: yup.string().required().label("OTP"),
         })
      })
      .required();

   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });

   const [isPasswordVisible, setPasswordVisibility] = useState(false);
   const [isOtpStep, setOtpStep] = useState(false);
   const [email, setEmail] = useState("");

   const togglePasswordVisibility = () => {
      setPasswordVisibility(!isPasswordVisible);
   };

   const onSubmit = async (data: FormData) => {
      try {
         if (!isOtpStep) {
            // Step 1: Register user and send OTP
            const response = await axios.post('http://localhost:5000/api/users/add', {
               name: data.name,
               email: data.email,
               mobile: data.mobile,
               password: data.password
            });

            if (response.data.message) {
               toast.success(response.data.message, { position: 'top-center' });
               setEmail(data.email);
               setOtpStep(true);
            }
         } else {
            // Step 2: Verify OTP
            const response = await axios.post('http://localhost:5000/api/users/verify-otp', {
               email: email,
               otp: data.otp
            });

            if (response.data.message) {
               toast.success(response.data.message, { position: 'top-center' });
               reset();
               setOtpStep(false);
               setEmail("");
            }
         }
      } catch (error: any) {
         toast.error(error.response?.data?.message || "Something went wrong", { position: 'top-center' });
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="row">
            {!isOtpStep ? (
               <>
                  <div className="col-12">
                     <div className="input-group-meta position-relative mb-25">
                        <label>Name*</label>
                        <input type="text" {...register("name")} placeholder="Your Name" />
                        <p className="form_error">{errors.name?.message}</p>
                     </div>
                  </div>
                  <div className="col-12">
                     <div className="input-group-meta position-relative mb-25">
                        <label>Email*</label>
                        <input type="email" {...register("email")} placeholder="Youremail@gmail.com" />
                        <p className="form_error">{errors.email?.message}</p>
                     </div>
                  </div>
                  <div className="col-12">
                     <div className="input-group-meta position-relative mb-25">
                        <label>Mobile*</label>
                        <input type="text" {...register("mobile")} placeholder="Your Mobile" />
                        <p className="form_error">{errors.mobile?.message}</p>
                     </div>
                  </div>
                  <div className="col-12">
                     <div className="input-group-meta position-relative mb-20">
                        <label>Password*</label>
                        <input type={isPasswordVisible ? "text" : "password"} {...register("password")} placeholder="Enter Password" className="pass_log_id" />
                        <span className="placeholder_icon">
                           <span className={`passVicon ${isPasswordVisible ? "eye-slash" : ""}`}>
                              <img onClick={togglePasswordVisibility} src="/assets/images/icon/icon_68.svg" alt="toggle visibility" />
                           </span>
                        </span>
                        <p className="form_error">{errors.password?.message}</p>
                     </div>
                  </div>
               </>
            ) : (
               <div className="col-12">
                  <div className="input-group-meta position-relative mb-25">
                     <label>OTP*</label>
                     <input type="text" {...register("otp")} placeholder="Enter OTP" />
                     <p className="form_error">{errors.otp?.message}</p>
                  </div>
               </div>
            )}

            <div className="col-12">
               <div className="agreement-checkbox d-flex justify-content-between align-items-center">
                  <div>
                     <input type="checkbox" id="remember2" />
                     <label htmlFor="remember2">By hitting the &quot;Register&quot; button, you agree to the <Link to="#">Terms & Conditions</Link> & <Link to="#">Privacy Policy</Link></label>
                  </div>
               </div>
            </div>
            <div className="col-12">
               <button type="submit" className="btn-two w-100 text-uppercase d-block mt-20">
                  {isOtpStep ? "VERIFY OTP" : "SIGN UP"}
               </button>
            </div>
         </div>
      </form>
   );
};

export default RegisterForm;
