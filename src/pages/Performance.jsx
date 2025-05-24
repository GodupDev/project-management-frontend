import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  TrendingUp,
  AccessTime,
  CheckCircle,
  Warning,
} from "@mui/icons-material";

// Mock data
const mockPerformanceData = {
  overallStats: {
    totalTasks: 45,
    completedTasks: 32,
    inProgressTasks: 8,
    pendingTasks: 5,
    averageCompletionTime: "2.5 days",
    productivityScore: 85,
  },
  topPerformers: [
    {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
      completedTasks: 12,
      productivityScore: 92,
    },
    {
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
      completedTasks: 10,
      productivityScore: 88,
    },
    {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=3",
      completedTasks: 8,
      productivityScore: 85,
    },
  ],
  recentActivity: [
    {
      user: "Sarah Wilson",
      action: "Completed task",
      task: "Update Documentation",
      time: "2 hours ago",
    },
    {
      user: "Alex Brown",
      action: "Started task",
      task: "API Integration",
      time: "4 hours ago",
    },
    {
      user: "Emma Davis",
      action: "Updated task",
      task: "UI Design",
      time: "6 hours ago",
    },
  ],
};

const StatCard = ({ title, value, icon, color }) => (
  <Card elevation={0} sx={{ height: "100%" }}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box
          sx={{
            backgroundColor: `${color}15`,
            borderRadius: 2,
            p: 1,
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ mb: 1 }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const Performance = () => {
  const { overallStats, topPerformers, recentActivity } = mockPerformanceData;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Performance Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Overall Stats */}
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Tasks"
            value={overallStats.totalTasks}
            icon={<TrendingUp sx={{ color: "primary.main" }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Completed Tasks"
            value={overallStats.completedTasks}
            icon={<CheckCircle sx={{ color: "success.main" }} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="In Progress"
            value={overallStats.inProgressTasks}
            icon={<AccessTime sx={{ color: "warning.main" }} />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Pending Tasks"
            value={overallStats.pendingTasks}
            icon={<Warning sx={{ color: "error.main" }} />}
            color="error"
          />
        </Grid>

        {/* Productivity Score */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Team Productivity Score
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="h4" sx={{ mr: 2 }}>
                {overallStats.productivityScore}%
              </Typography>
              <Typography color="text.secondary">
                Average completion time: {overallStats.averageCompletionTime}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={overallStats.productivityScore}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Paper>
        </Grid>

        {/* Top Performers */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Top Performers
            </Typography>
            <List>
              {topPerformers.map((performer, index) => (
                <React.Fragment key={performer.name}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={performer.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={performer.name}
                      secondary={`Completed ${performer.completedTasks} tasks`}
                    />
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ fontWeight: "bold" }}
                    >
                      {performer.productivityScore}%
                    </Typography>
                  </ListItem>
                  {index < topPerformers.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              {recentActivity.map((activity, index) => (
                <React.Fragment key={activity.task}>
                  <ListItem>
                    <ListItemText
                      primary={activity.task}
                      secondary={`${activity.user} ${activity.action}`}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </ListItem>
                  {index < recentActivity.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Performance;
