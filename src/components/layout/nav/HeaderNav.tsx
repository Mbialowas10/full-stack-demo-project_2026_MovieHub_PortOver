import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


/**
 * Purpose: To layout top navigation for 
 * Trending, Search, Favourites, Reviews, and Profile
 * Pages
 * Styling - TailWindCSS 
 * @returns JSX 
 */
const HeaderNav = () => {
  const items = [
    { path: "/", label: "Trending" },
    { path: "/search", label: "Search" },
    { path: "/favourites", label: "Favourites" },
    { path: "/reviews", label: "Reviews" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <header className="bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
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
          <ul className="flex items-center gap-1">
            {/* Destructuring path and label from object */}
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
          </ul>
        </div>
      </nav>
    </header>
  );
}
export default HeaderNav;
