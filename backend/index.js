const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
const fs = require("fs");
const { exec, spawn } = require("child_process");

const PORT = process.env.PORT || 3001;

const uploadDir = process.env.UPLOAD_DIR || "uploads";

const app = express();

var isWin = process.platform === "win32";

let pqivSessionPid;

app.use(cors());

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
    safeFileNames: false,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.post("/show-image", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "Нет файла для показа",
      });
    } else {
      let image = req.files.file;

      fs.readdir(uploadDir, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          fs.unlink(path.join(uploadDir, file), (err) => {
            if (err) throw err;
          });
        }
      });

      image.mv("./" + uploadDir + "/" + image.name);

      if (!isWin) {
        pqivSessionPid &&
          exec("kill " + pqivSessionPid, (err, stdout, stderr) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`stdout: ${stdout}`);
            }
          });
        const execStr =
          "pqiv -f -F --allow-empty-window --display=:0 --disable-scaling --hide-info-box --enforce-window-aspect-ratio " +
          uploadDir +
          "/" +
          image.name +
          "";
        exec(execStr, (err, stdout, stderr) => {
          if (err) {
            console.error(err);
          } else {
            pqivSessionPid = stdout.split(" ")[1];
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
          }
        });
      } else {
        exec(
          'start "" /max ' + uploadDir + "/" + image.name,
          (err, stdout, stderr) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`stdout: ${stdout}`);
            }
          }
        );
      }

      res.send({
        status: true,
        message: "Файл загружен",
        data: {
          name: image.name,
          mimetype: image.mimetype,
          size: image.size,
        },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
