import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useExpenseStore = create(
  persist(
    (set) => ({
      expenses: [
        {
          id: 1,
          title: "Groceries",
          amount: 85,
          category: "Food",
          type: "expense",
          date: "2026-10-10",
        },
        {
          id: 2,
          title: "Transport",
          amount: 25,
          category: "Transport",
          type: "expense",
          date: "2026-10-09",
        },
        {
          id: 3,
          title: "Freelance Work",
          amount: 600,
          category: "Work",
          type: "income",
          date: "2026-10-08",
        },
      ],

      addExpense: (expense) =>
        set((state) => ({
          expenses: [{ ...expense, id: Date.now() }, ...state.expenses],
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "expense-tracker",
    },
  ),
);
