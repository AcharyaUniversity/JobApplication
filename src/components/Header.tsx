import { Paper, Grid } from "@mui/material";
import Logo from "../assets/logo.jpg";

function Header() {
  return (
    <Paper sx={{ backgroundColor: "#f7f7f7" }}>
      <Grid
        style={{ padding: "5px 0" }}
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={1} />
        <Grid item xs={4}>
          <a href="https://www.acharya.ac.in/">
            <img src={Logo} alt="Acharya" />
          </a>
        </Grid>
        <Grid item xs={7} />
      </Grid>
    </Paper>
  );
}

export default Header;
