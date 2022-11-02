import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { posts } from '../routing/routes';
import DOMPurify from 'dompurify';

export interface PostCardProps {
    id?: number;
    title: string;
    content: string;
    slug: string;
}

const PostCard: React.FunctionComponent<PostCardProps> = (props) => {
    const { title, content, slug } = props;
    const contentRef = useRef<HTMLElement>(null);
    const [excerpt, setExcerpt] = useState(content);

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
            </CardActions>
        </Card>
    );
};

export default PostCard;
