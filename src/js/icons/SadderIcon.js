import React from "react";
import PropTypes from "prop-types";

const SadderIcon = ({ color }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			viewBox="0 0 67.733332 67.733335"
		>
			<g id="layer2">
				<g
					id="g4555"
					transform="translate(0.88824641,0.05669581)"
					style={{
						stroke: color,
						fillOpacity: 1,
						strokeWidth: 2.64583325,
						strokeLinecap: "round",
						strokeLinejoin: "round",
						strokeMiterlimit: 4,
						strokeDasharray: "none",
						strokeDashoffset: 0,
						strokeOpacity: 1,
						paintOrder: "fill markers stroke"
					}}
				>
					<circle
						r="25.040924"
						cy="33.809971"
						cx="32.97842"
						id="path4530"
						style={{
							fill: "none"
						}}
					/>
					<circle
						r="3.2127976"
						cy="29.36875"
						cx="22.48958"
						id="path4532"
						style={{
							fill: color
						}}
					/>
					<circle
						r="3.2127976"
						cy="29.36875"
						cx="43.278275"
						id="path4532-6"
						style={{
							fill: color
						}}
					/>
					<path
						id="path4549"
						d="m 22.584077,48.07857 h 20.788691 c 0,0 -1.008438,-10.054167 -10.394345,-10.054167 -9.385908,0 -10.394346,10.054167 -10.394346,10.054167 z"
						style={{
							fill: "none",
							strokeLinecap: "butt"
						}}
					/>
				</g>
			</g>
		</svg>
	);
};

export default SadderIcon;

SadderIcon.propTypes = {
	color: PropTypes.string
};
