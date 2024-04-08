import { create } from "zustand";
import { BASE_URL } from "./data";

export const useStore = create((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, { data: { ...item }, amount: 1 }],
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.data.id !== id),
    })),

  removeAllItems: () => set({ items: [] }),

  increaseAmount: (id) =>
    set((state) => ({
      items: state.items.map((item) => {
        if (item.data.id === id) {
          item.amount += 1;
        }
        return item;
      }),
    })),
  decreaseAmount: (id) =>
    set((state) => ({
      items: state.items.map((item) => {
        if (item.data.id === id) {
          item.amount -= 1;
        }
        if (item.amount <= 0) {
          item.amount = 1;
        }
        return item;
      }),
    })),
}));

export const useApiStore = create((set) => ({
  products: [],
  error: false,
  isLoading: true,
  setProducts: (products) => set({ products }),
  fetchProducts: async () => {
    try {
      set({ isLoading: true });
      const response = await fetch(BASE_URL);
      const data = await response.json();
      set({ products: data });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      set({ error: true });
    }
  },
}));
