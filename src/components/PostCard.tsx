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

export interface PostCardProps {
    id?: number;
    title: string;
    content: string;
    slug: string;
    user: IPost['user'];
}

const PostCard: React.FunctionComponent<PostCardProps> = (props) => {
    const { title, content, slug, user } = props;
    const contentRef = useRef<HTMLElement>(null);
    const [excerpt, setExcerpt] = useState(content);
    const { isAdmin, user: currentUser } = useAppContext();

    useEffect(() => {
        if (contentRef?.current) {
            const firstParagraph = contentRef.current.querySelector('p');

            setExcerpt(firstParagraph?.innerText || content);
        }
    }, [content, contentRef]);

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(excerpt),
                    }}
                    className="line-clamp-6"
                    ref={contentRef}
                />
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
