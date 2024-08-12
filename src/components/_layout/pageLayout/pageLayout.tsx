import { ReactNode } from "react";
import { LayoutContainer, LayoutContentWrapper } from "./styled";

interface PageLayoutProps {
	children: ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
	return (
		<LayoutContentWrapper>
			<LayoutContainer>{children}</LayoutContainer>
		</LayoutContentWrapper>
	);
};
