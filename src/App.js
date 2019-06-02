import React from 'react';
import Container from '@material-ui/core/Container';
import TournamentsView from './containers/TournamentsView/TournamentsView';
import Grid from '@material-ui/core/Grid';

function App() {
	return (
		<React.Fragment>
			<Container maxWidth='md'>
				<Grid container direction='column' justify='center' alignItems='stretch'>
					<Grid item xs={12}>
						<TournamentsView />
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
}

export default App;
