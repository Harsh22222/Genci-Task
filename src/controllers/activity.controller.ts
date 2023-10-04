import activityModel from "../models/activity.model";
import { Request, Response } from "express";
import moment from "moment";

export const createActivity = async (req: Request, res: Response) => {
  // @ts-ignore
  const currUser = req.user;

  // check if there exist an activity for the currentUser on todays date ignore the time
  const today = moment().startOf("day").toDate();

  const activity = await activityModel.findOne({
    user: currUser._id,
    createdAt: {
      $gte: today, // Greater than or equal to the start of the input date
      $lt: moment(today).add(1, "days").toDate(), // Less than the start of the next day
    },
  });
  if (activity) {
    return res.status(400).json({
      message:
        "Activity already exists on todays date. Please update using another route",
    });
  }

  const newActivity = new activityModel({
    user: currUser._id,
  });

  await newActivity.save();

  return res.status(200).json({
    message: "Activity created successfully",
  });
};

export const updateActivity = async (req: Request, res: Response) => {
  const { score, date } = req.body;

  // @ts-ignore
  const currUser = req.user;

  const inputDate = moment(date, "DD/MM/YYYY");
  const startDate = inputDate.startOf("day").toDate();

  const activity = await activityModel.findOne({
    user: currUser._id,
    createdAt: {
      $gte: startDate, // Greater than or equal to the start of the input date
      $lt: moment(startDate).add(1, "days").toDate(), // Less than the start of the next day
    },
  });

  if (!activity) {
    return res.status(400).json({
      message: "Activity does not exist",
    });
  }

  activity.score = score;
  await activity.save();
  return res.status(200).json({
    message: "Activity updated successfully",
  });
};

export const getDatapointsActivity = async (req: Request, res: Response) => {
  // @ts-ignore
  const currUser = req.user;

  const activities = await activityModel.find({
    user: currUser._id,
  });

  return res.status(200).json({
    message: "Activities fetched successfully",
    activities,
  });
};
