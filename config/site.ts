export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "مدیریت فروش کارخانه آجر کاشانه",
	description: "کارخانه آجر ماشینی کاشانه",
	navItems: [
		{
			label: "خانه",
			href: "/",
		},
    {
      label: "فروش",
      href: "/sales/new-sale",
    },
    {
      label: "لیست مجوز ها",
      href: "/pricing",
    },
    {
      label: "گزارش فروش",
      href: "/blog",
    },
    {
      label: "رانندگان",
      href: "/about",
    },
    {
      label: "محصولات",
      href: "/about",
    },
    {
      label: "مقصدها",
      href: "/about",
    },
    {
      label: "گروه های کاری",
      href: "/about",
    }
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Projects",
			href: "/projects",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui-docs-v2.vercel.app",
		discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
