import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  styled,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TextField,
  Select,
  MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// STYLED COMPONENT
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } }
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } }
  }
}));

export default function PaginationLogHistoryTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [logList, setLogList] = useState([]);
  const [filters, setFilters] = useState({
    level: "",
    version: "",
    numOfCar: "",
    numOfPeople: "",
    numOfColor: "",
    meta: "",
    numOfGroup: "",
    posOf4: "",
    posOf5: "",
    approvalStatus: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch logList from API
    const fetchLogList = async () => {
      try {
        const response = await axios.post("/api/log/data");
        console.log("API Response:", response.data); // Log the API response
        setLogList(response.data.logList);
      } catch (error) {
        console.error("Error fetching log list:", error);
      }
    };

    fetchLogList();
  }, []);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleFixNowClick = (logVersion, logData) => {
    navigate("/logs/submit-form", {
      state: { mode: "fixing", version: logVersion, log: logData }
    });
  };

  const filteredLogList = logList.filter((log) => {
    return (
      (filters.level === "" || log.level.toString().includes(filters.level)) &&
      (filters.version === "" || log.version.toString().includes(filters.version)) &&
      (filters.numOfCar === "" || log.numOfCar.toString().includes(filters.numOfCar)) &&
      (filters.numOfPeople === "" || log.numOfPeople.toString().includes(filters.numOfPeople)) &&
      (filters.numOfColor === "" || log.numOfColor.toString().includes(filters.numOfColor)) &&
      (filters.meta === "" || log.meta.includes(filters.meta)) &&
      (filters.numOfGroup === "" || log.numOfGroup.toString().includes(filters.numOfGroup)) &&
      (filters.posOf4 === "" || log.posOf4.includes(filters.posOf4)) &&
      (filters.posOf5 === "" || log.posOf5.includes(filters.posOf5)) &&
      (filters.approvalStatus === "" ||
        log.approvalStatus.toString().includes(filters.approvalStatus))
    );
  });

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ width: "6%" }}>
              Level
            </TableCell>
            <TableCell align="center" sx={{ width: "6%" }}>
              Version
            </TableCell>
            <TableCell align="center" sx={{ width: "20%" }}>
              Parking Image
            </TableCell>
            <TableCell align="center" sx={{ width: "20%" }}>
              Chart Image
            </TableCell>
            <TableCell align="center" sx={{ width: "6%" }}>
              Number of Cars
            </TableCell>
            <TableCell align="center" sx={{ width: "6%" }}>
              Number of People
            </TableCell>
            <TableCell align="center" sx={{ width: "6%" }}>
              Number of Colors
            </TableCell>
            <TableCell align="center" sx={{ width: "6%" }}>
              Meta
            </TableCell>
            <TableCell align="center" sx={{ width: "6%" }}>
              Number of Groups
            </TableCell>
            <TableCell align="center" sx={{ width: "6%" }}>
              Position of Group 4
            </TableCell>
            <TableCell align="center" sx={{ width: "6%" }}>
              Position of Group 5
            </TableCell>
            <TableCell align="center" sx={{ width: "10%" }}>
              Approval Status
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <TextField
                name="level"
                value={filters.level}
                onChange={handleFilterChange}
                variant="outlined"
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              <TextField
                name="version"
                value={filters.version}
                onChange={handleFilterChange}
                variant="outlined"
                size="small"
              />
            </TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left">
              <TextField
                name="numOfCar"
                value={filters.numOfCar}
                onChange={handleFilterChange}
                variant="outlined"
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              <TextField
                name="numOfPeople"
                value={filters.numOfPeople}
                onChange={handleFilterChange}
                variant="outlined"
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              <TextField
                name="numOfColor"
                value={filters.numOfColor}
                onChange={handleFilterChange}
                variant="outlined"
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              <TextField
                name="meta"
                value={filters.meta}
                onChange={handleFilterChange}
                variant="outlined"
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              <TextField
                name="numOfGroup"
                value={filters.numOfGroup}
                onChange={handleFilterChange}
                variant="outlined"
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              <TextField
                name="posOf4"
                value={filters.posOf4}
                onChange={handleFilterChange}
                variant="outlined"
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              <TextField
                name="posOf5"
                value={filters.posOf5}
                onChange={handleFilterChange}
                variant="outlined"
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              <Select
                name="approvalStatus"
                value={filters.approvalStatus}
                onChange={handleFilterChange}
                variant="outlined"
                size="small"
                displayEmpty
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="1">Approved</MenuItem>
                <MenuItem value="2">Fix now</MenuItem>
                <MenuItem value="0">In Review</MenuItem>
                <MenuItem value="4">Rejected</MenuItem>
              </Select>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredLogList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((log, index) => (
              <TableRow key={index}>
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
                      log.approvalStatus === 1 ? "green" : log.approvalStatus === 2 ? "red" : "grey"
                  }}
                >
                  {log.approvalStatus === 1 ? (
                    "Approved"
                  ) : log.approvalStatus === 2 ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleFixNowClick(log.version, log)}
                    >
                      Fix now
                    </Button>
                  ) : log.approvalStatus === 3 ? (
                    "Rejected"
                  ) : (
                    "In Review"
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={filteredLogList.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
  );
}
