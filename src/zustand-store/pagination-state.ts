import { create } from 'zustand';

interface PaginationState {
    currentPage: number;
    rowsPerPage: number;
    setCurrentPage: (page: number) => void;
    setRowsPerPage: (rows: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    reset: () => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
    currentPage: 1,
    rowsPerPage: 10,
    setCurrentPage: (page) => set({ currentPage: page }),
    setRowsPerPage: (rows) => set({ rowsPerPage: rows, currentPage: 1 }), // Reset to page 1 when changing rows per page
    nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
    prevPage: () => set((state) => ({ currentPage: Math.max(1, state.currentPage - 1) })),
    reset: () => set({ currentPage: 1, rowsPerPage: 10 }),
}));
