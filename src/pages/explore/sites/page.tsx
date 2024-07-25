import { Box, Typography } from "@mui/material";
import { SiteContainer, SiteWrapper, SiteContent } from "./styled";

interface SitesProps {}

export const Sites: React.FC<SitesProps> = () => {
	return (
		<SiteWrapper>
			<SiteContainer>
				<SiteContent>
					<Box>
						<Typography fontFamily={"Poppins"}>Discover</Typography>
						<Typography fontFamily={"Rokkitt"}>Masjid Tua Tosora</Typography>
						<Typography>Discover</Typography>
					</Box>
					<Box>Sites</Box>
				</SiteContent>
			</SiteContainer>
		</SiteWrapper>
	);
};
