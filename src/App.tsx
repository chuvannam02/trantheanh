import { useState, useRef } from "react";
import "./App.css";
import LazyImage from "./LazyImage";
// import { FaBars, FaTimes, FaShareAlt, FaDownload } from "react-icons/fa";
import { FaBars, FaShare, FaDownload } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

// @ts-ignore
import domtoimage from "dom-to-image-more";
import { saveAs } from "file-saver";

function App() {
  const [formData, setFormData] = useState({
    role: "Medal of Honor",
    messages: "1235",
    favoriteEmoji: "👀💖🔥",
    aboutMe: "Just a UI/UX designer",
    favoriteGeneral: "Purple medal",
    favoriteWord: "Halo, G10k",
  });

  const [open, setOpen] = useState(false);

  const [images, setImages] = useState({
    profileImage: "/main_photo.png",
    pfpImage: "/10k-squd-avatar.png",
    collection1:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=220&h=160&fit=crop",
    collection2:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=220&h=160&fit=crop",
    collection3:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=220&h=160&fit=crop",
    collection4:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=220&h=160&fit=crop",
  });

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageClick = (imageKey: string) => {
    const fileInput = fileInputRefs.current[imageKey];
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    imageKey: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImages((prev) => ({
          ...prev,
          [imageKey]: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const appRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!appRef.current) return;
    domtoimage
      .toBlob(appRef.current)
      .then((blob: any) => {
        setOpen(false);
        saveAs(blob, "profile.png");
      })
      .catch((err: any) => console.error(err));
  };

  return (
    <>
      <div className="squad-resume" ref={appRef}>
        <div className="left-section">
          {/* Favorite Photo Section */}
          <div className="photo-label handwritten">My favourite photo</div>
          <div className="photo-section">
            <div className="profile-container">
              <div className="photo-top">
                <div className="arrow-down">
                  <img src="/arrow_down.png" alt="Arrow Down" />
                </div>
              </div>

              <div className="image_upload_handler">
                <div
                  className="image-upload-wrapper"
                  onClick={() => handleImageClick("profileImage")}
                >
                  <LazyImage
                    src={images.profileImage}
                    alt="Loki Tran"
                    className="profile-image clickable-image"
                  />
                  <div className="upload-overlay">
                    <div className="upload-icon">📷</div>
                    <div className="upload-text">Click to upload</div>
                  </div>
                </div>
                <input
                  type="file"
                  ref={(el) => {
                    fileInputRefs.current["profileImage"] = el;
                  }}
                  onChange={(e) => handleImageUpload(e, "profileImage")}
                  accept="image/*"
                  style={{ display: "none" }}
                />

                <div className="star-icon">⭐</div>

                <div className="profile-dark-overlay"></div>
                <div className="profile-overlay">
                  <h2 className="profile-name">Loki Tran</h2>
                  <p className="profile-age">(vibe) Age: 23</p>
                  <p className="profile-diamond">
                    <span className="icon">
                      <img src="/hole_icon.png" alt="Diamond Icon" />
                    </span>
                    10.101010 MON
                  </p>
                </div>
              </div>
              {/* PFP Section */}
              <div className="pfp-section">
                <div className="pfp-container">
                  <div
                    className="image-upload-wrapper"
                    onClick={() => handleImageClick("pfpImage")}
                  >
                    <LazyImage
                      src={images.pfpImage}
                      alt="PFP"
                      className="pfp-image clickable-image"
                    />
                    <div className="upload-overlay">
                      <div className="upload-icon">📷</div>
                      <div className="upload-text">Click to upload</div>
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={(el) => {
                      fileInputRefs.current["pfpImage"] = el;
                    }}
                    onChange={(e) => handleImageUpload(e, "pfpImage")}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </div>

                <div className="arrow-right">
                  <div className="pfp-label handwritten">My pfp</div>
                  <img src="/arrow_left.png" alt="Arrow Right" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Collections and Form */}
        <div className="right-section">
          <div className="collections-section">
            <div className="main-title gradient-text">SQUAD RÉSUME</div>
            <div className="collections-title">Recent Collections</div>
            <div className="collections-grid">
              <img
                src="/Group_1.png"
                className="group_image"
                alt="group"
              />
            </div>
          </div>

          {/* SQUAD RÉSUME Form */}
          <div className="form-container">
            <div className="form-group first-element">
              <label className="form-label">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>

            <div className="form-group second-element">
              <label className="form-label">One line about me</label>
              <input
                type="text"
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Messages</label>
              <input
                type="text"
                name="messages"
                value={formData.messages}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Favorite General</label>
              <input
                type="text"
                name="favoriteGeneral"
                value={formData.favoriteGeneral}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>

            <div className="form-group fifth-element">
              <label className="form-label">Favorite Emoji</label>
              <input
                type="text"
                name="favoriteEmoji"
                value={formData.favoriteEmoji}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>

            <div className="form-group sixth-element">
              <label className="form-label">Favorite Word</label>
              <input
                type="text"
                name="favoriteWord"
                value={formData.favoriteWord}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
          </div>
          {/* Decorative Owl */}
          <div className="decorative-owl">
            <img
              src="/bird_10k.png"
              alt="Decorative Bird"
              className="owl-image"
            />
          </div>
        </div>
      </div>

      <div className="app">
        <div className="ripple-button-wrapper">
          <button
            className={`ripple-button ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span className="ripple ripple1"></span>
            <span className="ripple ripple2"></span>
            <span className="ripple ripple3"></span>

            <span className="icon">{open ? <IoCloseSharp /> : <FaBars />}</span>
          </button>

          <div className={`dropdown ${open ? "show" : ""}`}>
            <button className="dropdown-btn">
              <FaShare className="dropdown-icon" />
              <span>Chia sẻ</span>
            </button>
            <button className="dropdown-btn" onClick={handleDownload}>
              <FaDownload className="dropdown-icon" />
              <span>Tải xuống</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
