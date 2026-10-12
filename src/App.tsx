import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Dashboard from "./Components/Dashboard";
import Transactions from "./Components/Transactions";
import AddTransactionDialog from "./Components/AddTransactionDialog";
import "./App.css";

function AppContent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header onAdd={() => setOpen(true)} />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>

      <AddTransactionDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

