import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  IconButton,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Notifications,
  Language,
  Palette,
  Security,
  CloudUpload,
  Save,
  PhotoCamera,
} from "@mui/icons-material";
import { useMockData } from "../context/MockDataContext";

const Settings = () => {
  const { settings, users, updateSettings, updateUser } = useMockData();
  const currentUser = users[0]; // Using first user as current user for demo

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSettingChange = (category, setting, value) => {
    updateSettings(category, setting, value);
  };

  const handleSave = () => {
    setSnackbar({
      open: true,
      message: "Settings saved successfully!",
      severity: "success",
    });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateUser(currentUser.id, {
          ...currentUser,
          avatar: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Avatar
                  src={currentUser.avatar}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarChange}
                />
                <label htmlFor="avatar-upload">
                  <IconButton
                    component="span"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      bgcolor: "background.paper",
                    }}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Box>
              <Typography variant="h6">{currentUser.name}</Typography>
              <Typography color="text.secondary">{currentUser.role}</Typography>
            </Box>
            <TextField
              fullWidth
              label="Name"
              value={currentUser.name}
              onChange={(e) =>
                updateUser(currentUser.id, {
                  ...currentUser,
                  name: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={currentUser.email}
              onChange={(e) =>
                updateUser(currentUser.id, {
                  ...currentUser,
                  email: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={currentUser.role}
                onChange={(e) =>
                  updateUser(currentUser.id, {
                    ...currentUser,
                    role: e.target.value,
                  })
                }
                label="Role"
              >
                <MenuItem value="Project Manager">Project Manager</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Designer">Designer</MenuItem>
                <MenuItem value="QA Engineer">QA Engineer</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        {/* Settings Sections */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Notifications */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Notifications sx={{ mr: 1 }} />
                <Typography variant="h6">Notifications</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.notifications.email}
                        onChange={(e) =>
                          handleSettingChange(
                            "notifications",
                            "email",
                            e.target.checked,
                          )
                        }
                      />
                    }
                    label="Email Notifications"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.notifications.push}
                        onChange={(e) =>
                          handleSettingChange(
                            "notifications",
                            "push",
                            e.target.checked,
                          )
                        }
                      />
                    }
                    label="Push Notifications"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.notifications.taskUpdates}
                        onChange={(e) =>
                          handleSettingChange(
                            "notifications",
                            "taskUpdates",
                            e.target.checked,
                          )
                        }
                      />
                    }
                    label="Task Updates"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.notifications.projectUpdates}
                        onChange={(e) =>
                          handleSettingChange(
                            "notifications",
                            "projectUpdates",
                            e.target.checked,
                          )
                        }
                      />
                    }
                    label="Project Updates"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Appearance */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Palette sx={{ mr: 1 }} />
                <Typography variant="h6">Appearance</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Theme</InputLabel>
                    <Select
                      value={settings.appearance.theme}
                      onChange={(e) =>
                        handleSettingChange(
                          "appearance",
                          "theme",
                          e.target.value,
                        )
                      }
                      label="Theme"
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="system">System</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Font Size</InputLabel>
                    <Select
                      value={settings.appearance.fontSize}
                      onChange={(e) =>
                        handleSettingChange(
                          "appearance",
                          "fontSize",
                          e.target.value,
                        )
                      }
                      label="Font Size"
                    >
                      <MenuItem value="small">Small</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="large">Large</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Density</InputLabel>
                    <Select
                      value={settings.appearance.density}
                      onChange={(e) =>
                        handleSettingChange(
                          "appearance",
                          "density",
                          e.target.value,
                        )
                      }
                      label="Density"
                    >
                      <MenuItem value="compact">Compact</MenuItem>
                      <MenuItem value="comfortable">Comfortable</MenuItem>
                      <MenuItem value="spacious">Spacious</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>

            {/* Language & Region */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Language sx={{ mr: 1 }} />
                <Typography variant="h6">Language & Region</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={settings.language}
                      onChange={(e) =>
                        handleSettingChange("language", "", e.target.value)
                      }
                      label="Language"
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="vi">Tiếng Việt</MenuItem>
                      <MenuItem value="ja">日本語</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Timezone</InputLabel>
                    <Select
                      value={settings.timezone}
                      onChange={(e) =>
                        handleSettingChange("timezone", "", e.target.value)
                      }
                      label="Timezone"
                    >
                      <MenuItem value="UTC+7">UTC+7 (Bangkok)</MenuItem>
                      <MenuItem value="UTC+8">UTC+8 (Singapore)</MenuItem>
                      <MenuItem value="UTC+9">UTC+9 (Tokyo)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>

            {/* Save Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                size="large"
              >
                Save Changes
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
