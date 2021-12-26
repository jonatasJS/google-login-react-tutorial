import React from "react";

function ListOfPlayer({ dataServer, isLoaded }) {
	return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
		{isLoaded && dataServer.players.list ? dataServer.players.list?.map(player =>
			<div style={{ display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
				<img src={`https://mc-heads.net/avatar/${player}/99.png`} alt={player} title={player} />
				<span>Player: <strong>{player}</strong> </span>
			</div>
		) : <span><strong>Nada encontrado!</strong></span>}
	</div>
}

export default ListOfPlayer;