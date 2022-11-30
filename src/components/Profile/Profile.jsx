import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./Profile.css";
import Footer from '../../components/Footer'

function Profile() {
    const navigate = useNavigate();
    // const state = useSelector((state) => state.user);
    const { isAuthenticated, user, loading } = useSelector((state) => state.user);

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigate("/register");
    //     }
    // }, [isAuthenticated]);

    return (

        <>

            <div className="profileContainer ">
                <div>
                    <h1 className="text-xl">My profile</h1>
                    <img src={user?.avatar?.url} alt={user?.name} />
                    <Link to="/user/account/update"> Edit Profile</Link>
                </div>
                <div>
                    <div>
                        <h4>Full Name</h4>
                        <p>{user?.name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{user?.email}</p>
                    </div>
                    <div>
                        <h4>Phone </h4>
                        <p
                            className={
                                user && user?.verified?.phone === true
                                    ? "greenColor"
                                    : "tooltip"
                            }
                        >
                            {user?.phone}
                            <a
                                href="/user/verify/phone"
                                hidden={user && user?.verified?.phone === true ? true : false}
                            >
                                {" "}
                                <span class="tooltiptext">
                                    Verify Your Phone Number
                                </span>{" "}
                            </a>
                        </p>
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        <p>{String(user?.joinedOn).substr(0, 10)}</p>
                    </div>
                    <div>
                        {user?.role == "user" ?
                            <Link to="/user/orders">My Orders</Link>
                            : null}
                        <Link to="/user/account/password/update">Change Password</Link>
                    </div>
                </div>
                
            </div>
  
        </>

        //     )}
        // </Fragment>
    );
}
export default Profile;