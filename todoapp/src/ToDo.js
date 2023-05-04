import React, { useState, useEffect } from "react";
import "./styles.css";

function getItemsFromLocalStorage() {
  // getting stored value
  const saved = localStorage.getItem("items");
  const initialValue = JSON.parse(saved) || [];
  // relabel the keys from 0 to length-1
  for (let i = 0; i < initialValue.length; i++) {
    initialValue[i]["key"] = i;
  }
  return initialValue || [];
}

function testing() {
  console.log("This is a test!");
}

export default function ToDo() {
  let [items, setItems] = useState(getItemsFromLocalStorage);
  let [numKeys, setNumKeys] = useState(() => items.length);
  let [msg, setMsg] = useState("none");

  function add_item() {
    // add an item to the todolist
    const item = document.getElementById("item").value;
    const category = document.getElementById("category").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;
    let newItem = {
      key: numKeys,
      cate: category,
      amou: amount,
      dat: date,
      desc: item,
      completed: false
    };
    document.getElementById("item").value = "";
    document.getElementById("category").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    setNumKeys(numKeys + 1);
    setItems([newItem, ...items]); // using the spread operator ...
  }

  function deleteItem(key) {
    console.log(key);
    const newItems = items.filter((x) => x["key"] !== key);
    setItems(newItems);
    setNumKeys(numKeys - 1);
  }

  function sortItems(sortBy) {
    if (sortBy === "date") {
      items.sort((a, b) => new Date(a.dat) - new Date(b.dat));
    } else if (sortBy === "amount") {
      items.sort((a, b) => a.amou - b.amou);
    }
  }

  useEffect(() => {
    // storing items if items changes value
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // // demo of how to get data from an Express server
  // useEffect(() => {
  //   const getMsg = async () => {
  //     const response = await fetch('http://localhost:3000/test');
  //     const result = await response.json();
  //     setMsg(result);
  //     console.log('msg =',result);
  //   }
  //   getMsg()
  // },[msg])

  // this is used to allow text data to be submitted
  // when the user hits the 'Enter' key
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // 👇 Get input value
      add_item();
    }
  };

  function toggleCompleted(item) {
    item.completed = !item.completed;
    setItems([...items]); // force redraw of screen
  }

  return (
    <div className="App container">
      <h1 className="bg-warning text-center p-2">Transaction list</h1>
      {msg}

      <table>
        <tbody>
          {items.map((item) => (
            <tr>
              <td>
                <button onClick={() => deleteItem(item["key"])}>X</button>
              </td>
              <td>
                <button onClick={() => toggleCompleted(item)}>
                  {item["completed"] ? "C" : "+"}
                </button>
              </td>
              <td>Item_ID: {item["key"]} </td>
              <td>Amount: {item["amou"]} </td>
              <td>Category: {item["cate"]} </td>
              <td>Date: {item["dat"]} </td>
              <td>description: {item["desc"]} </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => sortItems("Date")}>Sort by Date</button>
      <button onClick={() => sortItems("Amount")}>Sort by Amount</button>
      <button onClick={() => sortItems("Category")}>Sort by Category</button>
      <button onClick={() => sortItems("Description")}>
        Sort by Description
      </button>

      <h2> add new todo item </h2>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        id="item"
        placeholder="description"
      />
      <input
        type="text"
        onKeyDown={handleKeyDown}
        id="category"
        placeholder="category"
      />
      <input
        type="Number"
        onKeyDown={handleKeyDown}
        id="amount"
        placeholder="amount"
      />
      <input
        type="date"
        onKeyDown={handleKeyDown}
        id="date"
        placeholder="date"
      />
      <button onClick={() => add_item()}>add Transaction</button>

      <h2> DEBUGGING: list of items in JSON </h2>
      <pre>{JSON.stringify(items, null, 5)}</pre>
    </div>
  );
}
