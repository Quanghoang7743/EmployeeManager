import { Avatar, Box, Checkbox, Chip, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import { useMemo } from 'react';
import { useUserStore } from '../zustand-store/api-user-state';
import { usePaginationStore } from '../zustand-store/pagination-state';
import PaginationComponent from '../components/pagination/pagination.component';
import useAddUserStore, { USER_ACTION } from '../zustand-store/add-user-state';
import { toast } from 'react-toastify';
import Loading from '../components/loading/loading.component';

export default function ListUser() {
    const { users, deleteUser, isLoading } = useUserStore()
    const { currentPage, rowsPerPage } = usePaginationStore()
    const userActionStore = useAddUserStore()

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return users.slice(startIndex, endIndex);
    }, [users, currentPage, rowsPerPage]);

    const totalItems = users.length;
    const startIndex = (currentPage - 1) * rowsPerPage + 1;
    const endIndex = Math.min(currentPage * rowsPerPage, totalItems);

    const handleEdit = (user: any) => {
        userActionStore.requestAction(USER_ACTION.EDIT, user)
    }

    const handleDelete = async (userId: string | number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(userId)
                toast.success('User deleted successfully!')
            } catch (error) {
                console.error('Failed to delete user:', error)
                toast.error('Failed to delete user!')
            }
        }
    }

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <Loading />
            </Box>
        )
    }

    return (
        <>
            <Box sx={{ bgcolor: "#1a2847", border: "1px solid #2d3a5f", borderRadius: "12px", overflow: "hidden" }}>
                <Stack flexDirection="row" alignItems="center" justifyContent="space-between" p={3}>
                    <Typography sx={{ color: "#fff", fontSize: "18px", fontWeight: 600 }}>
                        All Users
                    </Typography>
                    <Typography sx={{ color: "#8b92b0", fontSize: "14px" }}>
                        {totalItems > 0 ? (
                            <>
                                <Typography sx={{ color: "#a855f7" }}>{startIndex}-{endIndex}</Typography> of {totalItems}
                            </>
                        ) : (
                            'No users'
                        )}
                    </Typography>
                </Stack>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ borderBottom: "1px solid #2d3a5f" }}>
                                <TableCell padding="checkbox" sx={{ borderBottom: "1px solid #2d3a5f" }}>
                                    <Checkbox
                                        sx={{
                                            color: "#4a5578",
                                            "&.Mui-checked": { color: "#a855f7" }
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ color: "#8b92b0", fontSize: "12px", fontWeight: 600, borderBottom: "1px solid #2d3a5f" }}>
                                    <Stack flexDirection="row" alignItems="center" gap={0.5}>
                                        <PeopleIcon sx={{ fontSize: "16px" }} />
                                        Name
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ color: "#8b92b0", fontSize: "12px", fontWeight: 600, borderBottom: "1px solid #2d3a5f" }}>
                                    <Stack flexDirection="row" alignItems="center" gap={0.5}>
                                        <LocationOnIcon sx={{ fontSize: "16px" }} />
                                        Email
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ color: "#8b92b0", fontSize: "12px", fontWeight: 600, borderBottom: "1px solid #2d3a5f" }}>
                                    <Stack flexDirection="row" alignItems="center" gap={0.5}>
                                        <PhoneIcon sx={{ fontSize: "16px" }} />
                                        Phone
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ color: "#8b92b0", fontSize: "12px", fontWeight: 600, borderBottom: "1px solid #2d3a5f" }}>
                                    <Stack flexDirection="row" alignItems="center" gap={0.5}>
                                        <BusinessIcon sx={{ fontSize: "16px" }} />
                                        Department
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ color: "#8b92b0", fontSize: "12px", fontWeight: 600, borderBottom: "1px solid #2d3a5f" }}>
                                    <Stack flexDirection="row" alignItems="center" gap={0.5}>
                                        Join Date
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ borderBottom: "1px solid #2d3a5f" }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedUsers.map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{
                                        "&:hover": { bgcolor: "#212d4d" },
                                        borderBottom: "1px solid #2d3a5f"
                                    }}
                                >
                                    <TableCell padding="checkbox" sx={{ borderBottom: "1px solid #2d3a5f" }}>
                                        <Checkbox
                                            sx={{
                                                color: "#4a5578",
                                                "&.Mui-checked": { color: "#a855f7" }
                                            }}
                                        // checked={selected.includes(users.id)}
                                        // onChange={() => handleSelect(users.id)}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: "1px solid #2d3a5f" }}>
                                        <Stack flexDirection="row" alignItems="center" gap={2}>
                                            <Avatar
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    bgcolor: "#a855f7",
                                                    fontSize: "14px",
                                                    fontWeight: 600
                                                }}
                                            >
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </Avatar>
                                            <Stack>
                                                <Typography sx={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}>
                                                    {user.name}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </TableCell>
                                    <TableCell sx={{ color: "#8b92b0", fontSize: "14px", borderBottom: "1px solid #2d3a5f" }}>
                                        {user.email}
                                    </TableCell>
                                    <TableCell sx={{ color: "#8b92b0", fontSize: "14px", borderBottom: "1px solid #2d3a5f" }}>
                                        {user.phone}
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: "1px solid #2d3a5f" }}>
                                        <Stack flexDirection="row" alignItems="center" gap={1}>
                                            {/* <Box
                                                sx={{
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: "50%",
                                                    // bgcolor: user.departmentColor,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "10px",
                                                    fontWeight: "bold",
                                                    color: "#fff"
                                                }}
                                            >
                                                {user.department[0]}
                                            </Box> */}
                                            <Typography sx={{ color: "#8b92b0", fontSize: "14px" }}>
                                                {user.department}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: "1px solid #2d3a5f" }}>
                                        <Chip
                                            label={user.joinDate}
                                            size="small"
                                            sx={{
                                                bgcolor: "#4a557815",
                                                color: "#8b92b0",
                                                border: `1px solid #4a557830`,
                                                fontSize: "12px",
                                                fontWeight: 500,
                                                height: "28px"
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: "1px solid #2d3a5f" }}>
                                        <Stack flexDirection="row" gap={1}>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEdit(user)}
                                                sx={{ color: "#8b92b0", "&:hover": { color: "#a855f7" } }}
                                            >
                                                <EditIcon sx={{ fontSize: "18px" }} />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => user.id && handleDelete(user.id)}
                                                sx={{ color: "#8b92b0", "&:hover": { color: "#ef4444" } }}
                                            >
                                                <DeleteIcon sx={{ fontSize: "18px" }} />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <PaginationComponent />
            </Box>
        </>
    )
}
