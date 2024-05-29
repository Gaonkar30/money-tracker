import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransaction().then(setTransactions);
  }, []);

  async function getTransaction() {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  function addTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const price = name.split(" ")[0];
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      }),
    })
      .then((response) => {
        response.json().then((json) => {
          setName("");
          setDatetime("");
          setDescription("");
          console.log("result", json);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  let balance=0
  for (const transaction of transactions){
    balance+=transaction.price
  }
  return (
    <main>
      <h1>
        ${balance}<span>.00</span>
      </h1>
      <form onSubmit={addTransaction}>
        <div className="basics">
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder={"+200 tv"}
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(ev) => setDatetime(ev.target.value)}
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="description"
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 && transactions.map((transaction) => (
          <div className="transaction" key={transaction.id}>
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={`price ${transaction.price < 0 ? "red" : "green"}`}>
                {transaction.price}
              </div>
              <div className="date-time">{transaction.datetime}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
