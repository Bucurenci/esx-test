"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";

type NavbarItemProps = {
    href: string;
    label: string;
}

export default function NavbarItem({href, label, ...props}: NavbarItemProps) {
    const pathname = usePathname();

  return (
      <li className={`${pathname === href ? "current-item" : ""}`}>
          <Link href={href} {...props}>{label}</Link>
      </li>
  );
}