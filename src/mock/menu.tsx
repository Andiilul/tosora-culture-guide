import {
	AccountBalanceOutlined,
	ColorLens,
	Dining,
	Diversity2Outlined,
	Psychology,
	SportsEsports,
} from "@mui/icons-material";

export const navbarMenu = [
	{
		name: "Home",
		// link: "/",
		scroll: "firstHero",
	},
	{
		name: "Explore",
		// link: "/explore",
		scroll: "explore",
	},
	{
		name: "About Us",
		// link: "/contact-us",
		scroll: "about-us",
	},
];

export const ExploreBlog = [
	{
		name: "Situs Budaya",
		link: "/explore/sites",
		icon: <AccountBalanceOutlined fontSize="inherit" />,
		catchphrase: "Jelajahi Warisan Kuno Desa Tosora.",
	},
	{
		name: "Kuliner",
		link: "/explore/cuisines",
		icon: <Dining fontSize="inherit" />,
		catchphrase: "Nikmati Keunikan Rasa Kuliner Tosora.",
	},
	{
		name: "Kebudayaan",
		link: "/explore/cultures",
		icon: <Diversity2Outlined fontSize="inherit" />,
		catchphrase: "Rasakan Kekayaan Budaya yang Hidup di Tosora.",
	},
	{
		name: "Pengetahuan Lokal",
		link: "/explore/wisdoms",
		icon: <Psychology fontSize="inherit" />,
		catchphrase:
			"Temukan Kebijaksanaan yang Diturunkan Melalui Generasi di Tosora.",
	},
	{
		name: "Manuskrip dan Tradisi Lisan",
		link: "/explore/works",
		icon: <ColorLens fontSize="inherit" />,
		catchphrase: "Selami Ekspresi Karya Tosora, dari Masa Lalu hingga Kini.",
	},
	{
		name: "Kesenian dan Hiburan",
		link: "/explore/entertainments",
		icon: <SportsEsports fontSize="inherit" />,
		catchphrase: "Nikmati Keindahan Seni dan Hiburan di Desa Tosora.",
	},
];
