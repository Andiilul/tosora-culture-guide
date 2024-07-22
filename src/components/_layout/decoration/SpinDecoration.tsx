import { Box } from "@mui/material";
import { Spinner } from "./styles";

interface SpinDecorationProps {
	children: React.ReactNode;
}

export const SpinDecoration: React.FC<SpinDecorationProps> = ({ children }) => {
	return (
		<Box height={"max-content"} width={"max-content"}>
			<Spinner>{children}</Spinner>
		</Box>
	);
};
