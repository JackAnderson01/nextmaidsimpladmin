import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import ScheduledNotificationEntity from "../../schema/notification/ScheduledNotificationSchema";
import NotificationEntity from "../../schema/notification/NotificationSchema";
import schedule from "node-schedule";
import sendNotification from "./sendNotification";
import saveNotificationContent from "./saveNotificationContent";

const validAudienceTypes = ["all", "user", "cleaner"];

const validTimezones = [
  "EST", // Eastern Standard Time (UTC-5:00)
  "CST", // Central Standard Time (UTC-6:00)
  "MST", // Mountain Standard Time (UTC-7:00)
  "PST", // Pacific Standard Time (UTC-8:00)
  "AKST", // Alaska Standard Time (UTC-9:00)
  "HST", // Hawaii-Aleutian Standard Time (UTC-10:00),
  "UTC", // Coordinated Universal Time (UTC+0:00)
];

const notificationContentValidator = Joi.object({
  id: Joi.string().min(4).required().allow(null),
  title: Joi.string().required(),
  message: Joi.string().required(),
  date: Joi.date().iso().required(),
  time: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .required(),
  timeZone: Joi.string()
    .valid(...validTimezones)
    .required(),
  audienceType: Joi.string()
    .valid(...validAudienceTypes)
    .required(),
});

export default async function PostScheduledNotificationController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { id, title, message, date, time, timeZone, audienceType } = req.body;

    const { error } = await notificationContentValidator.validateAsync(
      req.body
    );

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const dateParts = date.split("-");
    const timeParts = time.split(":");

    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);

    const hour = parseInt(timeParts[0], 10);
    const minute = parseInt(timeParts[1], 10);
    const second = parseInt(timeParts[2], 10);

    const scheduledTime = new Date(year, month, day, hour, minute, second);
    scheduledTime.toLocaleString("en-US", { timeZone: timeZone });

    var scheduledNotification = null;
    if (id != null) {
      // Check if the notification is being edited
      const existingScheduledNotification =
        await ScheduledNotificationEntity.findOne({ _id: id });

      // If it exists, cancel the existing job
      if (existingScheduledNotification) {
        console.log("existing notification");
        console.log(existingScheduledNotification);

        const existingJob =
          schedule.scheduledJobs[existingScheduledNotification._id.toString()];

        if (existingJob) {
          existingJob.cancel();
          existingJob.deleteFromSchedule();

          console.log("Existing job");
          console.log(existingJob);
        }

        // Create a new scheduled notification
        scheduledNotification =
          await ScheduledNotificationEntity.findOneAndUpdate(
            { _id: id },
            {
              title,
              message,
              date,
              time,
              timeZone,
              audienceType,
            }
          );
      } else {
        return res.status(404).send({
          success: false,
          error: "No such scheduled notifcation found",
        });
      }
    } else {
      // Create a new scheduled notification
      scheduledNotification = new ScheduledNotificationEntity({
        title,
        message,
        date,
        time,
        timeZone,
        audienceType,
      });

      // Save the scheduled notification to MongoDB
      await scheduledNotification.save();
    }

    //Code block for sending notifications to everyone in database
    if (audienceType == "all") {
      const existingUserAudience = await NotificationEntity.find({
        userType: "user",
        isActive: true,
      });

      const existingCleanerAudience = await NotificationEntity.find({
        userType: "cleaner",
        isActive: true,
      });

      if (existingUserAudience && existingUserAudience.length > 0) {
        existingUserAudience.forEach((device) => {
          const scheduledJob = schedule.scheduleJob(
            scheduledNotification._id.toString(),

            scheduledTime,
            async () => {
              await saveNotificationContent(device.email, title, message);

              sendNotification(device.registrationToken, title, message, null);
            }
          );
        });
      }

      if (existingCleanerAudience && existingCleanerAudience.length > 0) {
        existingCleanerAudience.forEach((device) => {
          // const date = new Date(2023, 10, 24, 16, 25, 0); // Set the desired date and time
          const scheduledJob = schedule.scheduleJob(
            scheduledNotification._id.toString(),

            scheduledTime,
            async () => {
              await saveNotificationContent(device.email, title, message);
              sendNotification(device.registrationToken, title, message, null);
            }
          );
        });
      }

      return res
        .status(200)
        .send({ success: true, result: "Scheduled Notifications Set" });
    }

    const existingAudience = await NotificationEntity.find({
      userType: audienceType,
      isActive: true,
    });

    if (existingAudience && existingAudience.length > 0) {
      const scheduledJob = schedule.scheduleJob(
        scheduledNotification._id.toString(),
        scheduledTime,
        async () => {
          const existingAudience = await NotificationEntity.find({
            userType: audienceType,
            isActive: true,
          });

          existingAudience.forEach(async (device) => {
            await saveNotificationContent(device.email, title, message);
            sendNotification(device.registrationToken, title, message, null);
          });
        }
      );
      return res
        .status(200)
        .send({ success: true, result: "Scheduled Notifications Set" });
    } else {
      return res
        .status(404)
        .send({ success: false, error: "No active devices found" });
    }
  } catch (err) {
    console.error("Error creating scheduled notification:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
