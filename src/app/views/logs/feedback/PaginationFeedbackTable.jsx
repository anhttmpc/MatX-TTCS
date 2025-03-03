import React, { useState, useEffect } from "react";
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
  Icon,
  Paper,
  Collapse,
  Grid,
  Grid2,
  Snackbar,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { DataGrid } from "@mui/x-data-grid";
import { URL } from "app/utils/constant";

export default function PaginationFeedbackTable() {
  const session_id = localStorage.getItem("session_id");

  const [alert, setAlert] = useState({ type: "", message: "" });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [levelList, setLevelList] = useState([]);
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
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (params) => {
    setExpandedRow(expandedRow === params.id ? null : params.id);
  };

  const getListLogOfUser = async (level) => {
    try {
      const req = {
        session_id
      };

      const { data } = await axios.post(URL + "/LevelGameAPIs/level/getListLogOfUser", req);

      if (data.code === 200) {
        setLogList(data.list_level);
      } else if (data.code === 400) {
        throw new Error(data.desc);
      }
    } catch (error) {
      console.error(error);
      setAlert({ type: "error", message: error.message });
    } finally {
      // setSubmitting(false); // Re-enable the submit button
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch logList from API
    const fetchLogList = async () => {
      try {
        const response = await axios.post("/api/log/data");
        await getListLogOfUser();
        setLevelList(response.data.logList);
      } catch (error) {
        console.error("Error fetching log list:", error);
      }
    };

    fetchLogList();
  }, []);

  const handleFeedback = (log) => {
    console.log("Feedback:", log);
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

  const columns = [
    // { field: "id", headerName: "ID", width: 10 },
    { field: "level", headerName: "Level", width: 70, type: "number" },
    {
      field: "numOfCar",
      headerName: "Số lượng Xe",
      type: "number",
      width: 100
    },
    {
      field: "numOfPeople",
      headerName: "Số lượng Người",
      type: "number",
      width: 120
    },
    {
      field: "numOfColor",
      headerName: "Số lượng Màu",
      type: "number",
      width: 120
    },
    { field: "meta", headerName: "Meta", width: 70 },
    {
      field: "numOfGroup",
      headerName: "Số lượng Group",
      type: "number",
      width: 120
    },
    { field: "createdBy", headerName: "Người thực hiện", width: 100 },
    {
      field: "approvalStatus",
      headerName: "Trạng thái duyệt",
      width: 150,
      renderCell: (params) => (
        <Button
          style={{ width: 120, justifyContent: "flex-start" }}
          variant="contained"
          color={
            params.row.approvalStatus === 0
              ? "disabled"
              : params.row.approvalStatus === 1
              ? "success"
              : params.row.approvalStatus === 2
              ? "error"
              : "warning"
          }
          onClick={() => handleFeedback(params.row)}
        >
          {params.row.approvalStatus === 0 ? (
            <>
              <Icon sx={{ color: "primary" }} fontSize="small">
                folder_open
              </Icon>
              <Typography variant="body2" sx={{ ml: 1 }}>
                Chưa log
              </Typography>
            </>
          ) : params.row.approvalStatus === 1 ? (
            <>
              <Icon sx={{ color: "primary" }} fontSize="small">
                done
              </Icon>
              <Typography variant="body2" sx={{ ml: 1 }}>
                Đạt
              </Typography>
            </>
          ) : params.row.approvalStatus === 2 ? (
            <>
              <Icon sx={{ color: "error" }} fontSize="small">
                priority_high
              </Icon>
              <Typography variant="body2" sx={{ ml: 1 }}>
                Chưa đạt
              </Typography>
            </>
          ) : (
            <>
              <Icon sx={{ color: "warning" }} fontSize="small">
                cached
              </Icon>
              <Typography variant="body2" sx={{ ml: 1 }}>
                Chờ duyệt
              </Typography>
            </>
          )}
        </Button>
      )
    }
  ];

  const childColumns = [
    // { field: "version", headerName: "Version", width: 70 },
    {
      field: "create_time",
      headerName: "Thời gian log",
      width: 150,
      sortable: true,
      sortDirection: "desc"
    },
    // {
    //   field: "numOfCar",
    //   headerName: "Số lượng Xe",
    //   type: "number",
    //   width: 100
    // },
    // {
    //   field: "numOfPeople",
    //   headerName: "Số lượng Người",
    //   type: "number",
    //   width: 120
    // },
    // {
    //   field: "numOfColor",
    //   headerName: "Số lượng Màu",
    //   type: "number",
    //   width: 120
    // },
    {
      field: "user_name",
      headerName: "Người thực hiện",
      type: "text",
      width: 120
    },
    {
      field: "state",
      headerName: "Trạng thái duyệt",
      width: 150,
      renderCell: (params) => (
        <Button
          style={{ width: 120, justifyContent: "flex-start" }}
          variant="contained"
          color={params.row.state === 1 ? "success" : params.row.state === 2 ? "error" : "warning"}
          onClick={() => handleFeedback(params.row)}
        >
          {params.row.state === 1 ? (
            <>
              <Icon sx={{ color: "warning" }} fontSize="small">
                cached
              </Icon>
              <Typography variant="body2" sx={{ ml: 1 }}>
                Chờ duyệt
              </Typography>
            </>
          ) : params.row.state === 2 ? (
            <>
              <Icon sx={{ color: "primary" }} fontSize="small">
                done
              </Icon>
              <Typography variant="body2" sx={{ ml: 1 }}>
                Đạt
              </Typography>
            </>
          ) : (
            <>
              <Icon sx={{ color: "error" }} fontSize="small">
                priority_high
              </Icon>
              <Typography variant="body2" sx={{ ml: 1 }}>
                Chưa đạt
              </Typography>
            </>
          )}
        </Button>
      )
    }
  ];

  const rows = levelList;
  const childRows = logList;

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <React.Fragment>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Typography variant="h6">Danh sách Level</Typography>

          <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              // checkboxSelection
              onRowClick={handleRowClick}
              sx={{ border: 0 }}
            />
          </Paper>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          <Typography variant="h6">Các logs của Level {expandedRow}</Typography>
          {expandedRow && (
            <Paper sx={{ height: 400 }}>
              <DataGrid
                rows={childRows}
                columns={childColumns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                // checkboxSelection
                // onRowClick={handleRowClick}
                getRowId={(row) => row.ID}
                sx={{ border: 0 }}
              />
            </Paper>
          )}
        </Grid2>
      </Grid2>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: fullScreen ? "100%" : "400px", // Set the minimum width here
            width: fullScreen ? "100%" : "70%",
            maxWidth: "none",
            position: "absolute"
            // left: fullScreen ? "0" : "23%" // Adjust this value as needed to move the dialog away from the sidebar
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

      <Snackbar
        open={Boolean(alert.message)}
        autoHideDuration={6000}
        onClose={() => setAlert({ type: "", message: "" })}
      >
        <Alert severity={alert.type}>{alert.message}</Alert>
      </Snackbar>
    </React.Fragment>
  );
}
