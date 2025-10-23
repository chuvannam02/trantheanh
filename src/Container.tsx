import React, { useState, useRef } from "react";
import App from "./App";
import "./container.css";

interface FormData {
  role: string;
  messages: string;
  favoriteEmoji: string;
  aboutMe?: string;
  favoriteGeneral?: string;
  favoriteWord?: string;
}

interface Images {
  profileImage: string;
  pfpImage: string;
  collection1?: string;
  collection2?: string;
  collection3?: string;
  collection4?: string;
}

const Container: React.FC = () => {
  const [formData, setFormData] = useState({
    role: "Medal of Honor",
    messages: "1235",
    favoriteEmoji: "👀💖🔥",
    aboutMe: "Just a UI/UX designer",
    favoriteGeneral: "Purple medal",
    favoriteWord: "Halo, G10k",
  });

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

  // refs để trigger file input
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "profileImage" | "pfpImage"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImages((prev) => ({ ...prev, [key]: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickUpload = (key: "profileImage" | "pfpImage") => {
    const input = fileInputRefs.current[key];
    if (input) input.click();
  };

  return (
    <div className="preview-wrapper">
      <div className="header-row">
        <div className="preview-label">
          Preview
          <img
            src="/arrow-down-container.png"
            alt="arrow"
            className="arrow-img"
          />
        </div>
        <h1 className="title">Who’s in The Squad?</h1>
      </div>

      <div className="content">
        {/* Form side */}
        <div className="form-side">
          <label>My favourite photo</label>
          <button
            className="upload-btn"
            onClick={() => handleClickUpload("profileImage")}
          >
            Upload file
          </button>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={(el) => {
              fileInputRefs.current["profileImage"] = el;
            }}
            onChange={(e) => handleImageUpload(e, "profileImage")}
          />

          <label>My pfp</label>
          <button
            className="upload-btn"
            onClick={() => handleClickUpload("pfpImage")}
          >
            Upload file
          </button>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={(el) => {
              fileInputRefs.current["pfpImage"] = el; // chỉ gán thôi, không return
            }}
            onChange={(e) => handleImageUpload(e, "pfpImage")}
          />

          <label>Role</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, role: e.target.value }))
            }
          />

          <label>Messages</label>
          <input
            type="text"
            value={formData.messages}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, messages: e.target.value }))
            }
          />

          <label>Favourite Emoji</label>
          <input
            type="text"
            value={formData.favoriteEmoji}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                favoriteEmoji: e.target.value,
              }))
            }
          />
        </div>

        {/* App Preview */}
        <div className="app-preview">
          <div className="app-border">
            <div className="app-scale">
              <App
                formData={formData}
                images={images}
                onFormDataChange={(data: FormData) =>
                  setFormData((prev) => ({ ...prev, ...data }))
                }
                onImagesChange={(imgs: Images) =>
                  setImages((prev) => ({ ...prev, ...imgs }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
