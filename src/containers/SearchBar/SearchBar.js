import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const searchBarStyles = makeStyles({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center'
	},
	input: {
		marginLeft: 8,
		flex: 1
	},
	divider: {
		width: 1,
		height: 28,
		margin: 4
	}
});

const chipStyles = makeStyles((theme) => ({
	chip: {
		margin: theme.spacing(1)
	}
}));

const gridStyles = {
	paddingTop: '50px'
};

const searchIconStyles = {
	padding: '10px'
};

const filterMapping = [
	{ key: 'name', value: 'Series Name' },
	{ key: 'date_start', value: 'Start Date' },
	{ key: 'date_end', value: 'End Date' }
];

const SearchBar = (props) => {
	const searchBarClasses = searchBarStyles();
	const chipClasses = chipStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	function handleClose() {
		setAnchorEl(null);
	}

	function handleClickListItem(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuItemClick(event, item) {
		props.setFilterBy(item.key);
		setAnchorEl(null);
	}

	let menuItemList = filterMapping.map((item, index) => {
		return (
			<MenuItem key={index} onClick={(event) => handleMenuItemClick(event, item)}>
				{item.value}
			</MenuItem>
		);
	});

	return (
		<Grid container style={gridStyles}>
			<Grid item md={2} xs={1} />
			<Grid item md={8} xs={10}>
				<Paper className={searchBarClasses.root}>
					<Chip
						avatar={
							<Avatar>
								<ExpandMore />
							</Avatar>
						}
						label={filterMapping.find((elem) => elem.key === props.filterKey).value}
						clickable
						className={chipClasses.chip}
						color='primary'
						onClick={handleClickListItem}
					/>
					<Menu id='simple-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
						{menuItemList}
					</Menu>
					<Divider className={searchBarClasses.divider} />
					<InputBase
						className={searchBarClasses.input}
						placeholder='Search'
						onChange={(event) => props.onSearch(props.filterKey, event.target.value)}
					/>
					<SearchIcon style={searchIconStyles} />
				</Paper>
			</Grid>
			<Grid item md={2} xs={1} />
		</Grid>
	);
};

export default SearchBar;
