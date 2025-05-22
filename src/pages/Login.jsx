import { useState } from "react";
import { Input } from "antd";
import IconThemeToggle from "../components/icons/IconThemeToggle";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with:", {
        email: formData.email,
        password: formData.password,
      });
    } else {
      console.log("Registering with:", formData);
    }
  };

  return (
    <div className="login">
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-default)] text-[var(--color-text-primary)] transition-colors duration-300">
        <div className="w-full max-w-md p-8 space-y-8 bg-[var(--color-background-secondary)] rounded-lg shadow-lg">
          <div className="flex justify-between items-center font-semibold">
            {isLogin ? (
              <h1 className="text-2xl">Welcome to our app!</h1>
            ) : (
              <h1 className="text-2xl">Welcome back!</h1>
            )}
            <div className="p-2 rounded-lg hover:bg-[var(--color-background-hover)]">
              <IconThemeToggle />
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg placeholder:!text-[var(--color-text)] placeholder:opacity-100 !text-[0.8rem] !text-[var(--color-text)]
                  hover:ring ring-[var(--color-primary-light)] cursor-pointer"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg placeholder:!text-[var(--color-text)] placeholder:opacity-100 !text-[0.8rem] !text-[var(--color-text)]
                hover:ring ring-[var(--color-primary-light)] cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input.Password
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="!bg-transparent !py-2 !border !border-[var(--color-border)] !rounded-lg placeholder:!text-[var(--color-text)] placeholder:opacity-100 !text-[0.8rem] !text-[var(--color-text)]
                hover:ring ring-[var(--color-primary-light)] cursor-pointer"
                iconRender={(visible) =>
                  visible ? (
                    <AiOutlineEye className="text-[var(--color-text)] " />
                  ) : (
                    <AiOutlineEyeInvisible className="text-[var(--color-text)]" />
                  )
                }
              />
            </div>

            <button
              type="submit"
              className="w-full pt-2 py-3 mt-5 px-4 bg-[var(--color-primary)]  rounded-lg hover:bg-[var(--color-primary-hover)] text-[var(--color-text)] transition-colors
              border
              hover:ring ring-[var(--color-primary-light)] cursor-pointer"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[var(--color-primary)] hover:underline cursor-pointer"
            >
              {isLogin
                ? "Need an account? Register"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
