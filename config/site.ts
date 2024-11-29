export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Frontend Example",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
      private: true,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      private: true,
    },
    {
      label: "Projects",
      href: "/projects",
      private: false,
    },
    {
      label: "Team",
      href: "/team",
      private: false,
    },
    {
      label: "Calendar",
      href: "/calendar",
      private: false,
    },
    {
      label: "Settings",
      href: "/settings",
      private: true,
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
      private: false,
    },
    {
      label: "Sign up",
      href: "/signup",
      private: false,
    },
    {
      label: "Sign in",
      href: "/login",
      private: false,
    },
    {
      label: "Logout",
      href: "/logout",
      private: true,
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
    login: "/login",
  },
  auth: {
    login: {
      title: "Login",
      remember_me: "Remember me",
      forgot_password: "Forgot password?",
      log_in: "Log in",
      or_login_with: "Or login with",
    },
    register: {
      register: "Register",
      signup: "Sign up",
      name: "Name",
      create_account: "Create account",
      have_an_account: "Have an account?",
    },    
    email: "Email",
    password: "Password",
    google: "Google",
    email_validation: "Email validation",
  },
  validators: {
    name_required: "Name is required",
    email_required: "Email is required",
    password_required: "Password is required",
    email_format: "Email format is wrong",
    password_format: "Password is not strong",
  },
  errors: {
    email_validation_token_empty: "The email is not validated, please follow the instructions in the mailbox"
  }
};
