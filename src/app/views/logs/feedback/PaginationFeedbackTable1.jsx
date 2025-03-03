import { useState, useEffect } from "react";
import axios from "axios";
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
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
  IconButton,
  Icon
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

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

export default function PaginationFeedbackTable() {
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
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedLog, setSelectedLog] = useState(null);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch logList from API
    const fetchLogList = async () => {
      try {
        const response = await axios.post("/api/log/data");
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

  const handleFeedback = (log) => {
    setSelectedLog(log);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setComment("");
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Comment:", comment);
    console.log("Log:", selectedLog);
    setOpen(false);
    setComment("");
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
                <MenuItem value="0">In Review</MenuItem>
                <MenuItem value="1">Passed</MenuItem>
                <MenuItem value="2">Not Pass</MenuItem>
              </Select>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredLogList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((log, index) => (
              <TableRow key={index} hover>
                <TableCell align="center">{log.level}</TableCell>
                <TableCell align="center">{log.version}</TableCell>
                <TableCell align="left">
                  <img
                    src={log.parkingImg}
                    alt="Parking"
                    style={{ width: "100%", maxHeight: "150px", objectFit: "contain" }}
                  />
                </TableCell>
                <TableCell align="left">
                  <img
                    src={log.chartImg}
                    alt="Chart"
                    style={{ width: "100%", maxHeight: "150px", objectFit: "contain" }}
                  />
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
                    "Passed"
                  ) : log.approvalStatus === 2 ? (
                    <Button
                      variant="text"
                      style={{ textDecoration: "underline", color: "red" }}
                      onClick={() => handleFeedback(log)}
                    >
                      <Icon sx={{ color: "red" }} fontSize="small">
                        priority_high
                      </Icon>
                      Not Passed
                    </Button>
                  ) : (
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      rowGap="10px"
                    >
                      <Button variant="outlined" color="primary" onClick={() => handleApprove(log)}>
                        <Icon sx={{ color: "primary" }} fontSize="small">
                          done
                        </Icon>
                        Passed
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleFeedback(log)}
                      >
                        <Icon sx={{ color: "primary" }} fontSize="small">
                          cached
                        </Icon>
                        Feedback
                      </Button>
                    </Box>
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

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: fullScreen ? "100%" : "400px", // Set the minimum width here
            width: fullScreen ? "100%" : "70%",
            maxWidth: "none",
            position: "absolute",
            left: fullScreen ? "0" : "23%" // Adjust this value as needed to move the dialog away from the sidebar
          }
        }}
      >
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>Please provide your comments for fixing the issue.</DialogContentText>
          {selectedLog && (
            <Box>
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box width="48%">
                  <Typography variant="body2" align="center" style={{ fontWeight: "bold" }}>
                    Parking Image
                  </Typography>
                  <img
                    src={selectedLog.parkingImg}
                    alt="Parking"
                    style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
                  />
                </Box>
                <Box width="48%">
                  <Typography variant="body2" align="center" style={{ fontWeight: "bold" }}>
                    Chart Image
                  </Typography>
                  <img
                    src={selectedLog.chartImg}
                    alt="Chart"
                    style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
                  />
                </Box>
              </Box>
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box width="48%">
                  <Typography variant="body2">
                    <strong>Level:</strong> {selectedLog.level}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Version:</strong> {selectedLog.version}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Number of Cars:</strong> {selectedLog.numOfCar}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Number of People:</strong> {selectedLog.numOfPeople}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Number of Colors:</strong> {selectedLog.numOfColor}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Meta:</strong> {selectedLog.meta}
                  </Typography>
                </Box>
                <Box width="48%">
                  <Typography variant="body2">
                    <strong>Number of Groups:</strong> {selectedLog.numOfGroup}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Position of Group 4:</strong> {selectedLog.posOf4}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Position of Group 5:</strong> {selectedLog.posOf5}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Approval Status:</strong> {selectedLog.approvalStatus}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Comment"
            type="text"
            fullWidth
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <DialogContentText>Please review the comments below:</DialogContentText>
          {selectedLog && (
            <TextField
              label="Comment"
              value={selectedLog.comment}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              disabled
              InputProps={{
                readOnly: true
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
