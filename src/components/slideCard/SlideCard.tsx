import { Avatar } from "@mui/material";
import { Overlay, SliderWrapper } from "./styled";

interface SlideCardProps {
	src: string;
	onClick?: () => void;
	opacity?: number;
	focus: boolean;
}

export const SlideCard: React.FC<SlideCardProps> = ({
	src,
	opacity = "0.7",
	onClick,
	focus,
}) => {
	opacity;
	return (
		<SliderWrapper
			sx={{
				transform: focus ? "translateY(-10px)" : "none",
				transition: "200ms",
			}}
			onClick={onClick}
		>
			<Avatar
				draggable={false}
				variant="square"
				src={src}
				sx={{
					userSelect: "none",
					height: "100%",
					width: "100%",
				}}
			/>
			<Overlay
				sx={{
					background: focus
						? "linear-gradient(270deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.20) 20%, rgba(0, 0, 0, 0.20) 80%, rgba(0, 0, 0, 0.70) 100%)"
						: `rgba(0,0,0,${opacity})`,
					transition: "200ms",
				}}
			/>
		</SliderWrapper>
	);
};
