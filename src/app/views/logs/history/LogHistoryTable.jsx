import { Box, styled } from "@mui/material";
import SimpleTable from "../../material-kit/tables/SimpleTable";
import PaginationTable from "../../material-kit/tables/PaginationTable";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationLogHistoryTable from "./PaginationLogHistoryTable";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function LogHistoryTable() {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} />
      </Box>

      <SimpleCard title="Pagination Table">
        <PaginationLogHistoryTable />
      </SimpleCard>
    </Container>
  );
}
