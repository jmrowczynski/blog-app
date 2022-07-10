import React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { posts } from '../routing/routes';

const PostCard = (props) => {
    const { title, content, id } = props;

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" component={Link} to={`${posts}/${id}`}>
                    Read More
                </Button>
            </CardActions>
        </Card>
    );
};

export default PostCard;

PostCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};
