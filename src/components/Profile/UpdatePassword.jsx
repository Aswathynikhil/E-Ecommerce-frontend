import React, { Fragment, useEffect, useState } from "react";
import "./UpdatePassword.css";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    updatePassword,
} from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { ToastContainer, toast } from 'react-toastify';
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import Footer from "../../components/Footer";

function UpdatePassword() {

    const dispatch = useDispatch();
    //const alert = useAlert();
    const navigate = useNavigate();


    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const { user } = useSelector((state) => state.user);
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);


        dispatch(updatePassword(myForm));
    };

    useEffect(() => {
        if (error) {
           toast.error(error.message);
            dispatch(clearErrors());
        }

        if (isUpdated) {
           toast.success("Profile Updated Successfully");
            if (user.role == "user") {
              navigate("/user/account")  ;
            }
            else {
                navigate("/admin/account"); 
            }
        
         
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, alert, navigate, isUpdated]);


    return (

        // <Fragment>
        //     {loading ? (
        //         <Loader />
        //     ) : (
                <Fragment>
                    {/* <MetaData title="Change Password" /> */}
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Change Password</h2>
                            <form
                                action=""
                                className="updatePasswordForm"
                                encType="multipart/form-data"
                                onSubmit={updatePasswordSubmit}
                            >

                                <div className="loginPassword">
                            <RiLockPasswordFill />
                                    <input
                                        type="password"
                                        placeholder="Old Password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
                            <RiLockPasswordLine />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
                            <RiLockPasswordLine />
                                    <input
                                        type="password"
                                        placeholder="Confrim Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>



                                <input
                                    type="submit"
                                    value="Save"
                                    className="updatePasswordBtn"
                                />
                                {/* //disabled = {loading ? true : false} */}
                            </form>
                        </div>
            </div>
            <Footer/>
                </Fragment>
        //     )}
        // </Fragment>

    )
}

export default UpdatePassword