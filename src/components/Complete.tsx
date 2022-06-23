import { CircularProgress } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

interface Props {
  loading: boolean;
  refNumber: string;
}

function Complete({ loading, refNumber }: Props) {
  return (
    <div style={{ textAlign: "center", paddingBottom: 40 }}>
      {loading ? (
        <CircularProgress style={{ margin: "100px 0" }} />
      ) : (
        <>
          {refNumber ? (
            <>
              <CheckCircleRoundedIcon
                color="success"
                sx={{ fontSize: "9rem", margin: "10px 0 0 0" }}
              />
              <h2
                style={{ margin: "5px 0", fontWeight: 500, fontSize: "2rem" }}
              >
                Thank you
              </h2>
              <p>
                Your application was submitted with the reference number{" "}
                {refNumber}
                .
                <br />
                Please check mail for more information.
              </p>
            </>
          ) : (
            <>
              <CancelRoundedIcon
                color="error"
                sx={{ fontSize: "9rem", margin: "10px 0 0 0" }}
              />
              <h2
                style={{ margin: "5px 0", fontWeight: 500, fontSize: "2rem" }}
              >
                An error occured
              </h2>
              <p>
                A reference number could not be generated for your application.
                <br />
                Please reload the page and try again.
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Complete;
