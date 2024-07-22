import React, { useState, useEffect } from "react";
import { ArrowDropUp } from "@mui/icons-material";
import { Box, IconButton, CircularProgress } from "@mui/material";

interface ScrollTopProps {}

export const ScrollTop: React.FC<ScrollTopProps> = () => {
	const [scrollPercent, setScrollPercent] = useState(0);
	const [isVisible, setIsVisible] = useState(false);

	const handleScroll = () => {
		const scrollTop = window.scrollY;
		const docHeight =
			document.documentElement.scrollHeight - window.innerHeight;
		const scrolled = (scrollTop / docHeight) * 100;
		setScrollPercent(scrolled);

		if (scrollTop > 100) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const handleScrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<IconButton
			color="primary"
			sx={{
				padding: "0",
				opacity: isVisible ? 1 : 0,
				transform: isVisible ? "translateY(0)" : "translateY(100px)",
				transition: "opacity 300ms, transform 300ms",
			}}
			onClick={handleScrollToTop}
		>
			<Box
				sx={{
					display: "flex",
					position: "relative",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<CircularProgress
					size={"54px"}
					variant="determinate"
					value={Math.round(scrollPercent)}
				/>
				<ArrowDropUp
					fontSize="large"
					sx={{
						position: "absolute",
						bottom: "auto",
						right: "auto",
					}}
				/>
			</Box>
		</IconButton>
	);
};
