import { Container, Typography } from "@mui/material";
import TransactionList from "./TransactionList";

export default function Transactions() {
  return (
    <Container maxWidth="lg" className="page">
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
        Transactions
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Manage all your income and expenses.
      </Typography>

      <TransactionList />
    </Container>
  );
}
