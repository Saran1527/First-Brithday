import React, { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef(null);

  // Canvas animation
  useEffect(() => {
    // Scroll animations for sections
    const sections = document.querySelectorAll(".scroll-animate");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach(section => observer.observe(section));

    // Canvas background
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const elements = [];
    const colors = ["#99ccff", "#66ccff", "#3399ff", "#cce7ff", "#b3d9ff"];
    const shapes = ["circle", "heart", "star"];
    for (let i = 0; i < 50; i++) {
      elements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 0.5,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        angle: Math.random() * 360,
      });
    }
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      elements.forEach(element => {
        ctx.beginPath();
        ctx.fillStyle = element.color;
        if (element.shape === "circle") {
          ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
        } else if (element.shape === "heart") {
          drawHeart(ctx, element.x, element.y, element.radius);
        } else if (element.shape === "star") {
          drawStar(ctx, element.x, element.y, 5, element.radius, element.radius / 2);
        }
        ctx.fill();
        element.y -= element.speed;
        element.x += Math.sin((element.angle * Math.PI) / 180) * 0.5;
        if (element.y < -20) {
          element.y = canvas.height + 20;
          element.x = Math.random() * canvas.width;
        }
      });
    }
    function drawHeart(ctx, x, y, size) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x, y - size / 2, x - size, y - size, x - size, y);
      ctx.bezierCurveTo(x - size, y + size / 2, x, y + size, x, y);
      ctx.bezierCurveTo(x, y + size, x + size, y + size / 2, x + size, y);
      ctx.bezierCurveTo(x + size, y - size, x, y - size / 2, x, y);
      ctx.closePath();
    }
    function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      let step = Math.PI / spikes;
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
    }
    animate();
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Gallery fade-in/out on scroll
  useEffect(() => {
    const items = document.querySelectorAll('.gallery-item');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
        else entry.target.classList.remove('visible');
      });
    }, { threshold: 0.2 });
    items.forEach(item => obs.observe(item));
    return () => obs.disconnect();
  }, []);

    useEffect(() => {
    const sections = document.querySelectorAll("section");
    const scrollToSection = (index) => {
      if (index < sections.length) {
        sections[index].scrollIntoView({ behavior: "smooth" });
        if (index < sections.length - 1) {
          setTimeout(() => scrollToSection(index + 1), 8000);
        }
      }
    };
    const scrollTimer = setTimeout(() => scrollToSection(0), 1000);
    return () => clearTimeout(scrollTimer);
  }, []);

  return (
    <div className="app">
      <canvas ref={canvasRef} className="background-canvas"></canvas>
      <div className="floating-balloons">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="floating-balloon"
            style={{
              "--i": i,
              "--x": Math.random() * 100,
              "--delay": Math.random() * 5,
            }}
          ></div>
        ))}
      </div>
      <div className="confetti-container"></div>

      {/* 🎉 Welcome Section */}
      <section className="welcome scroll-animate">
        <div className="bouncing-title">
          <h1 className="welcome-title">🎉 Welcome to My 1st Birthday 🎉</h1>
        </div>
        <div className="welcome-content">
          <div className="welcome-text">
            <p className="welcome-subtitle typing-animation">
              I'm <strong>Aiden InbaRaj @ Messi</strong> 💖
            </p>
            <p className="welcome-subtitle fade-in-animation">
              Beloved Son of <strong>Caleb InbaRaj</strong> &{" "}
              <strong>Chellammal</strong>
            </p>
          </div>
          <div className="family-photo zoom-in">
            <img
              src="/images/WhatsApp Image 2025-08-31 at 13.55.56_9071f7ff.jpg"
              alt="Family"
              className="family-img"
            />
            <p className="photo-caption">💞 Our Beautiful Family 💞</p>
          </div>
        </div>
      </section>

    

      {/* 📸 Gallery Section */}
      <section className="gallery scroll-animate">
        <h2 className="section-title pulse">📸 My Memories</h2>
        <div className="gallery-grid">
          {[
            "IMG-20250901-WA0052.jpg",
            "IMG-20250901-WA0039.jpg",
            "WhatsApp Image 2025-09-07 at 09.13.42_8dd29cb2.jpg",
            "WhatsApp Image 2025-09-07 at 09.13.42_27b6f7ec.jpg",
            "IMG-20250901-WA0042.jpg",
            "IMG-20250901-WA0043.jpg",
            "IMG-20250901-WA0044.jpg",
            "IMG-20250901-WA0046.jpg",
            "WhatsApp Image 2025-09-07 at 09.11.45_33d99a77.jpg",
            "IMG-20250901-WA0049.jpg"
          ].map((file, i) => (
            <div key={i} className="gallery-item">
              <img
                src={`/images/${file}`}
                alt={`baby${i + 1}`}
                className="gallery-image"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 🎂 Celebration Details */}
     <section className="celebration-details scroll-animate">
  <div className="celebration-container">
    <h2 className="section-title cake-animation">🎂 Celebration Details</h2>
    
    <div className="details-card">
      <div className="detail-item">
        <div className="detail-icon">📅</div>
        <div className="detail-content">
          <h3>Date & Time</h3>
          <p><strong>15th September 2025</strong></p>
          <p>Cake Cutting: 6:00 PM</p>
          <p>Dinner: 7:00 PM</p>
        </div>
      </div>
      
    </div>
  </div>
</section>

      {/* 📍 Venue & Contact Section */}
      <section className="venue-info scroll-animate">
  <div className="venue-container">
    <h2 className="section-title location-animation">📍 Venue Information</h2>
    
    <div className="venue-card">
      <div className="venue-header">
        <div className="venue-icon">🏰</div>
        <h3>C.S.I St Andrew's Church</h3>
      </div>
      
      <div className="venue-details">
        <p>Kavanur Village & Post</p>
        <p>Arakkonam Taluk</p>
        
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <span>8667638298</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <span>9597097962</span>
          </div>
        </div>
        
        <button className="direction-btn" onClick={() => window.open('https://maps.google.com?q=C.S.I+St.+Andrew\'s+Church+Kavanoor+Arakkonam', '_blank')}>
          📍 Get Directions
        </button>
      </div>
    </div>
    
    <div className="map-container">
      <iframe
        title="Venue Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3896.616853052068!2d79.6885149!3d13.1037648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52bc55eae621b1:0x16a5626b37bab14c!2sC.S.I+St.+Andrew's+Church+Kavanoor+Arakkonam!5e0!3m2!1sen!2sin!4v1694192491746!5m2!1sen!2sin"
        width="100%"
        height="300"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</section>

      {/* 💖 Closing Section */}
      <section className="closing scroll-animate">
        <h2 className="glow-text rainbow">
          We can't wait to celebrate with you! 💖
        </h2>
        <p className="thanks bounce-in">
          With love, <br /> Caleb InbaRaj & Chellammal
        </p>
      </section>
    </div>
  );
}

export default App;
