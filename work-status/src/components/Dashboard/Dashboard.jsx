import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import "./dashboard.css";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  return (
    <Box className="dashboard-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Dashboard içeriği */}
      </Grid>
    </Box>
  );
};

export default Dashboard;
