import { create } from 'zustand';
import type { FilterParams } from './api-user-state';

interface FilterState extends FilterParams {
    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setDepartment: (department: string) => void;
    clearFilters: () => void;
    getFilters: () => FilterParams;
}

export const useFilterStore = create<FilterState>((set, get) => ({
    name: '',
    email: '',
    department: '',
    setName: (name) => set({ name }),
    setEmail: (email) => set({ email }),
    setDepartment: (department) => set({ department }),
    clearFilters: () => set({ name: '', email: '', department: '' }),
    getFilters: () => {
        const { name, email, department } = get();
        const filters: FilterParams = {};
        if (name) filters.name = name;
        if (email) filters.email = email;
        if (department) filters.department = department;
        return filters;
    },
}));
