import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Grid,
  Stack,
  FormControlLabel,
  Checkbox,
  Icon,
  IconButton,
  Grid2,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Alert,
  Snackbar
} from "@mui/material";
import { Box, styled, textAlign, useMediaQuery } from "@mui/system";
import { useTheme } from "@emotion/react";
import { URL as url } from "app/utils/constant";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
// import ImageUploadWithPreview from "./ImageUploadWithPreview"; // Assuming this is in the same directory

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

const validationSchema = Yup.object().shape({
  numOfCar: Yup.number().typeError("Vui lòng nhập ký tự số").required("Required"),
  numOfPeople: Yup.number().typeError("Vui lòng nhập ký tự số").required("Required"),
  numOfColor: Yup.number().typeError("Vui lòng nhập ký tự số").required("Required"),
  meta: Yup.string().required("Required"),
  numOfGroup: Yup.number().typeError("Vui lòng nhập ký tự số").required("Required"),
  posOf4: Yup.number().typeError("Vui lòng nhập ký tự số").required("Required"),
  posOf5: Yup.number().typeError("Vui lòng nhập ký tự số").required("Required"),
  level: Yup.string().required("Required"),
  image1: Yup.mixed().required("Required"),
  image2: Yup.mixed().required("Required"),
  file1: Yup.mixed()
    .required("Required")
    .test(
      "fileFormat",
      "Chỉ cho phép file dạng .txt",
      (value) => value && value.type === "text/plain"
    ),
  file2: Yup.mixed()
    .required("Required")
    .test(
      "fileFormat",
      "Chỉ cho phép file dạng .txt",
      (value) => value && value.type === "text/plain"
    )
});

const SubmitSimpleForm = () => {
  const session_id = localStorage.getItem("session_id");

  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", values.image1); // Use values from Formik
      formData.append("chart", values.image2); // Use values from Formik
      formData.append("level_file", values.file1); // Use values from Formik
      formData.append("group_file", values.file2); // Use values from Formik
      formData.append("session_id", session_id);
      formData.append("level_id", values.level); // Use values from Formik
      formData.append("comment", "test");
      formData.append(
        "details",
        JSON.stringify({
          numOfCar: values.numOfCar,
          numOfPeople: values.numOfPeople,
          numOfColor: values.numOfColor,
          meta: values.meta,
          numOfGroup: values.numOfGroup,
          posOf4: values.posOf4,
          posOf5: values.posOf5
        })
      );

      const { data } = await axios.post(url + "/LevelGameAPIs/level/reportLogLevel", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (data.code === 200) {
        resetForm();
        handleClose();
        setAlert({ type: "success", message: "Reported successfully" });
      } else if (data.code === 400) {
        throw new Error(data.desc);
      }
    } catch (error) {
      console.error(error);
      setAlert({ type: "error", message: error.message });
    } finally {
      setSubmitting(false); // Re-enable the submit button
    }
  };

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Open Form
      </Button>
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
        <DialogTitle>Submit Level Log</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              numOfCar: "",
              numOfPeople: "",
              numOfColor: "",
              meta: "",
              numOfGroup: "",
              posOf4: "",
              posOf5: "",
              level: 1,
              image1: null,
              image2: null,
              file1: null,
              file2: null
            }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              handleChange,
              setFieldValue,
              handleSubmit,
              isSubmitting,
              errors,
              touched
            }) => (
              <Form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="level-label">Level</InputLabel>
                  <Select
                    labelId="level-label"
                    id="level"
                    name="level"
                    value={values.level}
                    onChange={handleChange}
                    label="Level"
                    style={{ width: "100%" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Level 1</MenuItem>
                    <MenuItem value={2}>Level 2</MenuItem>
                    <MenuItem value={3}>Level 3</MenuItem>
                  </Select>
                </FormControl>

                <Grid2 container spacing={6}>
                  <Grid2 item size={{ md: 6, xs: 12 }}>
                    <ImageUploadWithPreview
                      title="Tải lên ảnh bãi xe"
                      image={values.image1}
                      // onImageChange={(e) => handleImageChange(e, "image1")}
                      // onDeleteImage={() => handleDeleteImage("image1")}
                      onImageChange={(e) => {
                        const file = e.target.files[0];
                        setFieldValue("image1", file); // Use setFieldValue
                      }}
                      onDeleteImage={() => setFieldValue("image1", null)} // Use setFieldValue
                      error={touched.image1 && Boolean(errors.image1)}
                      helperText={touched.image1 && errors.image1}
                    />
                  </Grid2>
                  <Grid2 item size={{ md: 6, xs: 12 }}>
                    <ImageUploadWithPreview
                      title="Tải lên ảnh chart độ khó"
                      image={values.image2}
                      // onImageChange={(e) => handleImageChange(e, "image2")}
                      // onDeleteImage={() => handleDeleteImage("image2")}
                      onImageChange={(e) => {
                        const file = e.target.files[0];
                        setFieldValue("image2", file); // Use setFieldValue
                      }}
                      onDeleteImage={() => setFieldValue("image2", null)} // Use setFieldValue
                      error={touched.image2 && Boolean(errors.image2)}
                      helperText={touched.image2 && errors.image2}
                    />
                  </Grid2>
                </Grid2>

                <Grid2 container spacing={6}>
                  <Grid2 item size={{ md: 6, xs: 12 }}>
                    <FileUpload
                      title="Tải lên file Levels"
                      image={values.file1}
                      onFileChange={(e) => {
                        const file = e.target.files[0];
                        setFieldValue("file1", file); // Use setFieldValue
                      }}
                      onDeleteFile={() => setFieldValue("file1", null)} // Use setFieldValue
                      error={touched.file1 && Boolean(errors.file1)}
                      helperText={touched.file1 && errors.file1}
                    />
                  </Grid2>
                  <Grid2 item size={{ md: 6, xs: 12 }}>
                    <FileUpload
                      title="Tải lên file Groups"
                      image={values.file2}
                      onFileChange={(e) => {
                        const file = e.target.files[0];
                        setFieldValue("file2", file); // Use setFieldValue
                      }}
                      onDeleteFile={() => setFieldValue("file2", null)} // Use setFieldValue
                      error={touched.file2 && Boolean(errors.file2)}
                      helperText={touched.file2 && errors.file2}
                    />
                  </Grid2>
                </Grid2>

                <Box mt={2} />

                <Grid2 container spacing={6}>
                  <Grid2 item size={{ md: 6, xs: 12 }}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        type="number"
                        name="numOfCar"
                        value={values.numOfCar}
                        onChange={handleChange}
                        label="Số lượng Xe"
                        error={touched.numOfCar && Boolean(errors.numOfCar)}
                        helperText={touched.numOfCar && errors.numOfCar}
                        required
                      />

                      <TextField
                        fullWidth
                        type="number"
                        name="numOfPeople"
                        value={values.numOfPeople}
                        onChange={handleChange}
                        label="Số lượng Người"
                        error={touched.numOfPeople && Boolean(errors.numOfPeople)}
                        helperText={touched.numOfPeople && errors.numOfPeople}
                        required
                      />

                      <TextField
                        fullWidth
                        type="number"
                        name="numOfColor"
                        value={values.numOfColor}
                        onChange={handleChange}
                        label="Số lượng Màu"
                        error={touched.numOfColor && Boolean(errors.numOfColor)}
                        helperText={touched.numOfColor && errors.numOfColor}
                        required
                      />

                      <TextField
                        fullWidth
                        type="text"
                        name="meta"
                        value={values.meta}
                        onChange={handleChange}
                        label="Meta"
                        required
                      />
                    </Stack>
                  </Grid2>

                  <Grid2 item size={{ md: 6, xs: 12 }}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        type="number"
                        name="numOfGroup"
                        value={values.numOfGroup}
                        onChange={handleChange}
                        label="Số lượng Group"
                        error={touched.numOfGroup && Boolean(errors.numOfGroup)}
                        helperText={touched.numOfGroup && errors.numOfGroup}
                        required
                      />

                      <TextField
                        fullWidth
                        type="text"
                        name="posOf4"
                        value={values.posOf4}
                        onChange={handleChange}
                        label="Vị trí Group 4"
                        error={touched.posOf4 && Boolean(errors.posOf4)}
                        helperText={touched.posOf4 && errors.posOf4}
                        required
                      />

                      <TextField
                        fullWidth
                        type="text"
                        name="posOf5"
                        value={values.posOf5}
                        onChange={handleChange}
                        label="Vị trí Group 5"
                        error={touched.posOf5 && Boolean(errors.posOf5)}
                        helperText={touched.posOf5 && errors.posOf5}
                        required
                      />
                    </Stack>
                  </Grid2>

                  <FormControlLabel
                    control={<Checkbox required />}
                    label="Xác nhận đã kiểm tra kỹ thông tin trước khi submit"
                  />
                </Grid2>

                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    loading={isSubmitting}
                  >
                    <Icon>send</Icon>
                    <span style={{ paddingLeft: "8px", textTransform: "capitalize" }}>Submit</span>
                  </LoadingButton>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={alert.message}
        autoHideDuration={6000}
        onClose={() => setAlert({ type: "", message: "" })}
      >
        <Alert severity={alert.type}>{alert.message}</Alert>
      </Snackbar>
    </Container>
  );
};

const ImageUploadWithPreview = ({ title, onImageChange, onDeleteImage }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }

    onImageChange(event);
  };

  const handleDeleteImage = () => {
    setImage(null);

    onDeleteImage();
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <input
        accept="image/*"
        className="input"
        id="icon-button-file"
        type="file"
        onChange={handleImageChange}
        required
      />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" component="span" className="button" aria-label="Upload picture">
          <Icon>add_a_photo</Icon>
        </IconButton>
      </label>
      {image && (
        <Box
          style={{ textAlign: "center", position: "relative", backgroundColor: "#d3d3d3" }}
          mt={2}
        >
          <img
            src={image}
            alt="Preview"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
          <Button
            style={{ position: "absolute", bottom: 0, right: 0 }}
            variant="contained"
            color="error"
            onClick={handleDeleteImage}
            sx={{ mt: 2 }}
          >
            <Icon>delete</Icon>
          </Button>
        </Box>
      )}
    </div>
  );
};

const FileUpload = ({ title, onFileChange, onDeleteFile }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
    }

    onFileChange(event);
  };

  const handleDeleteFile = () => {
    setFile(null);

    onDeleteFile();
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <input
        accept=".txt"
        className="input"
        id="icon-button-file"
        type="file"
        onChange={handleFileChange}
        required
      />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" component="span" className="button" aria-label="Upload picture">
          <Icon>file_upload</Icon>
        </IconButton>
      </label>
      {file && (
        <Box
          style={{ textAlign: "center", position: "relative", backgroundColor: "#d3d3d3" }}
          mt={2}
        >
          <img
            src={file}
            alt="Preview"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
          <Button
            style={{ position: "absolute", bottom: 0, right: 0 }}
            variant="contained"
            color="error"
            onClick={handleDeleteFile}
            sx={{ mt: 2 }}
          >
            <Icon>delete</Icon>
          </Button>
        </Box>
      )}
    </div>
  );
};

export default SubmitSimpleForm;
