import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";

import {
  Restaurant,
  DirectionsBus,
  ShoppingBag,
  Receipt,
  SportsEsports,
  Category,
} from "@mui/icons-material";

import { useExpenseStore } from "../store/expenseStore";

// Each category has its own icon.
const categories = [
  { name: "Food", icon: <Restaurant /> },
  { name: "Transport", icon: <DirectionsBus /> },
  { name: "Shopping", icon: <ShoppingBag /> },
  { name: "Bills", icon: <Receipt /> },
  { name: "Entertainment", icon: <SportsEsports /> },
  { name: "Other", icon: <Category /> },
];

interface Props {
  open: boolean;
  onClose: () => void;
}
interface FormValues {
  title: string;
  amount: string;
  category: string;
  type: "expense" | "income";
  date: string;
}

export default function AddTransactionDialog({ open, onClose }: Props) {
  const addExpense = useExpenseStore((state) => state.addExpense);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      amount: "",
      category: "Food",
      type: "expense",
      date: new Date().toISOString().slice(0, 10),
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        title: "",
        amount: "",
        category: "Food",
        type: "expense",
        date: new Date().toISOString().slice(0, 10),
      });
    }
  }, [open, reset]);

  const onSubmit = (data: FormValues): void => {
    addExpense({
      ...data,
      amount: Number(data.amount),
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Transaction</DialogTitle>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box className="expense-form">
            <TextField
              label="Work name"
              placeholder="e.g. Groceries or Salary"
              fullWidth
              {...register("title", {
                required: "Work name is required",
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Amount ($)"
              type="number"
              fullWidth
              {...register("amount", {
                required: "Amount is required",
                valueAsNumber: true,
                min: {
                  value: 0.01,
                  message: "Amount must be greater than zero",
                },
              })}
              error={!!errors.amount}
              helperText={errors.amount?.message}
              slotProps={{
                htmlInput: {
                  min: 0.01,
                  step: 0.01,
                },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              select
              label="Select-type"
              fullWidth
              defaultValue="Food"
              {...register("category")}
            >
              {categories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  <Box className="category-option">
                    {category.icon}
                    {category.name}
                  </Box>
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Type"
              fullWidth
              defaultValue="expense"
              {...register("type")}
            >
              <MenuItem value="expense">Expense</MenuItem>
              <MenuItem value="income">Income</MenuItem>
            </TextField>

            <TextField
              label="Schedule"
              type="date"
              fullWidth
              {...register("date", {
                required: "Please select a date",
              })}
              error={!!errors.date}
              helperText={errors.date?.message}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>

          <Button type="submit" variant="contained">
            Save Transaction
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
