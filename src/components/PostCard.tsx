import React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { posts } from '../routing/routes';

export interface PostCardProps {
    id?: number;
    title: string;
    content: string;
    slug: string;
}

const PostCard: React.FunctionComponent<PostCardProps> = (props) => {
    const { title, content, slug } = props;

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
                <Button size="small" component={Link} to={`${posts}/${slug}`}>
                    Read More
                </Button>
            </CardActions>
        </Card>
    );
};

export default PostCard;
