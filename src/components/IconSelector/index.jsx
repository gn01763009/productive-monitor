import {
	AssignmentTurnedIn,
	EmojiEvents,
	Functions,
	Group,
} from '@mui/icons-material';
import React from 'react';

const IconSelector = ({ id }) => {
	switch (id) {
		case 'group':
			return <Group fontSize='large' />;
		case 'assignmentTurnedIn':
			return <AssignmentTurnedIn fontSize='large' />;
		case 'emojiEvents':
			return <EmojiEvents fontSize='large' />;
		case 'functions':
			return <Functions fontSize='large' />;
		default:
			break;
	}
};

export default IconSelector;
