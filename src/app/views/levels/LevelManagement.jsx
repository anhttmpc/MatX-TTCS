import { useEffect, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import { css } from "@linaria/core";
import {
  Box,
  styled,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  MenuItem,
  Alert,
  Snackbar
} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationFeedbackTable from "../logs/feedback/PaginationFeedbackTable";
import { TreeDataGrid, SelectColumn } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { URL } from "app/utils/constant";
import { sortBy } from "lodash";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

const groupingClassname = css`
  display: flex;
  flex-direction: column;
  block-size: 100%;
  gap: 8px;

  > .rdg {
    flex: 1;
  }
`;

export default function LevelManagement() {
  const session_id = localStorage.getItem("session_id");

  const initialized = useRef(false);

  const [levelGroupList, setLevelGroupList] = useState([]);
  const [levelList, setLevelList] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [rows, setRows] = useState(createRows);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [expandedGroupIds, setExpandedGroupIds] = useState(new Set(["1-10", "11-20"]));
  const [modalOpen, setModalOpen] = useState(false);

  const handleAssign = (rowId, user) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === rowId ? { ...row, assignedTo: user } : row))
    );
  };

  const handleLogSelectedRows = () => {
    setModalOpen(true);
  };

  const handleSave = (user, dueDate) => {
    const selectedRowsArray = Array.from(selectedRows);
    setRows((prevRows) =>
      prevRows.map((row) =>
        selectedRowsArray.includes(row.id) ? { ...row, assignedTo: user, dueDate } : row
      )
    );
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const users = ["Admin 1", "Admin 2", "Admin 3", "Admin 4"];

  const getListGroupLevel = async () => {
    // Lấy DS Group
    try {
      const req = {
        session_id
      };

      const { data } = await axios.post(URL + "/LevelGameAPIs/grouplevel/listGroupLevel", req);

      if (data.code === 200) {
        setLevelGroupList(data.list_group);
        console.log(data.list_group);

        const promises = data.list_group.map((item, idx) => {
          console.log("idx", idx);
          getListLevelOfLevelGroup(item.ID);
        });
        await Promise.all(promises);
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

  const getListLevelOfLevelGroup = async (level_group_id) => {
    // Lấy DS level của mỗi Group
    try {
      const req = {
        session_id,
        level_group_id
      };

      const { data } = await axios.post(URL + "/LevelGameAPIs/level/listLevelOfLevelGroup", req);

      if (data.code === 200) {
        setLevelList((prev) => [...prev, ...data.list_level]);

        console.log("data.list_level", data.list_level);
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

  useEffect(() => {
    if (!initialized.current) {
      getListGroupLevel();
      initialized.current = true;
    }
  }, []);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Material", path: "/material" }, { name: "Feedback Table" }]}
        />
      </Box>

      <SimpleCard title="Pagination Table">
        <Box className={groupingClassname}>
          <Button onClick={handleLogSelectedRows} variant="contained" color="primary">
            Log Selected Rows
          </Button>
          <TreeDataGrid
            columns={columns}
            rows={levelList}
            rowKeyGetter={(item) => item.ID}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
            groupBy={["level_group_name"]}
            rowGrouper={rowGrouper}
            expandedGroupIds={expandedGroupIds}
            onExpandedGroupIdsChange={setExpandedGroupIds}
            defaultColumnOptions={{ resizable: true }}
            sortingOrder={["desc", "asc"]}
            sortModel={[
              {
                field: "name",
                sort: "asc"
              }
            ]}
          />
          <SelectionModal
            open={modalOpen}
            onClose={handleCloseModal}
            onSave={handleSave}
            users={users}
          />
        </Box>
        {/* <PaginationFeedbackTable /> */}
      </SimpleCard>

      <Snackbar
        open={Boolean(alert.message)}
        autoHideDuration={6000}
        onClose={() => setAlert({ type: "", message: "" })}
      >
        <Alert severity={alert.type}>{alert.message}</Alert>
      </Snackbar>
    </Container>
  );
}

const columns = [
  SelectColumn,
  {
    key: "level_group_name",
    name: "Level Group"
  },
  {
    key: "name",
    name: "Level"
  },
  {
    key: "assignedTo",
    name: "Assigned To",
    renderCell: (props) => (
      <AssignedToCell row={props.row} onAssign={(user) => handleAssign(props.row.id, user)} />
    )
  },
  {
    key: "end_time",
    name: "Due Date"
  },
  {
    key: "user_info",
    name: "Người thực hiện"
  }
];

function createRows() {
  const rows = [];
  for (let i = 1; i <= 20; i++) {
    const startLevel = Math.floor((i - 1) / 10) * 10 + 1;
    const endLevel = startLevel + 9;
    rows.push({
      id: i,
      levelGroup: `${startLevel}-${endLevel}`,
      levelName: `${100 + i}`,
      assignedTo: faker.person.fullName(),
      dueDate: faker.date.future().toLocaleDateString(),
      status: faker.helpers.arrayElement(["Open", "In Progress", "Closed"])
    });
  }

  return rows.sort((r1, r2) => r1.levelGroup.localeCompare(r2.levelGroup));
}

function rowGrouper(rows, columnKey) {
  return rows.reduce((acc, row) => {
    const key = row[columnKey];
    if (!acc[key]) acc[key] = [];
    acc[key].push(row);
    return acc;
  }, {});
}

function AssignedToCell({ row, onAssign }) {
  const [open, setOpen] = useState(false);
  const [assignedTo, setAssignedTo] = useState(row.assignedTo);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAssign = (user) => {
    setAssignedTo(user);
    if (onAssign) {
      onAssign(user);
    }
    setOpen(false);
  };

  const users = ["User 1", "User 2", "User 3", "User 4"];

  return (
    <div>
      {assignedTo}
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Assign to User</DialogTitle>
        <DialogContent>
          <List>
            {users.map((user) => (
              <ListItem button onClick={() => handleAssign(user)} key={user}>
                <ListItemText primary={user} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function SelectionModal({ open, onClose, onSave, users }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSave = () => {
    onSave(selectedUser, dueDate);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Assign Admin and Due Date</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Select Admin"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          fullWidth
          margin="normal"
        >
          {users.map((user) => (
            <MenuItem key={user} value={user}>
              {user}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
