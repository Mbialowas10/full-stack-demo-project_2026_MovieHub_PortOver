import { NavLink } from "react-router-dom";
<<<<<<< HEAD


/**
 * Purpose: To layout top navigation for
 * Trending, Search, Favourites, Reviews, and Profile
 * Pages
 * Styling - TailWindCSS
 * @returns JSX
 */
const HeaderNav = () => {

  /**
   * items represents an array of objects containing key
   * value pairs: path and label
   */
=======
import {
  useUser,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

const HeaderNav = () => {
  const { user } = useUser();

>>>>>>> clerk
  const items = [
    { path: "/", label: "Trending" },
    { path: "/search", label: "Search" },
    { path: "/favourites", label: "Favourites" },
    { path: "/reviews", label: "Reviews" },
<<<<<<< HEAD
    { path: "/profile", label: "Profile" },
=======
>>>>>>> clerk
  ];

  return (
    <header className="bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
<<<<<<< HEAD
=======

>>>>>>> clerk
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-white font-bold">
              RRC
            </span>
            <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
              Movie Hub Web 2026
            </span>
          </NavLink>

          {/* Nav */}
<<<<<<< HEAD
          <ul className="flex items-center gap-1">
            {/* Destructuring path and label from object */}
=======
          <ul className="flex items-center gap-2">

            {/* Main Nav Items */}
>>>>>>> clerk
            {items.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {label}
                </NavLink>
              </li>
            ))}
<<<<<<< HEAD
=======

            {/* Show when SIGNED OUT */}
            <SignedOut>
              <li>
                <NavLink
                  to="/login"
                  className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-slate-800"
                >
                  Login
                </NavLink>
              </li>
            </SignedOut>

            {/* Show when SIGNED IN */}
            <SignedIn>
              {/* Greeting */}
              <li className="text-sm text-green-600 dark:text-green-400">
                Hi {user?.firstName}
              </li>

              {/* Clerk Avatar + Dropdown */}
              <li>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                    },
                  }}
                />
              </li>
            </SignedIn>

>>>>>>> clerk
          </ul>
        </div>
      </nav>
    </header>
  );
<<<<<<< HEAD
}
export default HeaderNav;
=======
};

export default HeaderNav;
>>>>>>> clerk
