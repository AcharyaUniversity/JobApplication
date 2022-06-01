import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

function Complete() {
  return (
    <div style={{ textAlign: "center", paddingBottom: 40 }}>
      <CheckCircleOutlineRoundedIcon
        color="success"
        sx={{ fontSize: "9rem", margin: "10px 0 0 0" }}
      />
      <h2 style={{ margin: "5px 0", fontWeight: 500, fontSize: "2rem" }}>
        Thank you
      </h2>
      <p>
        Your application was submitted with the reference number xxxxxx. <br />
        Please check mail for more information.
      </p>
    </div>
  );
}

export default Complete;
