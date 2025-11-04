import { Box, Button, Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import useAddUserStore, { USER_ACTION } from '../../zustand-store/add-user-state'
import { useUserStore } from '../../zustand-store/api-user-state'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ApartmentIcon from '@mui/icons-material/Apartment';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast } from 'react-toastify';

export default function AddUserDialog() {
    const userstore = useAddUserStore()
    const { addUser, updateUser } = useUserStore()
    const [isLoading, setIsLoading] = React.useState(false)
    const notifySuccess = () => toast("User saved successfully!")
    const notifyError = () => toast("Failed to save user!")
    const notifyWarning = () => toast("Please fill in all required fields!")
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        joinDate: dayjs(),
    })

    const isEditMode = userstore.action === USER_ACTION.EDIT;

    const isOpenUserAdd = () => {
        return !!userstore.selected && (userstore.action === USER_ACTION.ADD || userstore.action === USER_ACTION.EDIT)
    }

    // Pre-fill form data when editing
    React.useEffect(() => {
        if (isEditMode && userstore.selected) {
            setFormData({
                name: userstore.selected.name || "",
                email: userstore.selected.email || "",
                phone: userstore.selected.phone || "",
                department: userstore.selected.department || "",
                joinDate: userstore.selected.joinDate ? dayjs(userstore.selected.joinDate) : dayjs(),
            })
        }
    }, [isEditMode, userstore.selected])
    
    const clearUserAdd = () => {
        userstore.clear()
        setFormData({
            name: "",
            email: "",
            phone: "",
            department: "",
            joinDate: dayjs(),
        })
    }

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            if (!formData.name || !formData.email) {
                return notifyWarning()
            }

            const userData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                department: formData.department,
                joinDate: formData.joinDate.format('YYYY-MM-DD')
            };

            if (isEditMode && userstore.selected?.id) {
                await updateUser(userstore.selected.id, userData)
            } else {
                await addUser(userData)
            }
            
            clearUserAdd()
            notifySuccess()
        } catch (error) {
            console.error('Failed to save user:', error)
            notifyError()
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Dialog
                open={isOpenUserAdd()}
                onClose={clearUserAdd}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(16px) saturate(180%)",
                        WebkitBackdropFilter: "blur(16px) saturate(180%)",
                        borderRadius: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.65)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    },
                }}
            >
                <DialogContent>
                    <Typography sx={{ color: "#fff", fontSize: "20px", fontWeight: 600, mb: 3, textAlign: "center" }}>
                        {isEditMode ? 'Edit User' : 'Add New User'}
                    </Typography>
                    <Stack flexDirection={"column"} alignItems={"center"} justifyContent={"center"} gap={5}>
                        <Stack flexDirection={"row"} alignItems={"center"} width={"100%"} gap={2}>
                            <Box display={"flex"} alignItems={"center"} gap={1}>
                                <PersonIcon sx={{ color: "#fff" }} />
                                <Typography sx={{
                                    color: "#fff",
                                    fontWeight: 600
                                }}>Name</Typography>
                            </Box>
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder='Name User'
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                sx={{
                                    flex: 1,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "8px",
                                        bgcolor: "#1a2847",
                                        "& fieldset": {
                                            borderColor: "#2d3a5f",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#3d4a6f",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#3d4a6f",
                                        },
                                        "& input": {
                                            color: "#fff",
                                            fontSize: "14px",
                                        },
                                    },
                                }}
                            />
                        </Stack>
                        <Stack flexDirection={"row"} alignItems={"center"} width={"100%"} gap={2}>
                            <Box display={"flex"} alignItems={"center"} gap={1}>
                                <EmailIcon sx={{ color: "#fff" }} />
                                <Typography sx={{
                                    color: "#fff",
                                    fontWeight: 600
                                }}>Email</Typography>
                            </Box>
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder='Email'
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                type="email"
                                sx={{
                                    flex: 1,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "8px",
                                        bgcolor: "#1a2847",
                                        "& fieldset": {
                                            borderColor: "#2d3a5f",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#3d4a6f",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#3d4a6f",
                                        },
                                        "& input": {
                                            color: "#fff",
                                            fontSize: "14px",
                                        },
                                    },
                                }}
                            />
                        </Stack>
                        <Stack flexDirection={"row"} alignItems={"center"} width={"100%"} gap={2}>
                            <Box display={"flex"} alignItems={"center"} gap={1}>
                                <PhoneAndroidIcon sx={{ color: "#fff" }} />
                                <Typography sx={{
                                    color: "#fff",
                                    fontWeight: 600
                                }}>Phone</Typography>
                            </Box>
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder='Phone Number'
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                sx={{
                                    flex: 1,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "8px",
                                        bgcolor: "#1a2847",
                                        "& fieldset": {
                                            borderColor: "#2d3a5f",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#3d4a6f",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#3d4a6f",
                                        },
                                        "& input": {
                                            color: "#fff",
                                            fontSize: "14px",
                                        },
                                    },
                                }}
                            />
                        </Stack>
                        <Stack flexDirection={"row"} alignItems={"center"} width={"100%"} gap={2}>
                            <Box display={"flex"} alignItems={"center"} gap={1}>
                                <ApartmentIcon sx={{ color: "#fff" }} />
                                <Typography sx={{
                                    color: "#fff",
                                    fontWeight: 600
                                }}>Department</Typography>
                            </Box>
                            <FormControl sx={{ flex: 1 }}>
                                <InputLabel id="demo-simple-select-label" sx={{ color: "#8b92b0" }}>Department</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formData.department}
                                    onChange={(e) => handleChange('department', e.target.value)}
                                    label="Department"
                                    sx={{
                                        color: "#fff",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#2d3a5f",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#3d4a6f",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#3d4a6f",
                                        },
                                        "& .MuiSvgIcon-root": {
                                            color: "#8b92b0",
                                        },
                                        bgcolor: "#1a2847",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <MenuItem value="IT">IT</MenuItem>
                                    <MenuItem value="Marketing">Marketing</MenuItem>
                                    <MenuItem value="Sales">Sales</MenuItem>
                                    <MenuItem value="HR">HR</MenuItem>
                                    <MenuItem value="Finance">Finance</MenuItem>
                                    <MenuItem value="Design">Design</MenuItem>
                                    <MenuItem value="Marketing">Marketing</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack flexDirection={"row"} alignItems={"center"} width={"100%"} gap={2}>
                            <Box display={"flex"} alignItems={"center"} gap={1}>
                                <CalendarMonthIcon sx={{ color: "#fff" }} />
                                <Typography sx={{
                                    color: "#fff",
                                    fontWeight: 600
                                }}>Join Date</Typography>
                            </Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={formData.joinDate}
                                    onChange={(newValue) => handleChange('joinDate', newValue)}
                                    slotProps={{ textField: { size: 'small', sx: { backgroundColor: '#fff', borderRadius: 1, flex: 1 } } }}
                                />
                            </LocalizationProvider>
                        </Stack>
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"flex-end"} paddingTop={2} gap={2}>
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
                            onClick={clearUserAdd}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={isLoading || !formData.name || !formData.email || !formData.phone || !formData.department}
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
                                },
                                "&:disabled": {
                                    bgcolor: "#6b7280",
                                    color: "#9ca3af",
                                }
                            }}
                        >
                            {isLoading ? 'Saving...' : (isEditMode ? 'Update' : 'Save')}
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )
}
