import React from "react";

function SearchCard({ dataServer }) {
	return (
		<>
			<div className="main">
				<div>
					<img onclick="go()" className="logo" alt="Logo" src={dataServer?.icon} />
					<p className="txt">
						<span className="title" style={{ color: "#fff" }}>Minecraft Server</span>
						<br />
						<br />
						<span style={{ color: "#ffaa00" }}>
							<span style={{ fontWeight: "bold" }}>Voltz</span></span><span style={{ color: "ffffff" }}><span style={{ fontWeight: "bold" }}>MC </span></span>
						<span style={{ color: "#aaaaaa" }}>[1.8.x] </span>
						<span style={{ color: "#555555" }}>- </span>
						<span style={{ color: "#aaaaaa" }}>voltzmc.com</span>
						<br />
						<span style={{ color: "#ffaa00" }}>
							<span style={{ fontWeight: "bold" }}>R. Overpower</span>
						</span>
						<span style={{ color: "#aaaaaa" }}>RESETADO!</span>
					</p>
				</div>
				<div className="players">
					<span style={{ color: "#aaaaaa" }}>{dataServer?.players.online}/{dataServer?.players.max}</span>
					<img alt="Logo" src="https://voltzmc.vercel.app/icons/icon-server.png" />
				</div>
			</div>
		</>
	)
}

export default SearchCard;