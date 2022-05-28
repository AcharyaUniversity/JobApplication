import { Paper, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logo from "../assets/AcharyaLogo.jpg";

function Header() {
  return (
    <Paper>
      <Grid
        style={{ padding: "7px 0" }}
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={1} />
        <Grid item xs={4} md={2}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={4} sm={3}>
              <img src={Logo} width={40} alt="Acharya Institutes" />
            </Grid>
            <Grid item xs={8} sm={9}>
              <p style={{ color: "#182778", fontWeight: 500 }}>ACHARYA</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5} md={7} />
        <Grid item xs={1} textAlign="center">
          <AccountCircleIcon style={{ color: "grey" }} />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Paper>
  );
}

export default Header;
