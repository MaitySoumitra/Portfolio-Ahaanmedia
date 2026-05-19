import "./Banner.css";

const line1 = "UI/UX Design";
const line2 = "Portfolio";

const Banner = () => {
  return (
    <section className="uiux-banner">
      {/* 🔥 Single Background Image */}
      <div className="banner-bg">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
          alt="Banner Background"
        />
      </div>

      <div className="overlay"></div>

      {/* Center Content */}
      <div className="banner-center">
        {/* 🔥 LOGO */}
        <img
          src="https://ahaanmedia.com/asc/layouts/asc.png"
          alt="Logo"
          className="banner-logo"
        />

        {/* Heading */}
        <h1 className="drop-text">
          <div className="drop-line">
            {line1.split("").map((c, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </div>

          <div className="drop-line">
            {line2.split("").map((c, i) => (
              <span
                key={i}
                style={{ animationDelay: `${(i + line1.length) * 0.08}s` }}
              >
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </div>
        </h1>
      </div>
    </section>
  );
};

export default Banner;