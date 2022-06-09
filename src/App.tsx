import React, { useCallback, useState } from "react";
import { recipes } from "./recipes";
import { createShoppingList } from "./utils/createShoppingList";
import "./styles.css";

const App: React.FC = () => {
  const [chosen, setChosen] = useState<Set<string>>(new Set());

  const onCheck = useCallback(
    (event) => {
      if (chosen.has(event.target.name && event.target.checked === false)) {
        console.log("Removing", event.target.name);

        setChosen((cur) => {
          cur.delete(event.target.name);
          return cur;
        });
      } else {
        console.log("Adding", event.target.name);

        setChosen((cur) => {
          cur.add(event.target.name);
          return cur;
        });
      }
    },
    [chosen, setChosen]
  );
  console.log("chosen", chosen);
  const shoppingList = createShoppingList(chosen);
  return (
    <div className="App">
      <h1>Shopping List Generator</h1>
      <h2>Choose Your Recipes For the Week</h2>
      {recipes.map((recipe) => {
        return (
          <div>
            <p>
              {recipe.name}{" "}
              <input type="checkbox" name={recipe.name} onChange={onCheck} />
            </p>
          </div>
        );
      })}
      <h2>Shopping Lists</h2>
      {Object.entries(shoppingList).map(([food, quantity]) => (
        <div>
          {food} x {quantity}
        </div>
      ))}
    </div>
  );
};

export default App;
