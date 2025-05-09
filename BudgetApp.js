import { useState, useEffect } from "react";

export default function BudgetApp() {
  const [entries, setEntries] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("meno");
  const [category, setCategory] = useState("Pakollinen meno");

  useEffect(() => {
    const saved = localStorage.getItem("budget-entries");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("budget-entries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!amount || isNaN(amount)) return;
    setEntries([
      ...entries,
      {
        amount: parseFloat(amount),
        type,
        category,
        id: Date.now(),
      },
    ]);
    setAmount("");
  };

  const total = entries.reduce((acc, e) => e.type === "tulo" ? acc + e.amount : acc - e.amount, 0);

  return (
    <div style={{ padding: '1rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>
        Oma Budjetti
      </h1>
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#555', marginBottom: '1rem' }}>
        Stadin etsivät, Helsingin kaupungin etsivä nuorisotyö
      </p>
      <input
        type="number"
        placeholder="Summa (€)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
      />
      <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}>
        <option value="meno">Meno</option>
        <option value="tulo">Tulo</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}>
        <option value="Pakollinen meno">Pakollinen meno</option>
        <option value="Muu meno">Muu meno</option>
        <option value="Tulo">Tulo</option>
      </select>
      <button onClick={addEntry} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '1rem' }}>
        Tallenna
      </button>
      <h2 style={{ fontWeight: '600' }}>Saldo: {total.toFixed(2)} €</h2>
      {entries.length === 0 && <p>Ei tapahtumia vielä.</p>}
      {entries.map((e) => (
        <div key={e.id} style={{ fontSize: '0.875rem', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.25rem' }}>
          {e.type === "tulo" ? "+" : "-"}{e.amount.toFixed(2)} € - {e.category}
        </div>
      ))}
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#999', marginTop: '2rem' }}>
        Versio 1.0
      </p>
    </div>
  );
}