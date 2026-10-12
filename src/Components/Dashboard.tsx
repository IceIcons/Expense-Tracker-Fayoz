import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
import SummaryCards from "./SummaryCards";
import TransactionList from "./TransactionList";

export default function Dashboard() {
  return (
    <Container maxWidth="lg" className="page">
      <Box className="page-heading">
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Dashboard
          </Typography>

          <Typography color="text.secondary">
            Welcome back! Here is your financial overview.
          </Typography>
        </Box>
      </Box>

      <SummaryCards />

      <TransactionList limit={5} />

      <Box className="view-all">
        <Button component={Link} to="/transactions" endIcon={<ArrowForward />}>
          View All Transactions
        </Button>
      </Box>
    </Container>
  );
}
