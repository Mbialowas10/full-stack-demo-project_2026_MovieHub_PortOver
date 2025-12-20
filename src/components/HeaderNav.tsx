import { useState, useEffect } from "react";


export default function HeaderNav() {
  const items = [
    { href: "#trending", label: "Trending" },
    { href: "#search", label: "Search" },
    { href: "#favourites", label: "Favourites" },
    { href: "#reviews", label: "Reviews" },
    { href: "#profile", label: "Profile" },
  ];

  return (
    <header className="bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Brand */}
          <a href="#" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-white font-bold">
              RRC
            </span>
            <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
              Movie Hub Web 2026
            </span>
          </a>

          {/* Nav */}
          <ul className="flex items-center gap-1">
            {/* Destructuring href and label from object */}
            {items.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
