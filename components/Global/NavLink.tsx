import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface NavLinkProps {
  disabled?: boolean;
  href: string;
  text: string;
  icon: ReactNode;
}

export default function NavLink({ disabled, href, text, icon }: NavLinkProps) {
  return (
    <LinkWrapper href={href} disabled={disabled}>
      <div className="sidebar__link--icon">{icon}</div>
      <div className="sidebar__link--text">{text}</div>
    </LinkWrapper>
  );
}

const LinkWrapper = ({
  href,
  disabled,
  children,
}: {
  href: string;
  disabled?: boolean;
  children: ReactNode;
}) => {
  const pathName = usePathname();

  if (disabled) {
    return (
      <div className="sidebar__link--wrapper no-link">
        <div className={`sidebar__link--line`}></div>
        {children}
      </div>
    );
  } else {
    return (
      <Link href={href} className="sidebar__link--wrapper ">
        <div
          className={`sidebar__link--line ${
            pathName.startsWith(href) && `active--tab`
          } `}
        ></div>
        {children}
      </Link>
    );
  }
};
