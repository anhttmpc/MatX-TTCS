import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import StepperForm from "../../material-kit/forms/StepperForm";
import SubmitSimpleForm from "./SubmitSimpleForm";
import { useLocation } from "react-router-dom";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } }
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } }
  }
}));

export default function SubmitForm() {
  const location = useLocation();
  const isFixingMode = location.state?.mode === "fixing";
  const logVersion = location.state?.version;
  const log = location.state?.log;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Form" }]} />
      </Box>

      <Stack spacing={3}>
        <Stack spacing={3}>
          {isFixingMode && log && (
            <SimpleCard title="Log Information">
              <Box width="100%" overflow="auto">
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Level</TableCell>
                      <TableCell align="center">Version</TableCell>
                      <TableCell align="left">Parking Image</TableCell>
                      <TableCell align="left">Chart Image</TableCell>
                      <TableCell align="left">Number of Cars</TableCell>
                      <TableCell align="center">Number of People</TableCell>
                      <TableCell align="center">Number of Colors</TableCell>
                      <TableCell align="center">Meta</TableCell>
                      <TableCell align="center">Number of Groups</TableCell>
                      <TableCell align="center">Position of Group 4</TableCell>
                      <TableCell align="center">Position of Group 5</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      <TableRow key={0}>
                        <TableCell align="center">{log.level}</TableCell>
                        <TableCell align="center">{log.version}</TableCell>
                        <TableCell align="left">
                          <img src={log.parkingImg} alt="Parking" width="100" />
                        </TableCell>
                        <TableCell align="left">
                          <img src={log.chartImg} alt="Chart" width="100" />
                        </TableCell>
                        <TableCell align="center">{log.numOfCar}</TableCell>
                        <TableCell align="center">{log.numOfPeople}</TableCell>
                        <TableCell align="center">{log.numOfColor}</TableCell>
                        <TableCell align="center">{log.meta}</TableCell>
                        <TableCell align="center">{log.numOfGroup}</TableCell>
                        <TableCell align="center">{log.posOf4}</TableCell>
                        <TableCell align="center">{log.posOf5}</TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color:
                              log.approvalStatus === 1
                                ? "green"
                                : log.approvalStatus === 2
                                ? "red"
                                : "grey"
                          }}
                        ></TableCell>
                      </TableRow>
                    }
                  </TableBody>
                </StyledTable>
              </Box>
            </SimpleCard>
          )}

          <SimpleCard
            title={isFixingMode ? `Fixing Version Update: ${logVersion + 1}` : "Submit Log Form"}
          >
            <SubmitSimpleForm />
          </SimpleCard>
        </Stack>
      </Stack>
    </Container>
  );
}
