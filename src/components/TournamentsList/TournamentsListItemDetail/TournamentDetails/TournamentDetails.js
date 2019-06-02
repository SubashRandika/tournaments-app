import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import DateRange from '@material-ui/icons/DateRange';
import LocationOn from '@material-ui/icons/LocationOn';
import dateformat from 'dateformat';

const seriesStyles = makeStyles({
	card: {
		minWidth: 250
	}
});

const typoStyles = makeStyles({
	title: {
		fontSize: 14
	}
});

const dividerStyles = {
	backgroundColor: '#448ad4',
	margin: '5px 0',
	height: 2
};

const chipsStyles = {
	marginTop: '5px'
};

const TournamentDetails = (props) => {
	const seriesClasses = seriesStyles();
	const typoClasses = typoStyles();
	const DATE_FORMAT = 'ddd, mmm dS, yyyy';

	const extractAndFormatDateTime = (dateTimeString) => {
		const dateTimeArray = dateTimeString.split('Z');
		return dateformat(dateTimeArray[0], DATE_FORMAT);
	};

	return (
		<Card className={seriesClasses.card}>
			<CardContent>
				<Grid container spacing={2}>
					<Grid item md={1} xs={2}>
						<LocationOn />
					</Grid>
					<Grid item md={11} xs={10}>
						<Typography variant='h6' component='h2'>
							{props.tournamentDetails.country}, {props.tournamentDetails.city}
						</Typography>
					</Grid>
				</Grid>
				<Divider style={dividerStyles} />
				<Typography variant='body2' component='span'>
					<Grid container spacing={2}>
						<Grid item md={6} xs={12}>
							<Typography className={typoClasses.title} color='textSecondary'>
								Start Date
							</Typography>
							<Chip
								style={chipsStyles}
								label={extractAndFormatDateTime(props.tournamentDetails.date_end)}
								color='primary'
								avatar={
									<Avatar>
										<DateRange />
									</Avatar>
								}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<Typography className={typoClasses.title} color='textSecondary'>
								End Date
							</Typography>
							<Chip
								style={chipsStyles}
								label={extractAndFormatDateTime(props.tournamentDetails.date_end)}
								color='secondary'
								avatar={
									<Avatar>
										<DateRange />
									</Avatar>
								}
							/>
						</Grid>
					</Grid>
				</Typography>
			</CardContent>
		</Card>
	);
};

export default TournamentDetails;
