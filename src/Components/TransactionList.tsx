import { useState } from "react";

import {
  Box,
  Card,
  Typography,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";

import {
  Delete,
  Restaurant,
  DirectionsBus,
  ShoppingBag,
  Receipt,
  SportsEsports,
  Category,
  Work,
} from "@mui/icons-material";

import { useExpenseStore } from "../store/expenseStore";

interface ExpenseItem {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string;
}

interface TransactionListProps {
  limit?: number;
}

type FilterType = "all" | "income" | "expense";

const categoryIcons: Record<string, typeof Restaurant> = {
  Food: Restaurant,
  Transport: DirectionsBus,
  Shopping: ShoppingBag,
  Bills: Receipt,
  Entertainment: SportsEsports,
  Other: Category,
  Work: Work,
};

export default function TransactionList({ limit }: TransactionListProps) {
  const expenses = useExpenseStore((state) => state.expenses) as ExpenseItem[];
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);

  const [filter, setFilter] = useState<FilterType>("all");

  const filteredExpenses = expenses.filter((item) => {
    return filter === "all" || item.type === filter;
  });

  const visibleExpenses = limit
    ? filteredExpenses.slice(0, limit)
    : filteredExpenses;

  return (
    <Box className="transactions">
      <Box className="list-heading">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {limit ? "Recent Transactions" : "All Transactions"}
        </Typography>

        {!limit && (
          <TextField
            select
            size="small"
            label="Filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value as FilterType)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expenses</MenuItem>
          </TextField>
        )}
      </Box>

      {visibleExpenses.length === 0 ? (
        <Typography color="text.secondary">No transactions found.</Typography>
      ) : (
        visibleExpenses.map((item) => {
          const Icon = categoryIcons[item.category] || Category;

          return (
            <Card key={item.id} className="transaction-card">
              <Box className="transaction-info">
                <Box className="transaction-icon">
                  <Icon />
                </Box>

                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {item.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.category} · {item.date}
                  </Typography>
                </Box>
              </Box>

              <Box className="transaction-actions">
                <Typography
                  sx={{ fontWeight: "bold" }}
                  color={item.type === "income" ? "success.main" : "error.main"}
                >
                  {item.type === "income" ? "+" : "-"}$
                  {Number(item.amount).toFixed(2)}
                </Typography>

                <IconButton
                  color="error"
                  onClick={() => deleteExpense(item.id)}
                  aria-label={`Delete ${item.title}`}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          );
        })
      )}
    </Box>
  );
}
