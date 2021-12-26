import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import axios from 'axios';
import { useEffect } from "react";

function App() {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [profilePic, setProfilePic] = useState();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState({});
	const [dataServer, setDataServer] = useState({});

	useEffect(() => {
		setInterval(() => {
			axios.get('https://api.mcsrvstat.us/2/voltzmc.com')
			.then(({ data }) => {
				console.log(data)
				setDataServer(data);
				setIsLoaded(true);
			});
		}, 1000);
	}, []);

	const responseGoogle = (response) => {
		console.log(response);
		if (response.error) {
			setIsError(!isError);
			return setError(response);
		}
		const {
			profileObj: { name, email, imageUrl },
		} = response;
		setName(name);
		setEmail(email);
		setProfilePic(imageUrl);
		setIsLoggedIn(true);
	};
	return (
		<div className="container">
			{isLoggedIn ? (
				<div style={{ textAlign: "center" }}>
					<h1>User Information</h1>
					<img className="profile" src={profilePic} alt={name} title={name} />
					<p>Name: {name}</p>
					<p>Email: {email}</p>
				</div>
			) : <GoogleLogin
				clientId="430053852957-6qlr85gpt1a592lmqlikl5m5oclofkm4.apps.googleusercontent.com"
				buttonText="Continuar com o Google"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
			/>}
			{isError && (
				<>
					<h1>Error:</h1>
					<p>{JSON.stringify(error)}</p>
				</>
			)}
			{isLoaded && (
					<div className="main">
						<div>
							<img onclick="go()" className="logo" src={dataServer.icon} />
								<p className="txt">
									<span className="title" style={{color: "#fff"}}>Minecraft Server</span>
									<br />
									<br />
									<span style={{color: "#ffaa00"}}>
										<span style={{fontWeight: "bold"}}>Voltz</span></span><span style={{color: "ffffff"}}><span style={{fontWeight: "bold"}}>MC </span></span>
									<span style={{color: "#aaaaaa"}}>[1.8.x] </span>
									<span style={{color: "#555555"}}>- </span>
									<span style={{color: "#aaaaaa"}}>voltzmc.com</span>
									<br />
									<span style={{color: "#ffaa00"}}>
										<span style={{fontWeight: "bold"}}>R. Overpower</span>
									</span>
									<span style={{color: "#aaaaaa"}}>RESETADO!</span>
								</p>
						</div>
						<div className="players">
							<span style={{color: "#aaaaaa"}}>{dataServer.players.online}/500</span>
							<img src="https://voltzmc.vercel.app/icons/icon-server.png" />
						</div>
					</div>
			)}
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
				{isLoaded && dataServer.players.list.map(player => (
					<div>
						<img src={`https://mc-heads.net/avatar/${player}/99.png`} />
						<br />
						<span>Player: {player} </span>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
