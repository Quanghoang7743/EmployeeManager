import { 
    Box, 
    Button, 
    InputAdornment, 
    Stack, 
    TextField, 
    Typography,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from '@mui/material';
import ListUser from './list-user';
import StatsCard from './statsCard';
import SearchIcon from "@mui/icons-material/Search";
import useAddUserStore, { USER_ACTION } from '../zustand-store/add-user-state';
import AddUserDialog from '../components/dialogs/dialog-add-user';
import { ToastContainer } from 'react-toastify';
import { useFilterStore } from '../zustand-store/filter-state';
import { useUserStore } from '../zustand-store/api-user-state';
import { useEffect } from 'react';

export default function UserPage() {
    const useraddstate = useAddUserStore()
    const { name, email, department, setName, setEmail, setDepartment, getFilters } = useFilterStore()
    const { fetchUsers } = useUserStore()
    
    const handleAddUser = () => {
        useraddstate.requestAction(USER_ACTION.ADD, {})
    }

    // Fetch users with filters whenever filters change
    useEffect(() => {
        const filters = getFilters()
        fetchUsers(filters)
    }, [name, email, department, fetchUsers, getFilters])

    return (
        <Box sx={{ bgcolor: "#0B1437", minHeight: "100vh", p: 4 }}>
            {/* Header */}
            <Stack flexDirection="row" alignItems="center" justifyContent="space-between" mb={4}>
                <Typography sx={{ fontSize: "28px", fontWeight: "bold", color: "#fff" }}>
                    Users
                </Typography>
                <Button 
                    variant="contained"
                    sx={{ 
                        bgcolor: "#a855f7",
                        color: "#fff",
                        textTransform: "none",
                        px: 3,
                        py: 1,
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: 500,
                        "&:hover": {
                            bgcolor: "#9333ea",
                        }
                    }}
                    onClick={handleAddUser}
                >
                    Add user
                </Button>
            </Stack>

            {/* Search/Filter Section */}
            <Box sx={{ bgcolor: "#1a2847", border: "1px solid #2d3a5f", borderRadius: "12px", p: 3, mb: 4 }}>
                <Typography sx={{ color: "#fff", fontSize: "16px", fontWeight: 600, mb: 2 }}>
                    Search/Filter
                </Typography>
                <Stack flexDirection="row" gap={2}>
                    <TextField
                        placeholder="Search by name..."
                        variant="outlined"
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{
                            flex: 1,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                                bgcolor: "#0B1437",
                                "& fieldset": {
                                    borderColor: "#2d3a5f",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#3d4a6f",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#a855f7",
                                },
                                "& input": {
                                    color: "#fff",
                                    fontSize: "14px",
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "#4a5578", fontSize: "20px" }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        placeholder="Search by email..."
                        variant="outlined"
                        size="small"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            flex: 1,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                                bgcolor: "#0B1437",
                                "& fieldset": {
                                    borderColor: "#2d3a5f",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#3d4a6f",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#a855f7",
                                },
                                "& input": {
                                    color: "#fff",
                                    fontSize: "14px",
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "#4a5578", fontSize: "20px" }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl
                        size="small"
                        sx={{
                            flex: 1,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                                bgcolor: "#0B1437",
                                "& fieldset": {
                                    borderColor: "#2d3a5f",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#3d4a6f",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#a855f7",
                                },
                            },
                            "& .MuiSelect-select": {
                                color: "#fff",
                                fontSize: "14px",
                            },
                            "& .MuiInputLabel-root": {
                                color: "#8b92b0",
                                fontSize: "14px",
                            },
                        }}
                    >
                        <InputLabel sx={{ color: "#8b92b0" }}>Department</InputLabel>
                        <Select
                            value={department}
                            label="Department"
                            onChange={(e) => setDepartment(e.target.value)}
                            sx={{
                                "& .MuiSvgIcon-root": {
                                    color: "#8b92b0",
                                },
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        bgcolor: "#1a2847",
                                        border: "1px solid #2d3a5f",
                                        "& .MuiMenuItem-root": {
                                            color: "#fff",
                                            "&:hover": {
                                                bgcolor: "#0B1437",
                                            },
                                            "&.Mui-selected": {
                                                bgcolor: "#0B1437",
                                                "&:hover": {
                                                    bgcolor: "#0B1437",
                                                },
                                            },
                                        },
                                    },
                                },
                            }}
                        >
                            <MenuItem value="">All Departments</MenuItem>
                            <MenuItem value="IT">IT</MenuItem>
                            <MenuItem value="Engineering">Engineering</MenuItem>
                            <MenuItem value="Marketing">Marketing</MenuItem>
                            <MenuItem value="Sales">Sales</MenuItem>
                            <MenuItem value="HR">HR</MenuItem>
                            <MenuItem value="Finance">Finance</MenuItem>
                            <MenuItem value="Design">Design</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Box>

            <StatsCard/>
            <ListUser/>
            {/* Dialog */}
            <AddUserDialog/>
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </Box>
    );
}
