import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { User } from "@nextui-org/user";
import { siteConfig as strings } from "@/config/site";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/hooks/useLogout";

const AvatarMenu = () => {
  const { user, isAuthenticated } = useAuth();
  const logout = useLogout();

  return (
    <Dropdown>
      <DropdownTrigger>
        {isAuthenticated ? (
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: `${user?.Picture ?? ""}`,
            }}
            description={user?.Email}
            name={user?.Name}
          />
        ) : (
          <Avatar />
        )}
      </DropdownTrigger>
      {isAuthenticated ? (
        <DropdownMenu aria-label="Avatar Menu" variant="flat">
          <DropdownSection showDivider>
            <DropdownItem isReadOnly key="profile" className="h-14 gap-2">
              <p className="font-bold">{strings.account.signed_in_as}</p>
              <p className="font-bold">{user?.Email}</p>
            </DropdownItem>
            <DropdownItem isReadOnly key="settings" href="/account">
              {strings.account.title}
            </DropdownItem>
          </DropdownSection>
          <DropdownItem onClick={logout}>{strings.account.logout}</DropdownItem>
        </DropdownMenu>
      ) : (
        <DropdownMenu aria-label="Login Menu" variant="flat">
          <DropdownItem href="/login" title={strings.auth.login.log_in} />
          <DropdownItem
            href="/register"
            title={strings.auth.register.register}
          />
        </DropdownMenu>
      )}
    </Dropdown>
  );
};

export default AvatarMenu;
