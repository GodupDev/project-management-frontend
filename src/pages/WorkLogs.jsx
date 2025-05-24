import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  Tooltip,
  Stack,
  Button,
} from "@mui/material";
import {
  Search,
  FilterList,
  Download,
  Refresh,
  DateRange,
  Person,
  Assignment,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Mock data
const mockWorkLogs = [
  {
    id: 1,
    project: "Website Redesign",
    task: "Update Homepage",
    user: "John Doe",
    date: "2024-03-15",
    hours: 4,
    status: "completed",
    description: "Updated homepage layout and content",
    priority: "high",
  },
  {
    id: 2,
    project: "Mobile App",
    task: "Fix Login Bug",
    user: "Jane Smith",
    date: "2024-03-14",
    hours: 2,
    status: "in_progress",
    description: "Fixed authentication issue",
    priority: "medium",
  },
  {
    id: 3,
    project: "API Development",
    task: "Create Endpoints",
    user: "Mike Johnson",
    date: "2024-03-13",
    hours: 6,
    status: "completed",
    description: "Implemented new API endpoints",
    priority: "high",
  },
  {
    id: 4,
    project: "Database Migration",
    task: "Data Transfer",
    user: "Sarah Wilson",
    date: "2024-03-12",
    hours: 8,
    status: "completed",
    description: "Migrated data to new database",
    priority: "low",
  },
  {
    id: 5,
    project: "UI/UX Design",
    task: "Create Mockups",
    user: "Alex Brown",
    date: "2024-03-11",
    hours: 5,
    status: "in_progress",
    description: "Created new design mockups",
    priority: "medium",
  },
];

const WorkLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [dateRange, setDateRange] = useState([null, null]);
  const [showFilters, setShowFilters] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "in_progress":
        return "warning";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  const filteredLogs = mockWorkLogs.filter((log) => {
    const matchesSearch = Object.values(log).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    );
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || log.priority === priorityFilter;
    const matchesUser = userFilter === "all" || log.user === userFilter;
    const matchesDateRange =
      (!dateRange[0] || new Date(log.date) >= dateRange[0]) &&
      (!dateRange[1] || new Date(log.date) <= dateRange[1]);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesUser &&
      matchesDateRange
    );
  });

  const uniqueUsers = [...new Set(mockWorkLogs.map((log) => log.user))];

  return (
    <Box sx={{ p: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Stack direction="row" spacing={1}>
          <Tooltip title="Refresh">
            <IconButton color="primary">
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export">
            <IconButton color="primary">
              <Download />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
            sx={{ borderRadius: 2 }}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search work logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#fff", borderRadius: 2 }}
          />
        </Grid>
      </Grid>

      {showFilters && (
        <Paper
          elevation={1}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            backgroundColor: "#fff",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  label="Priority"
                >
                  <MenuItem value="all">All Priorities</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>User</InputLabel>
                <Select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  label="User"
                >
                  <MenuItem value="all">All Users</MenuItem>
                  {uniqueUsers.map((user) => (
                    <MenuItem key={user} value={user}>
                      {user}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={dateRange[0]}
                  onChange={(newValue) =>
                    setDateRange([newValue, dateRange[1]])
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End Date"
                  value={dateRange[1]}
                  onChange={(newValue) =>
                    setDateRange([dateRange[0], newValue])
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Paper>
      )}

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f1f1f1" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Project</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Task</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Hours</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow
                key={log.id}
                hover
                sx={{
                  transition: "0.2s",
                  ":hover": { backgroundColor: "#f9f9f9" },
                }}
              >
                <TableCell>{log.project}</TableCell>
                <TableCell>{log.task}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.date}</TableCell>
                <TableCell>{log.hours}</TableCell>
                <TableCell>
                  <Chip
                    label={log.priority}
                    color={getPriorityColor(log.priority)}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={log.status.replace("_", " ")}
                    color={getStatusColor(log.status)}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{log.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WorkLogs;
