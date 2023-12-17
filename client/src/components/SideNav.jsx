import { useContext, useState } from 'react';
import { NavLink, Navigate, Outlet } from 'react-router-dom';

import { UserContext } from '../App';

const SideNav = () => {
  const { userAuth: { access_token } = {} } = useContext(UserContext);

  const [pageState, setPageState] = useState();

  return access_token === null ? (
    <Navigate to="/signin" />
  ) : (
    <>
      <section className="relative flex gap-10 py-0 m-0 max-md:flex-col">
        <div className="sticky top-[80px] z-30">
          <div
            className="
            min-w-[200px]
            h-cover md:sticky
            top-24
            overflow-y-auto
            p-6 md:pr-0
          md:border-grey
            md:border-r
            absolute
            max-md:top-[64px]
          bg-white 
            max-md:w-[calc(100% + 80px)]
            max-md:px-16
            max-md:-ml-7
            duration-500
                 "
          >
            <h1 className="text-xl text-dark-grey mb-3">Dashboard</h1>
            <hr className="border-grey -ml-6 mb-8 mr-6" />

            <NavLink
              to="/dashboard/blogs"
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <i className="fi fi-rr-document"></i>
              Blogs
            </NavLink>
            <NavLink
              to="/dashboard/notication"
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <i className="fi fi-rr-bell"></i>
              Notifications
            </NavLink>
            <NavLink
              to="/editor"
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <i className="fi fi-rr-file-edit"></i>
              Write
            </NavLink>

            <h1 className="text-xl text-dark-grey mt-20 mb-3">Settings</h1>
            <hr className="border-grey -ml-6 mb-8 mr-6" />

            <NavLink
              to="/settings/edit-profile"
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <i className="fi fi-rr-user"></i>
              Edit profile
            </NavLink>
            <NavLink
              to="/settings/change-password"
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <i className="fi fi-rr-lock"></i>
              Change password
            </NavLink>
          </div>
        </div>

        <div className="max-md:-mt-8 mt-5 w-full">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default SideNav;
