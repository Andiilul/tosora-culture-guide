import { ReactNode } from "react";
import { FourGrid, ThreeGrid, TwoGrid } from "./styled";

interface GridLayoutProps {
	defaultGrid: 2 | 3 | 4;
	children: ReactNode;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
	defaultGrid,
	children,
}) => {
	if (defaultGrid === 2) {
		return <TwoGrid>{children}</TwoGrid>;
	}
	if (defaultGrid === 3) {
		return <ThreeGrid>{children}</ThreeGrid>;
	}
	if (defaultGrid === 4) {
		return <FourGrid>{children}</FourGrid>;
	}
};
