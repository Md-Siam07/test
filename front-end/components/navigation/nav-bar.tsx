import * as React from "react"
import NavLink from "./nav-link"
import Image from "next/image"
import "./nav-bar.css"

export default function NavBar() {
  return (
    <div className="navbar custom-bg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <img src="/logo.png" alt="logo" width={200} height={150} />
      </div>
      <div className="navbar-center hidden lg:flex">
        <select className="select select-ghost w-full max-w-xs">
          <option disabled selected>
            Text-Speech GPT
          </option>
          <option>PDF Generator</option>
          <option>Social Hub</option>
        </select>
      </div>
      <div className="navbar-end">
        <a className="btn btn-circle">
          <img src="./avatar.png" alt="avatar" />
        </a>
      </div>
    </div>
  )
}
