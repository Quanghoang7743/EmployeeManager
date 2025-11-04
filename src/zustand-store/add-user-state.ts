import {create} from 'zustand'

export const USER_ACTION = {
    ADD: "ADD",
    EDIT: "EDIT",
} as const;

export type USER_ACTION = typeof USER_ACTION[keyof typeof USER_ACTION];

export interface AddUserState {
    action: USER_ACTION | null;
    selected: { [key: string]: any } | null;
    isLoading: boolean;
    setSelected: (collection: { [key: string]: any }) => void;
    setAction: (value: USER_ACTION) => void;
    setIsLoading: (value: boolean) => void;
    requestAction: (action: USER_ACTION, user: { [key: string]: any }) => void;
    clear: () => void;
}

const useAddUserStore = create<AddUserState>((set, get) => ({
    isLoading: false,
    setIsLoading: (value) => set({ isLoading: value }),
    selected: null,
    setSelected: (value: { [key: string]: any }) => set(() => ({ selected: value })),
    action: null,
    setAction: (value: USER_ACTION) => set(() => ({ action: value })),
    requestAction: (action: USER_ACTION, user: { [key: string]: any }) => {
        set(() => ({ selected: user }));
        set(() => ({ action: action }));
    },
    clear: () => {
        set(() => ({ selected: null }));
        set(() => ({ action: null }));
    },
}));

export default useAddUserStore;
