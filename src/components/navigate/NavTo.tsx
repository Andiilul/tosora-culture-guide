import { Link } from "react-router-dom";

interface NavToProps {
	href: string;
	children: React.ReactNode;
}

export const NavTo: React.FC<NavToProps> = ({ href, children }) => {
	return (
		<Link
			style={{
				textDecoration: "none",
				color: "inherit",
				width: "max-content",
			}}
			to={href}
		>
			{children}
		</Link>
	);
};
