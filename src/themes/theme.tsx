/* eslint-disable no-mixed-spaces-and-tabs */
import { PaletteMode } from "@mui/material";
import { amber } from "@mui/material/colors";

const theme = {
	palette: {
		primary: amber,
	},
};

export const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === "dark"
			? {
					// palette values for dark mode
					primary: {
						main: "#1ab69d",
						dark:"#ffffff"
						
					},
					secondary:{
						main:"#ee4a62"
					},
					background: {
						default: "#111822",
						paper:"#1c242f",
					},
					text: {
						primary: "#ffffff",
						secondary: "#bababa",
					},	
					common:{
						black:"#ffffff",
						white:"#0A0E11"
					}
			  }
			: {
					// palette values for light mode
					primary: {
						main: "#1ab69d",
						light: "",
						dark: "#1ab69d",
						contrastText: "",
					},
					background: {
						default: "#f6f6f6",
						paper: "#ffffff",
					},
					text: {
						primary: "#181818",
						secondary: "#808080",
					},	
					common:{
						black:"#0A0E11",
						white:"#ffffff"
					}
			  }),
	},
});

export default theme;
