import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useExpenseStore } from "../store/expenseStore";

interface ExpenseType {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: "expense" | "income";
  date: string;
}

export default function SummaryCards() {
  const expenses = useExpenseStore((state) => state.expenses);

  const income = expenses
    .filter((item: ExpenseType) => item.type === "income")
    .reduce(
      (total: number, item: ExpenseType) => total + Number(item.amount),
      0,
    );

  const spent = expenses
    .filter((item: ExpenseType) => item.type === "expense")
    .reduce(
      (total: number, item: ExpenseType) => total + Number(item.amount),
      0,
    );

  const balance = income - spent;

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Card className="summary-card">
          <CardContent>
            <Typography color="text.secondary">Total Balance</Typography>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              ${balance.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <Card className="summary-card">
          <CardContent>
            <Typography color="text.secondary">Total Income</Typography>
            <Typography
              variant="h4"
              color="success.main"
              sx={{ fontWeight: "bold" }}
            >
              ${income.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <Card className="summary-card">
          <CardContent>
            <Typography color="text.secondary">Total Expenses</Typography>
            <Typography
              variant="h4"
              color="error.main"
              sx={{ fontWeight: "bold" }}
            >
              ${spent.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
