import { Box, styled } from "@mui/material";
import SimpleTable from "../../material-kit/tables/SimpleTable";
import PaginationTable from "../../material-kit/tables/PaginationTable";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationLogHistoryTable from "../history/PaginationLogHistoryTable";
import PaginationFeedbackTable from "./PaginationFeedbackTable";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function FeedbackTable() {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Material", path: "/material" }, { name: "Feedback Table" }]}
        />
      </Box>

      <SimpleCard title="Pagination Table">
        <PaginationFeedbackTable />
      </SimpleCard>
    </Container>
  );
}
