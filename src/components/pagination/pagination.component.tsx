import { IconButton, MenuItem, Select, Stack, Typography } from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import React from 'react'
import { usePaginationStore } from '../../zustand-store/pagination-state';
import { useUserStore } from '../../zustand-store/api-user-state';

export default function PaginationComponent() {
    const { currentPage, rowsPerPage, setRowsPerPage, nextPage, prevPage } = usePaginationStore();
    const { users } = useUserStore();

    const totalItems = users.length;
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage + 1;
    const endIndex = Math.min(currentPage * rowsPerPage, totalItems);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            prevPage();
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            nextPage();
        }
    };

    const handleRowsPerPageChange = (value: number) => {
        setRowsPerPage(value);
    };

    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            sx={{ borderTop: "1px solid #2d3a5f" }}
        >
            <Typography sx={{ color: "#8b92b0", fontSize: "14px" }}>
                {totalItems > 0 ? (
                    <>
                        <span style={{ color: "#a855f7" }}>{startIndex} - {endIndex}</span> of {totalItems}
                    </>
                ) : (
                    'No items'
                )}
            </Typography>
            <Stack flexDirection="row" alignItems="center" gap={2}>
                <Stack flexDirection="row" alignItems="center" gap={1}>
                    <Typography sx={{ color: "#8b92b0", fontSize: "14px" }}>
                        Rows per page:
                    </Typography>
                    <Select
                        value={rowsPerPage}
                        onChange={(e) => handleRowsPerPageChange(e.target.value as number)}
                        size="small"
                        sx={{
                            color: "#fff",
                            fontSize: "14px",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#2d3a5f"
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#3d4a6f"
                            },
                            "& .MuiSvgIcon-root": {
                                color: "#8b92b0"
                            }
                        }}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </Stack>
                <Stack flexDirection="row" gap={1}>
                    <IconButton
                        size="small"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        sx={{
                            color: "#8b92b0",
                            border: "1px solid #2d3a5f",
                            borderRadius: "6px",
                            "&:hover": { bgcolor: "#212d4d" },
                            "&:disabled": {
                                color: "#4a5578",
                                cursor: "not-allowed"
                            }
                        }}
                    >
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={handleNextPage}
                        disabled={currentPage >= totalPages}
                        sx={{
                            color: "#8b92b0",
                            border: "1px solid #2d3a5f",
                            borderRadius: "6px",
                            "&:hover": { bgcolor: "#212d4d" },
                            "&:disabled": {
                                color: "#4a5578",
                                cursor: "not-allowed"
                            }
                        }}
                    >
                        <NavigateNextIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>
    )
}
