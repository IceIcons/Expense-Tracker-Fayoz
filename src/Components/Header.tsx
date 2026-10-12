import { Box, Button, Typography } from "@mui/material";

import {
  AccountBalanceWallet,
  Add,
  Dashboard,
  ReceiptLong,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

interface HeaderProps {
  onAdd: () => void;
}

export default function Header({ onAdd }: HeaderProps) {
  return (
    <Box className="navbar">
      <Typography variant="h5" className="brand">
        <AccountBalanceWallet />
        Expense Tracker
      </Typography>

      <Box className="nav-links">
        <NavLink to="/" end>
          <Dashboard />
          Dashboard
        </NavLink>

        <NavLink to="/transactions">
          <ReceiptLong />
          Transactions
        </NavLink>

        <Button variant="contained" startIcon={<Add />} onClick={onAdd}>
          Add
        </Button>
      </Box>
    </Box>
  );
}
