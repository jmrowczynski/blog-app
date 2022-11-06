import React, { useState } from 'react';
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
import Dialog from './organisms/Dialog/Dialog';
import { useDeletePostMutation } from '../services/api/hooks/useDeletePostMutation';

export type PostCardProps = Pick<
    IPost,
    'title' | 'content' | 'slug' | 'user' | 'category' | 'excerpt'
>;

const PostCard: React.FunctionComponent<PostCardProps> = (props) => {
    const { title, slug, user, category, excerpt } = props;
    const { isAdmin, user: currentUser } = useAppContext();
    const [open, setOpen] = useState(false);
    const { mutate: deletePost, isLoading } = useDeletePostMutation();

    const handleDialogClose = () => setOpen(false);
    const handleDialogOpen = () => setOpen(true);
    const handlePostDelete = () => {
        deletePost(slug, {
            onSuccess() {
                setOpen(false);
            },
        });
    };

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
                            onClick={handleDialogOpen}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}
            </CardActions>
            {open && (
                <Dialog
                    open={open}
                    onClose={handleDialogClose}
                    onAccept={handlePostDelete}
                    title={title}
                    content={`Are you sure you want to delete ${title}?`}
                    isActionLoading={isLoading}
                />
            )}
        </Card>
    );
};

export default PostCard;
