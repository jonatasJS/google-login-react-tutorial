import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useEffect } from "react";

import ServerCard from "./components/ServerCard";
import ListOfPlayer from "./components/ListOfPlayer";
import SearchBar from "./components/SearchBar";

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
			axios.get("https://api.mcsrvstat.us/2/voltzmc.com").then(({ data }) => {
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
				<div
					style={{
						textAlign: "center",
					}}
				>
					<h1> User Information </h1>
					<img className="profile" src={profilePic} alt={name} title={name} />
					<p> Name: {name} </p> <p> Email: {email} </p>
				</div>
			) : (
				<GoogleLogin
					clientId="430053852957-6qlr85gpt1a592lmqlikl5m5oclofkm4.apps.googleusercontent.com"
					buttonText="Continuar com o Google"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					style={{ background: '#1F2121' }}
				/>
			)}
			{isError && (
				<>
					<h1> Error: </h1> <p> {JSON.stringify(error)} </p>
				</>
			)}
			{isLoaded && <ServerCard dataServer={dataServer} />}
			<SearchBar
				placeholder="Enter a Book Name..."
				data={isLoaded ? dataServer.players.list : []}
			/>
			{/* <div class="wrapper">
                                                        <div class="search-input">
                                                            <input type="text" placeholder="Type to search.." />
                                                                <div class="autocom-box">	</div>
                                                                <div class="icon"><i class="fas fa-search"></i></div>
                                                        </div>
                                                    </div> */}
			<ListOfPlayer dataServer={dataServer} isLoaded={isLoaded} />
		</div>
	);
}

export default App;