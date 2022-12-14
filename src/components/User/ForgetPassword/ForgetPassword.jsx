import React, { Fragment, useEffect, useState } from "react";
import "./ForgetPassword.css";

// import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { MdMailOutline } from 'react-icons/md'
// import Loader from "../../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Loader from "../../Loader/Loader";

// import { useAlert } from "react-alert";
// import MetaData from "../../layout/MetaData";

function ForgetPassword() {
    const dispatch = useDispatch();
    // const alert = useAlert();
    const navigate = useNavigate();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));

    };

    useEffect(() => {

        if (error) {
            toast.error(error.message);
            dispatch(clearErrors());
        }

        if (message !== undefined) {
            toast.success(message);
        }
    }, [dispatch, error, alert, message]);

    return (
        <>
        {loading ? (
            <Loader/>
        )
    :
(
  
                <Fragment>
                    {/* <MetaData title="Forgot Password" /> */}
                    <div className="forgotPasswordContainer">
                        <div className="forgotPasswordBox">
                            <h2 className="forgotPasswordHeading">Forgot Password</h2>
                            <form
                                action=""
                                className="forgotPasswordForm"
                                onSubmit={forgotPasswordSubmit}
                            >
                                <div className="forgotPasswordEmail">
                                        <MdMailOutline />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Send"
                                    className="forgotPasswordBtn"
                                />
                                {/* //disabled = {loading ? true : false} */}
                            </form>
                        </div>
                    </div>
                </Fragment>
                )}
        </>  
          );
}

export default ForgetPassword;
