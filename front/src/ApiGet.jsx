import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const ApiGet = () => {
  const [users, setUsers] = useState([]);
  // const [id, setId] = useState("");

  const baseUrl = "http://localhost:8080/";

  useEffect(() => {
    fetch(baseUrl + "user_list/id")
      .then((response) => response.json())
      .then((json) => {
        // オブジェクトに変換したレスポンスを受け取り、
        setUsers(json); // Stateを更新する
        // console.log(json);
        //   const targetUser = json.find((user) => {
        //     setId(user.id);
        //   });
        //   targetUser
      });
  }, []); //無限ループしないために空配列を入れておく

  // const onClickDeleate = () => {
  //   fetch(baseUrl + "user_all/:id", { method: "DELETE" })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       // オブジェクトに変換したレスポンスを受け取り、
  //       setUsers(json); // Stateを更新する

  //       fetch(baseUrl + "user/:user_status_id", { method: "DELETE" })
  //         .then((response) => response.json())
  //         .then((json) => {
  //           // オブジェクトに変換したレスポンスを受け取り、
  //           setUsers(json); // Stateを更新する
  //         });
  //     });
  // };

  return (
    <>
      <div>
        <h4>正社員</h4>
        {users.map((user) => (
          <ul key={user.id}>
            {user.user_status_txt === "正社員" ? (
              <div className="flex">
                <li className="flex">
                  {user.family_name}
                  {user.first_name}
                </li>
                {/* <button onClick={() => onClickDeleate()}>削除</button> */}
              </div>
            ) : null}
          </ul>
        ))}
      </div>
      <div>
        <h4>インターン</h4>
        {users.map((user) => (
          <ul key={user.id}>
            {user.user_status_txt === "インターン" ? (
              <div className="flex">
                <li className="flex">
                  {user.family_name}
                  {user.first_name}
                </li>
                {/* <button onClick={() => onClickDeleate()}>削除</button> */}
              </div>
            ) : null}
          </ul>
        ))}
      </div>
    </>
  );
};
