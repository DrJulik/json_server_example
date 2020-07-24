import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [clients, setClients] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(
				"https://github.com/benoitvallon/100-best-books/blob/master/books.json"
			);

			setClients(result.data);
		};

		fetchData();
	}, []);

	const deleteClient = async (id) => {
		const newClientList = clients.filter((client) => {
			return client.id !== id;
		});

		await axios.delete(`http://localhost:3004/clients/${id}`);
		setClients(newClientList);
	};

	return (
		<>
			<h1 className="heading">This is a list of our clients!</h1>
			<div className="container">
				<div className="user-cards">
					{clients &&
						clients.map((client) => {
							return (
								<div className="user-card" key={client.id}>
									<h2>{client.name}</h2>
									{/* <h3>{client.email}</h3> */}
									<p>{client.phone}</p>
									{client.hobbies.map((hobby) => (
										<h3>{hobby}</h3>
									))}
									<button
										className="delete"
										onClick={deleteClient.bind(this, client.id)}
									>
										X
									</button>
								</div>
							);
						})}
				</div>
			</div>
		</>
	);
}

export default App;
