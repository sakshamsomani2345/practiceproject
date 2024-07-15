import React from "react";

function CallToAction() {
  return (
    <div className="callaction">
      <div className="leftcall">
        <h2>Want to learn more about JavaScript?</h2>
        <h3>Checkout these resources with 100 JavaScript Projects</h3>
        <button
          style={{
            background: "rgb(80,63,251)",
            background:
              "linear-gradient(90deg, rgba(80,63,251,1) 0%, rgba(142,52,218,1) 28%, rgba(252,70,207,1) 89%)",
            borderRadius: "10px",
            border: "none",
            padding: "10px",
          }}
        >
          <a
            href="https://www.100jsprojects.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            100 JavaScript Projects
          </a>
        </button>
      </div>
      <div className="rightcall">
        <img
          style={{ width: "600px", height: "150px", padding: "10px" }}
          src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg"
        />
      </div>
    </div>
  );
}

export default CallToAction;
