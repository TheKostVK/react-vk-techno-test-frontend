import React from "react";

import {selectIsAuth} from "../../redux/slices/auth";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";


export const Profile = () => {
    const isAuth = useSelector(selectIsAuth);
    const userData = useSelector(state => state.auth.data);

    if (!window.localStorage.getItem("token") && !isAuth) {
        return <Navigate to={"/login"}/>;
    }

    return (
        <>
            <div className={"w-56 mr-2 flex-shrink-0"}>

                <div className={"bg-white rounded border p-3 pb-1.5 mb-4"}>

                    <div className={"position-relative group"}>
                        <img
                            src={userData.avatarUrl || "/ui/profile/noAvatar.png"}
                            alt={userData.userName}
                            className={"rounded-sm"}
                            style={{
                                width: "auto",
                                height: "250px",
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                        />
                        <div className={"position-absolute top-0 right-0"}>
                            <button className={"bg-black text-white rounded-tr rounded-bl focus:outline-none"}>
                                <svg className={"w-6"}
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div>
                        <button type="button"
                                className={"bg-gray-200 rounded-sm w-full my-2 py-1 text-gray-500 hover:text-gray-400"}>
                            Редактировать
                        </button>
                    </div>
                </div>


                <div className={"bg-white rounded border mb-4"}>
                    <div className={"flex justify-content-between align-items-center"}>
                        <div className={"px-3 pt-2"}>
                            Друзья
                            <span className={"text-gray-500 pl-2"}>
                                52
                            </span>
                        </div>
                    </div>
                    <div className={"grid grid-cols-3 gap-3 p-3"}>
                        <div>
                            <div className={"px-1"}>
                                <img className={"rounded-full"} src={"/ui/profile/noavatar.png"} alt={"Аватар"}/>
                            </div>
                            <div className={"text-center text-truncate"}>
                                <div className={"text-blue-900 hover:underline"}>
                                    Name1
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={"px-1"}>
                                <img className={"rounded-full"} src={"/ui/profile/noavatar.png"} alt={"Аватар"}/>
                            </div>
                            <div className={"text-center text-truncate"}>
                                <div className={"text-blue-900 hover:underline"}>
                                    Name2
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={"px-1"}>
                                <img className={"rounded-full"} src={"/ui/profile/noavatar.png"} alt={"Аватар"}/>
                            </div>
                            <div className={"text-center text-truncate"}>
                                <div className={"text-blue-900 hover:underline"}>
                                    Name3
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={"px-1"}>
                                <img className={"rounded-full"} src={"/ui/profile/noavatar.png"} alt={"Аватар"}/>
                            </div>
                            <div className={"text-center text-truncate"}>
                                <div className={"text-blue-900 hover:underline"}>
                                    Name4
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={"px-1"}>
                                <img className={"rounded-full"} src={"/ui/profile/noavatar.png"} alt={"Аватар"}/>
                            </div>
                            <div className={"text-center text-truncate"}>
                                <div className={"text-blue-900 hover:underline"}>
                                    Name5
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className={"w-full"}>
                <div className={"bg-white w-full rounded border p-4 mb-4"}>
                    UserInfo
                </div>
            </div>

            {/*<section style={{ backgroundColor: "#eee" }}>*/}
            {/*  <div className="container py-5">*/}
            {/*    <div className="row">*/}
            {/*      <div className="col-lg-4">*/}
            {/*        <div className="card mb-4">*/}
            {/*          <div className="card-body text-center">*/}
            {/*            {userData.avatarUrl && (*/}
            {/*              <>*/}
            {/*                <img*/}
            {/*                  src={userData.avatarUrl}*/}
            {/*                  alt="avatar"*/}
            {/*                  className="rounded-circle img-fluid"*/}
            {/*                  style={{*/}
            {/*                    width: "150px",*/}
            {/*                    height: "150px",*/}
            {/*                    objectFit: "cover",*/}
            {/*                    objectPosition: "center",*/}
            {/*                  }}*/}
            {/*                />*/}
            {/*              </>*/}
            {/*            )}*/}
            {/*            <h5 className="my-3">{userData.userName}</h5>*/}
            {/*            /!*<p className="text-muted mb-1">Full Stack Developer</p>*!/*/}
            {/*            /!*<p className="text-muted mb-4">Bay Area, San Francisco, CA</p>*!/*/}
            {/*            /!*<div className="d-flex justify-content-center mb-2">*!/*/}
            {/*            /!*  <button type="button" className="btn btn-primary">Follow</button>*!/*/}
            {/*            /!*  <button type="button" className="btn btn-outline-primary ms-1">Message</button>*!/*/}
            {/*            /!*</div>*!/*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*        /!*<div className="card mb-4 mb-lg-0">*!/*/}
            {/*        /!*  <div className="card-body p-0">*!/*/}
            {/*        /!*    <ul className="list-group list-group-flush rounded-3">*!/*/}
            {/*        /!*      <li className="list-group-item d-flex justify-content-between align-items-center p-3">*!/*/}
            {/*        /!*        <i className="fas fa-globe fa-lg text-warning"></i>*!/*/}
            {/*        /!*        <p className="mb-0">https://mdbootstrap.com</p>*!/*/}
            {/*        /!*      </li>*!/*/}
            {/*        /!*      <li className="list-group-item d-flex justify-content-between align-items-center p-3">*!/*/}
            {/*        /!*        <i className="fab fa-github fa-lg" style={{ color: "#333333" }}></i>*!/*/}
            {/*        /!*        <p className="mb-0">mdbootstrap</p>*!/*/}
            {/*        /!*      </li>*!/*/}
            {/*        /!*      <li className="list-group-item d-flex justify-content-between align-items-center p-3">*!/*/}
            {/*        /!*        <i className="fab fa-twitter fa-lg" style={{ color: "#55acee" }}></i>*!/*/}
            {/*        /!*        <p className="mb-0">@mdbootstrap</p>*!/*/}
            {/*        /!*      </li>*!/*/}
            {/*        /!*      <li className="list-group-item d-flex justify-content-between align-items-center p-3">*!/*/}
            {/*        /!*        <i className="fab fa-instagram fa-lg" style={{ color: "#ac2bac" }}></i>*!/*/}
            {/*        /!*        <p className="mb-0">mdbootstrap</p>*!/*/}
            {/*        /!*      </li>*!/*/}
            {/*        /!*      <li className="list-group-item d-flex justify-content-between align-items-center p-3">*!/*/}
            {/*        /!*        <i className="fab fa-facebook-f fa-lg" style={{ color: "#3b5998" }}></i>*!/*/}
            {/*        /!*        <p className="mb-0">mdbootstrap</p>*!/*/}
            {/*        /!*      </li>*!/*/}
            {/*        /!*    </ul>*!/*/}
            {/*        /!*  </div>*!/*/}
            {/*        /!*</div>*!/*/}
            {/*      </div>*/}
            {/*      <div className="col-lg-8">*/}
            {/*        <div className="card mb-4">*/}
            {/*          <div className="card-body">*/}
            {/*            <div className="row">*/}
            {/*              <div className="col-sm-3">*/}
            {/*                <p className="mb-0">Логин</p>*/}
            {/*              </div>*/}
            {/*              <div className="col-sm-9">*/}
            {/*                <p className="text-muted mb-0">*/}
            {/*                  {userData.userName}*/}
            {/*                </p>*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            <hr />*/}
            {/*            <div className="row">*/}
            {/*              <div className="col-sm-3">*/}
            {/*                <p className="mb-0">Email</p>*/}
            {/*              </div>*/}
            {/*              <div className="col-sm-9">*/}
            {/*                <p className="text-muted mb-0">{userData.email}</p>*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            /!*<hr />*!/*/}
            {/*            /!*<div className="row">*!/*/}
            {/*            /!*  <div className="col-sm-3">*!/*/}
            {/*            /!*    <p className="mb-0">Phone</p>*!/*/}
            {/*            /!*  </div>*!/*/}
            {/*            /!*  <div className="col-sm-9">*!/*/}
            {/*            /!*    <p className="text-muted mb-0">(097) 234-5678</p>*!/*/}
            {/*            /!*  </div>*!/*/}
            {/*            /!*</div>*!/*/}
            {/*            /!*<hr />*!/*/}
            {/*            /!*<div className="row">*!/*/}
            {/*            /!*  <div className="col-sm-3">*!/*/}
            {/*            /!*    <p className="mb-0">Mobile</p>*!/*/}
            {/*            /!*  </div>*!/*/}
            {/*            /!*  <div className="col-sm-9">*!/*/}
            {/*            /!*    <p className="text-muted mb-0">(098) 765-4321</p>*!/*/}
            {/*            /!*  </div>*!/*/}
            {/*            /!*</div>*!/*/}
            {/*            /!*<hr />*!/*/}
            {/*            /!*<div className="row">*!/*/}
            {/*            /!*  <div className="col-sm-3">*!/*/}
            {/*            /!*    <p className="mb-0">Address</p>*!/*/}
            {/*            /!*  </div>*!/*/}
            {/*            /!*  <div className="col-sm-9">*!/*/}
            {/*            /!*    <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>*!/*/}
            {/*            /!*  </div>*!/*/}
            {/*            /!*</div>*!/*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*        /!*<div className="row">*!/*/}
            {/*        /!*  <div className="col-md-6">*!/*/}
            {/*        /!*    <div className="card mb-4 mb-md-0">*!/*/}
            {/*        /!*      <div className="card-body">*!/*/}
            {/*        /!*        <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project*!/*/}
            {/*        /!*          Status*!/*/}
            {/*        /!*        </p>*!/*/}
            {/*        /!*        <p className="mb-1" style={{ fontSize: ".77rem" }}>Web Design</p>*!/*/}
            {/*        /!*        <div className="progress rounded" style={{ height: 5 }}>*!/*/}
            {/*        /!*          <div className="progress-bar" role="progressbar" style={{ width: 80 }} aria-valuenow="80"*!/*/}
            {/*        /!*               aria-valuemin="0" aria-valuemax="100"></div>*!/*/}
            {/*        /!*        </div>*!/*/}
            {/*        /!*        <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Website Markup</p>*!/*/}
            {/*        /!*        <div className="progress rounded" style={{ height: 5 }}>*!/*/}
            {/*        /!*          <div className="progress-bar" role="progressbar" style={{ width: "72%" }} aria-valuenow="72"*!/*/}
            {/*        /!*               aria-valuemin="0" aria-valuemax="100"></div>*!/*/}
            {/*        /!*        </div>*!/*/}
            {/*        /!*        <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>One Page</p>*!/*/}
            {/*        /!*        <div className="progress rounded" style={{ height: "5px" }}>*!/*/}
            {/*        /!*          <div className="progress-bar" role="progressbar" style={{ width: "89%" }} aria-valuenow="89"*!/*/}
            {/*        /!*               aria-valuemin="0" aria-valuemax="100"></div>*!/*/}
            {/*        /!*        </div>*!/*/}
            {/*        /!*        <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Mobile Template</p>*!/*/}
            {/*        /!*        <div className="progress rounded" style={{ height: "5px" }}>*!/*/}
            {/*        /!*          <div className="progress-bar" role="progressbar" style={{ width: "55%" }} aria-valuenow="55"*!/*/}
            {/*        /!*               aria-valuemin="0" aria-valuemax="100"></div>*!/*/}
            {/*        /!*        </div>*!/*/}
            {/*        /!*        <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Backend API</p>*!/*/}
            {/*        /!*        <div className="progress rounded mb-2" style={{ height: "5px" }}>*!/*/}
            {/*        /!*          <div className="progress-bar" role="progressbar" style={{ width: "66%" }} aria-valuenow="66"*!/*/}
            {/*        /!*               aria-valuemin="0" aria-valuemax="100"></div>*!/*/}
            {/*        /!*        </div>*!/*/}
            {/*        /!*      </div>*!/*/}
            {/*        /!*    </div>*!/*/}
            {/*        /!*  </div>*!/*/}
            {/*        /!*  <div className="col-md-6">*!/*/}
            {/*        /!*    <div className="card mb-4 mb-md-0">*!/*/}
            {/*        /!*      <div className="card-body">*!/*/}
            {/*        /!*        <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project*!/*/}
            {/*        /!*          Status*!/*/}
            {/*        /!*        </p>*!/*/}
            {/*        /!*        <p className="mb-1" style={{ fontSize: ".77rem" }}>Web Design</p>*!/*/}
            {/*        /!*        <div className="progress rounded" style={{ height: "5px" }}>*!/*/}
            {/*        /!*          <div className="progress-bar" role="progressbar" style={{ width: "80%" }} aria-valuenow="80"*!/*/}
            {/*        /!*               aria-valuemin="0" aria-valuemax="100"></div>*!/*/}
            {/*        /!*        </div>*!/*/}
            {/*        /!*        <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Website Markup</p>*!/*/}
            {/*        /!*        <div className="progress rounded" style={{ height: "5px" }}>*!/*/}
            {/*        /!*          <div className="progress-bar" role="progressbar" style={{ width: "72%" }} aria-valuenow="72"*!/*/}
            {/*        /!*               aria-valuemin="0" aria-valuemax="100"></div>*!/*/}
            {/*        /!*        </div>*!/*/}
            {/*        /!*        <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>One Page</p>*!/*/}
            {/*        /!*        <div className="progress rounded" style={{ height: "5px" }}>*!/*/}
            {/*        /!*          <div className="progress-bar" role="progressbar" style={{ width: "89%" }} aria-valuenow="89"*!/*/}
            {/*        /!*               aria-valuemin="0" aria-valuemax="100"></div>*!/*/}
            {/*        /!*        </div>*!/*/}
            {/*        /!*        <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Mobile Template</p>*!/*/}
            {/*        /!*        <div className="progress rounded" style={{ height: "5px" }}>*!/*/}
            {/*        /!*          <div className="progress-bar" role="progressbar" style={{ width: "55%" }} aria-valuenow="55"*!/*/}
            {/*        /!*               aria-valuemin="0" aria-valuemax="100"></div>*!/*/}
            {/*        /!*        </div>*!/*/}
            {/*        /!*        <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Backend API</p>*!/*/}
            {/*        /!*        <div className="progress rounded mb-2" style={{ height: "5px" }}>*!/*/}
            {/*        /!*          <div className="progress-bar" role="progressbar" style={{ width: "66%" }} aria-valuenow="66"*!/*/}
            {/*        /!*               aria-valuemin="0" aria-valuemax="100"></div>*!/*/}
            {/*        /!*        </div>*!/*/}
            {/*        /!*      </div>*!/*/}
            {/*        /!*    </div>*!/*/}
            {/*        /!*  </div>*!/*/}
            {/*        /!*</div>*!/*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*    <div className={styles.buttons} align="right">*/}
            {/*      <Button onClick={() => onClickLogout()} variant="contained" color="error">Выйти</Button>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</section>*/}
        </>
    );
};
