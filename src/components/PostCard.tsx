import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { editPost, posts } from '../routing/routes';
import DOMPurify from 'dompurify';
import { useAppContext } from '../context/app.context';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IPost } from '../services/types';

export type PostCardProps = Pick<
    IPost,
    'title' | 'content' | 'slug' | 'user' | 'category' | 'excerpt'
>;

const PostCard: React.FunctionComponent<PostCardProps> = (props) => {
    const { title, slug, user, category, excerpt } = props;
    const { isAdmin, user: currentUser } = useAppContext();

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <CardContent>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                {category && (
                    <Typography variant="caption" color="primary">
                        {category.name}
                    </Typography>
                )}
                {!!excerpt && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(excerpt),
                        }}
                        className="line-clamp-6"
                        sx={{ marginTop: 2 }}
                    />
                )}
            </CardContent>
            <CardActions>
                <Button size="small" component={Link} to={`${posts}/${slug}`}>
                    Read More
                </Button>
                {(isAdmin || currentUser?.id === user.id) && (
                    <Box sx={{ marginLeft: 'auto' }}>
                        <Link to={editPost.replace(':slug', slug)}>
                            <IconButton aria-label="edit" color="info">
                                <EditIcon />
                            </IconButton>
                        </Link>
                        <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => {}}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}
            </CardActions>
        </Card>
    );
};

export default PostCard;
