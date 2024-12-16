import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import formCss from "./Form.module.css";

const Form = () => {
  const navigate = useNavigate();
  const lowUrl = "low";
  const mediumUrl = "medium";
  const highUrl = "high";
  const [levelUrl, setLevelUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [usersDetail, setUserDetail] = useState({});

  const handleForm = async (e) => {
    e.preventDefault();
    setUserDetail({});
    if (!levelUrl || !userId) {
      alert("Please select a security level and enter a User ID");
      return;
    }

    try {
      const response = await fetch(`http://localhost:9000/api/${levelUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        navigate("/error", { state: { error: errorData.message } });
        return;
      }

      const data = await response.json();
      setUserDetail(data);
    } catch (error) {
      console.error("Error:", error);
      navigate("/error", { state: { error: error } });
    }
  };

  return (
    <div className={formCss.main}>
      <img src="/images/image.png" />

      <div className={formCss.mainContainer}>
        <div className={formCss.topContainer}>
          <div className={formCss.buttons}>
            <div className={formCss.button}>
              <input
                type="radio"
                id="low"
                name="level"
                onChange={() => setLevelUrl(lowUrl)}
              />
              <label htmlFor="low">Low</label>
            </div>
            <div className={formCss.button}>
              <input
                type="radio"
                id="medium"
                name="level"
                onChange={() => setLevelUrl(mediumUrl)}
              />
              <label htmlFor="medium">Medium</label>
            </div>
            <div className={formCss.button}>
              <input
                type="radio"
                id="high"
                name="level"
                onChange={() => setLevelUrl(highUrl)}
              />
              <label htmlFor="high">High</label>
            </div>
          </div>

          {/* User ID input section */}
          <div className={formCss.userId}>
            <form onSubmit={handleForm}>
              <label htmlFor="input">User:</label>
              <input
                type="text"
                placeholder="Enter the user ID"
                id="input"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div className={formCss.data}>
          {Object.keys(usersDetail || {}).length > 0 ? (
            <pre>{JSON.stringify(usersDetail, null, 2)}</pre>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          if (levelUrl === "") {
            alert("Please select a security level");
          } else {
            navigate("/viewsource", { state: { level: levelUrl } });
          }
        }}
      >
        viewsource
      </button>
    </div>
  );
};

export default Form;
