import { Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

interface NavToProps {
	href: string;
	children: React.ReactNode;
}

export const NavTo: React.FC<NavToProps> = ({ href, children }) => {
	const theme = useTheme();
	return (
		<Link
			style={{
				textDecoration: "none",
				color: "inherit",
				width:"max-content"
			}}
			to={href}
		>
			<Typography
				sx={{
					color:theme.palette.text.secondary,
					":hover": {
						color: theme.palette.primary.main,
						transition: "ease-in-out 300ms",
					},
					transition: "300ms",
				}}
			>
				{children}
			</Typography>
		</Link>
	);
};
