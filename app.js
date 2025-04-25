import AuthRoute from './src/routes/auth-route.js'
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "./logger.js";
import morgan from "morgan";
import ProflieRoute from './src/routes/profile-route.js'
import EventRoute from './src/routes/event-routes.js'
import RequestRoute from './src/routes/request-routes.js'
import EventFeedRoute from './src/routes/eventFeed-routes.js';
import RegistrationRoute from './src/routes/registration-routes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Routes
app.use('/api/auth', AuthRoute);
app.use('/api/profile', ProflieRoute);
app.use('/api/event', EventRoute);
app.use('/api/request', RequestRoute);
app.use('/api/eventFeed', EventFeedRoute);
app.use('/api/registration', RegistrationRoute);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});