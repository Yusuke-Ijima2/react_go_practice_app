import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import { ApiGet } from "./ApiGet";

export const ApiFetch = () => {
  const [workTypesChange, setWorkTypesChange] = useState("正社員");

  const baseUrl = "http://localhost:8080/";

  const initialPostValue = {
    first_name: "",
    family_name: "",
    email: "",
    user_status_txt: "",
    status_name: "",
  };

  const PostSchema = Yup.object().shape({
    // 型はstringで入力
    first_name: Yup.string()
      // required()で入力必須にする
      .required("名前は入力必須です")
      // max()で文字数制限を設ける
      .min(2, "名前は2文字以上で入力してください"),
    family_name: Yup.string()
      // required()で入力必須にする
      .required("名字は入力必須です")
      // max()で文字数制限を設ける
      .min(2, "名字は2文字以上で入力してください"),
  });

  const {
    values: newPostData,
    setValues: setNewPostData,
    handleSubmit: onFinish,
    handleChange,
    errors,
    touched,
  } = useFormik({
    // 初期値を設定
    initialValues: initialPostValue,
    // handleSubmit属性のonFinishが発火　→ onSubmit内の処理が走る
    validationSchema: PostSchema,

    onSubmit: () => {
      if (workTypesChange === "正社員") {
        newPostData.user_status_txt = "正社員";
      } else if (workTypesChange === "インターン") {
        newPostData.user_status_txt = "インターン";
      }
      saveDate();
      alert("保存が完了しました");
      window.location.href = "";
    },
  });

  // テンプレートボタンをクリックすると、入力フォームにテンプレートの値が入力される。
  const onClickMakeTemplate = () => {
    // useStateの値を更新する時と同じ様な事が出来る
    setNewPostData({
      first_name: "名前",
      family_name: "名字",
      email: "メールアドレス",
      user_status_txt: "種類",
      status_name: "詳細",
    });
  };

  const saveDate = () => {
    const userData = {
      first_name: newPostData.first_name,
      family_name: newPostData.family_name,
      email: newPostData.email,
      user_status_txt: newPostData.user_status_txt,
    };
    fetch(baseUrl + "user_all/all", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((json) => {
        const id = json.id;
        const user_status_Data = {
          user_status_id: id,
          status_name: newPostData.status_name,
        };
        fetch(baseUrl + "user/user_status_id", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user_status_Data),
        });
      });
  };

  const workTypes = ["正社員", "インターン"];

  const onChangeWorkTypes = (e) => {
    setWorkTypesChange(e.target.value);
  };

  return (
    <>
      <div className="flex">
        <div>
          <select type="text" onChange={onChangeWorkTypes}>
            {workTypes.map((workType) => (
              <option key={workType}>{workType}</option>
            ))}
          </select>
          <div className="flex">
            <div>
              <div>
                <label>
                  <p>名前</p>
                  {errors.first_name && touched.first_name ? (
                    <p className="error">{errors.first_name}</p>
                  ) : null}
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={newPostData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>
                  <p>名字</p>
                  {errors.family_name && touched.family_name ? (
                    <p className="error">{errors.family_name}</p>
                  ) : null}
                </label>
                <input
                  type="text"
                  name="family_name"
                  value={newPostData.family_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>
                  <p>メールアドレス</p>
                </label>
                <input
                  type="text"
                  name="email"
                  value={newPostData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>
                  <p>種類</p>
                </label>
                <input
                  type="text"
                  name="user_status_txt"
                  value={newPostData.user_status_txt}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>
                  <p>詳細</p>
                </label>
                <input
                  type="text"
                  name="status_name"
                  value={newPostData.status_name}
                  onChange={handleChange}
                />
              </div>

              <input
                type="submit"
                value="テンプレート"
                onClick={() => onClickMakeTemplate()}
              />
              <input type="submit" value="送信" onClick={() => onFinish()} />
            </div>
          </div>
        </div>
        <div>
          <ApiGet />
        </div>
      </div>
    </>
  );
};
