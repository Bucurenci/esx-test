import "./header.scss"
import MobileMenuButton from "@/components/layout/Header/MobileMenuButton";
import Link from "next/link";
import NavbarItem from "@/components/layout/Header/NavbarItem";

export default function Header() {

  return (
      <header className="position-sticky top-0">
          <div className="container d-flex justify-content-between align-items-center h-100">
              <div className="left-side">
                  {/* logo */}
                  <Link href="/" className="logo-frame">
                      <img src="/logo.svg" alt="ESX Logo" />
                  </Link>
              </div>
              <div className="right-side w-100">
                  {/* menu */}
                  <div className="menu d-md-flex justify-content-between align-items-center">
                      <nav className="navbar w-100 d-flex justify-content-center">
                          <ul className="d-flex">
                              <NavbarItem href="/" label="Home" />
                              <NavbarItem href="/about" label="About" />
                          </ul>
                      </nav>

                      <div className="navbar d-flex justify-content-center justify-content-md-end">
                          <ul className="m-0">
                              <li className="menu-item-has-children">
                                  <a href="#">My account</a>

                                  <ul>
                                      <NavbarItem href="/login" label="Login" />
                                      <NavbarItem href="/register" label="Register" />
                                  </ul>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>

              {/* hamburger button */}
              <MobileMenuButton />
          </div>
      </header>
  );
}