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

const SeriesDetails = (props) => {
	const seriesClasses = seriesStyles();
	const typoClasses = typoStyles();
	const DATE_FORMAT = 'ddd, mmm dS, yyyy';

	return (
		<Card className={seriesClasses.card}>
			<CardContent>
				<Typography variant='h6' component='h2'>
					{props.seriesDetails.name}
				</Typography>
				<Divider style={dividerStyles} />
				<Typography variant='body2' component='span'>
					<Grid container spacing={2}>
						<Grid item md={6} xs={12}>
							<Typography className={typoClasses.title} color='textSecondary' gutterBottom>
								Start Date
							</Typography>
							<Chip
								label={dateformat(props.seriesDetails.date_start, DATE_FORMAT)}
								color='primary'
								avatar={
									<Avatar>
										<DateRange />
									</Avatar>
								}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<Typography className={typoClasses.title} color='textSecondary' gutterBottom>
								End Date
							</Typography>
							<Chip
								label={dateformat(props.seriesDetails.date_end, DATE_FORMAT)}
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

export default SeriesDetails;
