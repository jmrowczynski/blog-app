import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import {
    Avatar,
    Box,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import EditUserForm from '../components/organisms/EditUserForm/EditUserForm';
import { NumberParam, useQueryParam } from 'use-query-params';
import { useMyPostsQuery } from '../services/api/hooks/useMyPostsQuery';
import PostCard, { PostCardProps } from '../components/PostCard';
import { useAppContext } from '../context/app.context';
import { useUsersQuery } from '../services/api/hooks/useUsersQuery';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value?: number | null;
}

function TabPanel(props: TabPanelProps) {
    const { children, value = 0, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const MyPosts = () => {
    const posts = useMyPostsQuery();
    const postsData = posts.data?.data?.data;

    const renderPosts =
        postsData?.length > 0 ? (
            <Grid container spacing={2} style={{ marginBottom: '3rem' }}>
                {postsData.map((post: PostCardProps) => (
                    <Grid key={post.id} item xs={12} sm={6} md={4}>
                        <PostCard
                            slug={post.slug}
                            title={post.title}
                            content={post.content}
                        />
                    </Grid>
                ))}
            </Grid>
        ) : (
            <Typography>No results</Typography>
        );

    return (
        <div>
            {posts.isLoading ? (
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                renderPosts
            )}
        </div>
    );
};

const Users = () => {
    const users = useUsersQuery();
    const usersData = users.data?.data;
    const { user: currentUser } = useAppContext();

    const renderUsers =
        !!usersData && usersData.length > 0 ? (
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersData.map((user) => (
                        <TableRow
                            key={user.id}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                            hover
                        >
                            <TableCell component="th" scope="row" width={50}>
                                <Avatar
                                    alt={user.name}
                                    src={user.avatar}
                                    sx={{
                                        marginLeft: 1,
                                        width: 30,
                                        height: 30,
                                    }}
                                >
                                    {user.name[0]}
                                </Avatar>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {user.name}
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">
                                <IconButton
                                    aria-label="delete"
                                    disabled={currentUser.id === user.id}
                                    color="error"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        ) : (
            <Typography>No results</Typography>
        );

    return (
        <div>
            {users.isLoading ? (
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                renderUsers
            )}
        </div>
    );
};

const Account = () => {
    const [tab, setTab] = useQueryParam('tab', NumberParam);
    const { isAdmin } = useAppContext();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };
    return (
        <MainTemplate>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tab ?? 0}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="General" />
                    <Tab label="My posts" />
                    {isAdmin && <Tab label="Users" />}
                </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
                <Container maxWidth="sm">
                    <EditUserForm />
                </Container>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <MyPosts />
            </TabPanel>
            {isAdmin && (
                <TabPanel value={tab} index={2}>
                    <Users />
                </TabPanel>
            )}
        </MainTemplate>
    );
};

export default Account;
