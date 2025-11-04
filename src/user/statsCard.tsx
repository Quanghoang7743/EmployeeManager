import { Box, IconButton, Stack, Typography } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupIcon from '@mui/icons-material/Group';

import { useUserStore } from '../zustand-store/api-user-state';
import dayjs from 'dayjs';
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";


dayjs.extend(isSameOrAfter);

export default function StatsCard() {
    const { users, isLoading } = useUserStore()

    
    return (
        <Stack flexDirection="row" gap={3} mb={4}>
            <Box
                sx={{
                    bgcolor: "#1a2847",
                    border: "1px solid #2d3a5f",
                    borderRadius: "12px",
                    p: 3,
                    flex: 1,
                    position: "relative"
                }}
            >
                <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Stack flexDirection="row" alignItems="center" gap={2}>
                        <Box
                            sx={{
                                bgcolor: "#7c3aed20",
                                borderRadius: "12px",
                                p: 1.5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <PeopleIcon sx={{ color: "#a855f7", fontSize: "28px" }} />
                        </Box>
                        <Stack>
                            <Typography sx={{ color: "#8b92b0", fontSize: "14px" }}>
                                Total Users
                            </Typography>
                            <Typography sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
                                {isLoading ? "..." : users.length}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>

            <Box
                sx={{
                    bgcolor: "#1a2847",
                    border: "1px solid #2d3a5f",
                    borderRadius: "12px",
                    p: 3,
                    flex: 1,
                    position: "relative"
                }}
            >
                <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Stack flexDirection="row" alignItems="center" gap={2}>
                        <Box
                            sx={{
                                bgcolor: "#f59e0b20",
                                borderRadius: "12px",
                                p: 1.5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <PersonAddIcon sx={{ color: "#f59e0b", fontSize: "28px" }} />
                        </Box>
                        <Stack>
                            <Typography sx={{ color: "#8b92b0", fontSize: "14px" }}>
                                New Users
                            </Typography>
                            <Typography sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
                                {/* lay so nam moi nhat trong data de hien thi so user moi */}
                                {isLoading ? "..." : users.filter((user: any) => dayjs(user.joinDate).isSameOrAfter(dayjs().subtract(1, 'year'))).length}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>

            <Box
                sx={{
                    bgcolor: "#1a2847",
                    border: "1px solid #2d3a5f",
                    borderRadius: "12px",
                    p: 3,
                    flex: 1,
                    position: "relative"
                }}
            >
                <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Stack flexDirection="row" alignItems="center" gap={2}>
                        <Box
                            sx={{
                                bgcolor: "#10b98120",
                                borderRadius: "12px",
                                p: 1.5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <FavoriteIcon sx={{ color: "#10b981", fontSize: "28px" }} />
                        </Box>
                        <Stack>
                            <Typography sx={{ color: "#8b92b0", fontSize: "14px" }}>
                                Top Users
                            </Typography>
                            <Typography sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
                                0
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>

            <Box
                sx={{
                    bgcolor: "#1a2847",
                    border: "1px solid #2d3a5f",
                    borderRadius: "12px",
                    p: 3,
                    flex: 1,
                    position: "relative"
                }}
            >
                <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Stack flexDirection="row" alignItems="center" gap={2}>
                        <Box
                            sx={{
                                bgcolor: "#3b82f620",
                                borderRadius: "12px",
                                p: 1.5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <GroupIcon sx={{ color: "#3b82f6", fontSize: "28px" }} />
                        </Box>
                        <Stack>
                            <Typography sx={{ color: "#8b92b0", fontSize: "14px" }}>
                                Other Users
                            </Typography>
                            <Typography sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
                                0
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    )
}
