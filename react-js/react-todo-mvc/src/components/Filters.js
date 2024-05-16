import React, { useContext } from "react";
import { FILTER_TITLES } from "../constants";
import TodoContext from "./TodoContext";

function Filters(props) {
  // const { selectedFilter, updateSelectedFilter } = useContext(TodoContext);
  return (
    <section className="filters">
      {
        <ul>
          {FILTER_TITLES.map((_) => {
            console.log(_);
            return (
              <li
                // className={selectedFilter === _ && "underline"}
                onClick={() => {
                  // updateSelectedFilter(_);
                }}
                key={_}
              >
                {_}
              </li>
            );
          })}
        </ul>
      }
    </section>
  );
}

export default React.memo(Filters);
