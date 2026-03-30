import FriendRequest from "../models/friendRequest.model";
import User from "../models/user.model";
import { sendEncrypted } from "../utils/response.util";
import { sendEmail } from "../utils/mail.util";

// Send Request
export const sendRequest = async (req: any, res: any) => {
  const { receiverId } = req.body;

  const sender = await User.findById(req.user.id);
  const receiver = await User.findById(receiverId);

  if (!sender || !sender.email) {
    return res.status(404).json({ message: "Sender not found" }); 
  }

  if (!receiver || !receiver.email) {
    return res.status(404).json({ message: "Receiver not found" }); 
  }

  const request = await FriendRequest.create({
    sender: sender._id,
    receiver: receiver._id
  });

  await sendEmail(
    receiver.email,
    "New Friend Request",
    `${sender.name} sent you a friend request`
  );

  return sendEncrypted(res, request); 
};

// Accept / Reject
export const respondRequest = async (req: any, res: any) => {
  const { requestId, action } = req.body;

  const request = await FriendRequest.findById(requestId);

  if (!request) {
    return res.status(404).json({ message: "Not found" }); 
  }

  request.status = action;
  await request.save();

  if (action === "accepted") {
    await User.findByIdAndUpdate(request.sender, {
      $push: { friends: request.receiver }
    });

    await User.findByIdAndUpdate(request.receiver, {
      $push: { friends: request.sender }
    });

    const sender = await User.findById(request.sender);
    const receiver = await User.findById(request.receiver);

    if (!sender || !sender.email) {
      return res.status(404).json({ message: "Sender not found" }); 
    }

    if (!receiver || !receiver.name) {
      return res.status(404).json({ message: "Receiver not found" }); 
    }

    await sendEmail(
      sender.email,
      "Friend Request Accepted",
      `${receiver.name} accepted your friend request`
    );
  }

  return sendEncrypted(res, request); 
};

// Get Friends
export const getFriends = async (req: any, res: any) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const skip = (page - 1) * limit;

  const user = await User.findById(req.user.id).populate({
    path: "friends",
    options: {
      skip,
      limit
    }
  });

  return sendEncrypted(res, user?.friends);
};

// Get Users
export const getUsers = async (req: any, res: any) => {
  const users = await User.find().select("-password");
  return sendEncrypted(res, users); 
};

export const getFriendRequests = async (req: any, res: any) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const skip = (page - 1) * limit;

  const requests = await FriendRequest.find({
    receiver: req.user.id,
    status: "pending"
  })
    .populate("sender", "name email userId")
    .skip(skip)
    .limit(limit);

  return sendEncrypted(res, requests);
};