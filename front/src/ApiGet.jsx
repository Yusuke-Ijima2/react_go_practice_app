import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const ApiGet = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/user_list/id")
      .then((response) => response.json())
      .then((json) => {
        // オブジェクトに変換したレスポンスを受け取り、
        setUsers(json); // Stateを更新する
      });
  }, []); //無限ループしないために空配列を入れておく
  return (
    <>
      <div>
        <h4>正社員</h4>
        {users.map((user) => (
          <ul key={user.id}>
            {user.user_status_txt === "正社員" ? (
              <li className="flex">
                {user.family_name}
                {user.first_name}
              </li>
            ) : null}
          </ul>
        ))}
      </div>
      <div>
        <h4>インターン</h4>
        {users.map((user) => (
          <ul key={user.id}>
            {user.user_status_txt === "インターン" ? (
              <li className="flex">
                {user.family_name}
                {user.first_name}
              </li>
            ) : null}
          </ul>
        ))}
      </div>
    </>
  );
};
