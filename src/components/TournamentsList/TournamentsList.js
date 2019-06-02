import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import TournamentsListItemDetail from './TournamentsListItemDetail/TournamentsListItemDetail';
import FlagIconFactory from 'react-flag-icon-css';

const expansionPanelStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		height: '100%',
		margin: theme.spacing(3, 0)
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
		paddingTop: '5px',
		paddingLeft: '30px'
	}
}));

const paperStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2, 2)
	}
}));

const spinnerStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '500px'
	},
	progress: {
		margin: theme.spacing(2)
	}
}));

const FlagIcon = FlagIconFactory(React, { useCssModules: false });

const TournamentsList = (props) => {
	const expansionPanelClasses = expansionPanelStyles();
	const paperClasses = paperStyles();
	const spinnerClasses = spinnerStyles();

	const [expanded, setExpanded] = React.useState('panel1');
	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	let tournamentList = props.tournamentState.tournaments.map((tournament) => {
		return (
			<Grow
				in={props.tournamentState.isLoaded}
				{...(props.tournamentState.isLoaded ? { timeout: 2000 } : {})}
				key={tournament.id}>
				<ExpansionPanel expanded={expanded === tournament.name} onChange={handleChange(tournament.name)}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
						<FlagIcon code={tournament.country.toLowerCase()} size='2x' />
						<Typography className={expansionPanelClasses.heading}>{tournament.name}</Typography>
					</ExpansionPanelSummary>
					<TournamentsListItemDetail tournamentDetails={tournament} />
				</ExpansionPanel>
			</Grow>
		);
	});

	if (props.tournamentState.tournaments.length === 0) {
		tournamentList = (
			<div>
				<Paper className={paperClasses.root}>
					<Typography component='p'>Sorry no tournament data available...</Typography>
				</Paper>
			</div>
		);
	}

	if (props.tournamentState.errorMessage) {
		tournamentList = (
			<div>
				<Paper className={paperClasses.root}>
					<Typography component='p'>Sorry unable to get tournament data...</Typography>
				</Paper>
			</div>
		);
	}

	if (!props.tournamentState.isLoaded) {
		tournamentList = (
			<div className={spinnerClasses.root}>
				<CircularProgress className={spinnerClasses.progress} size={100} thickness={4} />
			</div>
		);
	}

	return <div className={expansionPanelClasses.root}>{tournamentList}</div>;
};

export default TournamentsList;
