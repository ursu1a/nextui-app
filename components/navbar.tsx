"use client";
import clsx from "clsx";
import { useEffect } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { User } from "@nextui-org/user";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon, Logo } from "@/components/icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/hooks/useLogout";
import { Avatar } from "@nextui-org/avatar";
import { siteConfig as strings } from "@/config/site";

export const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const logout = useLogout();

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const avatarMenu = (isAuthenticated: boolean) => (
    <Dropdown>
      <DropdownTrigger>
        {isAuthenticated ? (
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: user?.Picture,
            }}
            description={user?.Email}
            name={user?.Name}
          />
        ) : (
          <Avatar />
        )}
      </DropdownTrigger>
      {isAuthenticated ?
      <DropdownMenu aria-label="Avatar Menu" variant="flat">
        <DropdownItem isReadOnly key="profile" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">{user?.Email}</p>
        </DropdownItem>
        <DropdownItem onClick={logout}>Logout</DropdownItem>
      </DropdownMenu>
      : <DropdownMenu aria-label="Login Menu" variant="flat">
          <DropdownItem href="/login" title={strings.auth.login.log_in} />
          <DropdownItem href="/register" title={strings.auth.register.register} />
        </DropdownMenu>}
    </Dropdown>
  );

  const navMenuItems = siteConfig.navMenuItems.filter(function (item) {
    if (item.private) {
      if (!isAuthenticated) {
        return undefined;
      }
    }
    if (
      isAuthenticated &&
      (item.href === "/login" || item.href === "/signup")
    ) {
      return undefined;
    }
    return item;
  });

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        {avatarMenu(isAuthenticated)}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              {item.href === "/logout" ? (
                <Link
                  as={Button}
                  className="min-w-full"
                  href="#"
                  onClick={logout}
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  color={
                    index === 1
                      ? "primary"
                      : index === navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href={item.href}
                  size="lg"
                >
                  {item.label}
                </Link>
              )}
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
