
import "./Banner.css";
 
const line1 = "UI/UX Design";
const line2 = "Portfolio";
 
const images = [
   "https://ahaanmedia.com/designing/design/AiGentic.jpg",
  "https://ahaanmedia.com/designing/design/Hotel-Supermarket.jpg",
  "https://ahaanmedia.com/designing/design/Asheville.jpg",
  "https://ahaanmedia.com/designing/design/Bhocking.png",
  "https://ahaanmedia.com/designing/design/Cosmic.jpg",
  "https://ahaanmedia.com/designing/design/D.P.Dough.png",
  "https://ahaanmedia.com/designing/design/Daoud.jpg",
  "https://ahaanmedia.com/designing/design/Fleur.jpg",
    "https://ahaanmedia.com/designing/design/BOSS-Automotive.jpg",
  "https://ahaanmedia.com/designing/design/CleanGroup.png",
  "https://ahaanmedia.com/designing/design/HotRod.jpg",
  "https://ahaanmedia.com/designing/design/InUnity2.png",
  "https://ahaanmedia.com/designing/design/KickOff.png",
  "https://ahaanmedia.com/designing/design/Network.png",
];
 
const Banner = () => {
  return (
    <section className="uiux-banner">
      {/* Background */}
      <div className="bg-marquee">
        <div className="marquee-track">
          {[...images, ...images].map((img, i) => (
            <div className="marquee-item" key={i}>
              <img src={img} alt="" />
            </div>
          ))}
        </div>
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
 
 