import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TournamentDetails from './TournamentDetails/TournamentDetails';
import SeriesDetails from './SeriesDetails/SeriesDetails';
import Grid from '@material-ui/core/Grid';

const panelDetailsStyles = makeStyles((theme) => ({
	root: {
		width: '100%'
	}
}));

const TournamentsListItemDetail = (props) => {
	const panelDetailClasses = panelDetailsStyles();

	return (
		<div className={panelDetailClasses.root}>
			<ExpansionPanelDetails>
				<Grid container spacing={2}>
					<Grid item md={6} xs={12}>
						<TournamentDetails tournamentDetails={props.tournamentDetails} />
					</Grid>
					<Grid item md={6} xs={12}>
						<SeriesDetails seriesDetails={props.tournamentDetails.series} />
					</Grid>
				</Grid>
			</ExpansionPanelDetails>
		</div>
	);
};

export default TournamentsListItemDetail;
