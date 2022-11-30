import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProfile.css";

import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    loadUser,
    updateProfile,
} from ".././../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { ToastContainer, toast } from 'react-toastify';
import { BsFillPersonFill, BsFillTelephoneFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi"
import Footer from "../../components/Footer";
function UpdateProfile() {
    const dispatch = useDispatch();
    //const alert = useAlert();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    console.log(user.role,"role")
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("phone", phone);
        myForm.set("avatar", avatar);

        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setName(user?.name);
            setEmail(user?.email);
            setPhone(user?.phone);
            setAvatarPreview(user?.avatar?.url);
        }

        if (error) {
          toast.error(error.message);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Profile Updated Successfully");
            if (user.role == "user") {
                navigate("/user/account");
            }
            else {
                navigate("/admin/account");
            }
            // navigate("/account")
            dispatch(loadUser());
            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error,  navigate, user, isUpdated]);

    return (
        // <Fragment>
        //     {loading ? (
        //         <Loader />
        //     ) : (
                <Fragment>
                    {/* <MetaData title="Update Profile" /> */}
                    <div className="container updateProfileContainer">
                        <div className="updateProfileBox ">
                            <h2 className="updateProfileHeading">Update Profile</h2>
                            <form
                                action=""
                                className="updateProfileForm"
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div className="updateProfileName">
                            <BsFillPersonFill />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileEmail">
                            <HiOutlineMail />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfilePhone">
                            <BsFillTelephoneFill />
                                    <input
                                        type="number"
                                        placeholder="Mobile Number"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                                <div id="updateProfileImage">
                                    <img src={avatarPreview} alt="Avatar Priview" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProfileDataChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Save"
                                    className="updateProfileBtn"
                                />
                                {/* //disabled = {loading ? true : false} */}
                            </form>
                         </div>
     
                    </div>
            <Footer />
                </Fragment>
        //     )}
        // </Fragment>
    );
}

export default UpdateProfile;