import React, { Component } from 'react';
import TournamentsList from '../../components/TournamentsList/TournamentsList';
import axios from 'axios';
import jsonServerConfig from '../../configurations/json-server';
import Grid from '@material-ui/core/Grid';
import SearchBar from '../SearchBar/SearchBar';

class TournamentsView extends Component {
	constructor(props) {
		super(props);

		const { host, port } = jsonServerConfig;
		this.url = `http://${host}:${port}`;
		this.tournamentsUrl = `${this.url}/tournaments`;

		this.state = {
			tournaments: [],
			isLoaded: false,
			errorMessage: '',
			filterBy: 'name'
		};

		this.cancel = '';
	}

	componentDidMount() {
		// This is for purely demonstrate how spinner displays in a slowness of data fetching.
		// Only in development testing.
		setTimeout(() => {
			this.getAllTournamentsService();
		}, 1000);
	}

	async getAllTournamentsService() {
		try {
			const response = await axios.get(this.tournamentsUrl);
			this.setState({
				tournaments: response.data,
				isLoaded: true
			});
		} catch (error) {
			this.setState({
				errorMessage: 'Error occurred while loading tournaments.',
				isLoaded: true
			});
		}
	}

	async getFilteredTournaments(filterField, inputValue) {
		try {
			const filterUrl = `${this.tournamentsUrl}?series.${filterField}_like=${inputValue}`;

			if (this.cancel) {
				this.cancel.cancel();
			}

			this.cancel = axios.CancelToken.source();
			const response = await axios.get(filterUrl, {
				cancelToken: this.cancel.token
			});

			this.setState({
				tournaments: response.data,
				isLoaded: true
			});
		} catch (error) {
			if (error || axios.isCancel(error)) {
				this.setState({
					isLoaded: true
				});
			}
		}
	}

	handleSetFilterBy = (filterKey) => {
		this.setState({
			filterBy: filterKey
		});
	};

	handleSearch = (filterField, inputValue) => {
		if (inputValue.length === 0) {
			this.getAllTournamentsService();
		} else {
			this.getFilteredTournaments(filterField, inputValue);
		}
	};

	render() {
		return (
			<Grid container spacing={2}>
				<Grid item md={12} xs={12}>
					<SearchBar
						onSearch={this.handleSearch}
						filterKey={this.state.filterBy}
						setFilterBy={this.handleSetFilterBy}
					/>
				</Grid>
				<Grid item md={12} xs={12}>
					<TournamentsList tournamentState={this.state} />
				</Grid>
			</Grid>
		);
	}
}

export default TournamentsView;
