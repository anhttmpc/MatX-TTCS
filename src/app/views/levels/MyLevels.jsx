import { useState } from "react";
import { css } from "@linaria/core";
import { Box, styled, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";

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

const hardcodedRows = [
  {
    id: 1,
    levelGroup: "1-10",
    levelName: "101",
    assignedTo: "User 1",
    dueDate: "2023-12-01",
    status: "Open"
  },
  {
    id: 2,
    levelGroup: "1-10",
    levelName: "102",
    assignedTo: "User 2",
    dueDate: "2023-12-02",
    status: "In Progress"
  },
  {
    id: 3,
    levelGroup: "11-20",
    levelName: "103",
    assignedTo: "User 1",
    dueDate: "2023-12-03",
    status: "Closed"
  },
  {
    id: 4,
    levelGroup: "11-20",
    levelName: "104",
    assignedTo: "User 3",
    dueDate: "2023-12-04",
    status: "Open"
  }
  // Add more hardcoded rows as needed
];

export default function MyLevels() {
  const [rows] = useState(hardcodedRows);
  const currentUser = "User 1"; // Replace with the actual current user

  const myAssignedRows = rows.filter((row) => row.assignedTo === currentUser);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Material", path: "/material" }, { name: "My Levels" }]}
        />
      </Box>

      <SimpleCard title="My Assigned Levels">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>Level Group</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myAssignedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.levelGroup}</TableCell>
                <TableCell>{row.levelName}</TableCell>
                <TableCell>{row.assignedTo}</TableCell>
                <TableCell>{row.dueDate}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </SimpleCard>
    </Container>
  );
}
