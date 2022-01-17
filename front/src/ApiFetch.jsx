import React from "react";
// useFormikをインポート
import { useFormik } from "formik";

export const ApiFetch = () => {
  // 入力フォームの初期値 (initialValues属性にセットする)
  const initialPostValue = {
    first_name: "",
    family_name: "",
    email: "",
    user_status_txt: "",
    user_status: {
      status_name: "",
    },
  };

  // 下記追記
  const {
    // ここにフォームで入力した値や初期値が入る
    values: newPostData,
    setValues: setNewPostData,

    // この場合、onFinishメソッドを叩くと、onSubmit内の処理が走る
    // フォームのデータ送信のアクションに用いられる
    handleSubmit: onFinish,
    handleChange,
  } = useFormik({
    // 初期値を設定
    initialValues: initialPostValue,

    // handleSubmit属性のonFinishが発火　→ onSubmit内の処理が走る
    onSubmit: async () => {
      alert("フォーム送信成功!!");
    },
  });

  // テンプレートボタンをクリックすると、入力フォームにテンプレートの値が入力される。
  const onClickMakeTemplate = () => {
    // useStateの値を更新する時と同じ様な事が出来ます
    setNewPostData({
      first_name: "名前",
      family_name: "名字",
      email: "メールアドレス",
      user_status_txt: "種類",
      user_status: {
        status_name: "詳細",
      },
    });
  };

  console.log(newPostData);

  const saveDate = () => {
    onFinish();
    // サーバへ送りたいデータ
    const data = {
      first_name: newPostData.first_name,
      family_name: newPostData.family_name,
      email: newPostData.email,
      user_status_txt: newPostData.user_status_txt,
      status_name: newPostData.user_status.status_name,
    };
    fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((json) => {
      alert("保存完了しました。");
    });
  };

  return (
    <>
      <div>
        <label>
          <p>名前</p>
        </label>
        <input
          type="text"
          // nameにtitleを追記
          name="first_name"
          // newPostData.titleを追記　→ initialPostValueで設定したtitleの初期値が入る
          value={newPostData.first_name}
          //これを全ての入力フォームに追記するだけで、newPostDataに入力データが入ってくる */}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          <p>名字</p>
        </label>
        <input
          type="text"
          name="content"
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

      {/* テンプレート作成ボタンを追記 */}
      <button onClick={() => onClickMakeTemplate()}>テンプレート</button>
      <button onClick={() => saveDate()}>送信</button>
    </>
  );
};
