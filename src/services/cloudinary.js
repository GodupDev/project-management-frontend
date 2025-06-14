const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}`;

export const uploadImage = async (file, folder = "", public_id = "") => {
  if (public_id) {
    try {
      await deleteImage(public_id);
    } catch (err) {
      console.error("Delete image failed:", err);
      throw err;
    }
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "godielts-avatar");
  
  // Only append folder if it's provided
  if (folder) {
    formData.append("folder", folder);
  }
  
  // If we have a public_id, we're updating an existing image
  if (public_id) {
    formData.append("public_id", public_id);
    formData.append("overwrite", "true");
  }

  try {
    const response = await fetch(
      `${API_URL}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Cloudinary upload error:', error);
      throw new Error(error.message || "Upload failed");
    }

    const data = await response.json();
    return { 
      url: data.secure_url, 
      public_id: data.public_id 
    };
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

export const deleteImage = async (publicId) => {
  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("upload_preset", "godielts-avatar");

  try {
    const response = await fetch(
      `${API_URL}/destroy`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Cloudinary delete error:', error);
      throw new Error(error.message || "Delete failed");
    }

    const data = await response.json();
    return data.result === "ok";
  } catch (error) {
    console.error("Delete failed:", error);
    throw error;
  }
};

const generateSignature = async (publicId, timestamp) => {
  // If you need to generate a signature on the client side,
  // you'll need to implement a secure way to do this.
  // For production, it's recommended to generate the signature on the server side.
  // This is a placeholder implementation.
  return "generated_signature";
};
