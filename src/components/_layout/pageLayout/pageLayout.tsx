import { ReactNode } from "react";
import {
	LayoutContainer,
	LayoutContentWrapper,
	LayoutContentWrapperPlain,
} from "./styled";

interface PageLayoutProps {
	children: ReactNode;
	variant?: "default" | "transparent";
}

export const PageLayout: React.FC<PageLayoutProps> = ({
	variant = "default",
	children,
}) => {
	if (variant === "default") {
		return (
			<LayoutContentWrapper>
				<LayoutContainer>{children}</LayoutContainer>
			</LayoutContentWrapper>
		);
	} else {
		return <LayoutContentWrapperPlain>{children}</LayoutContentWrapperPlain>;
	}
};
