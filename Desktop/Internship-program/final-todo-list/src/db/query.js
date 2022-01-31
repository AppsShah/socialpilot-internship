const mongoclient = require("../db/connection");
const isEmailindb = (email) =>
  mongoclient
    .db("internship-todolist")
    .collection("signuptable")
    .findOne({ email: email });

const insertsignupdata = async (username, email, password) =>
  mongoclient
    .db("internship-todolist")
    .collection("signuptable")
    .insertOne({ username: username, email: email, password: password });

const logindata = async (email) =>
  mongoclient
    .db("internship-todolist")
    .collection("signuptable")
    .findOne({ email: email });

const updatedata = async (id, newpassword) =>
  mongoclient
    .db("internship-todolist")
    .collection("signuptable")
    .updateOne({ _id: id }, { $set: { password: newpassword } });

const findusername = async (username) =>
  mongoclient
    .db("internship-todolist")
    .collection("signuptable")
    .findOne({ username: username });

const createpost = async (email, title, des, status) =>
  mongoclient
    .db("internship-todolist")
    .collection("todo")
    .insertOne({
      email: email,
      title: title,
      description: des,
      isDeleted: false,
      createdate: new Date(),
      lastupdatedate: new Date(),
      status: status,
    });

const findemail = async (email) =>
  mongoclient
    .db("internship-todolist")
    .collection("todo")
    .findOne({ email }, { isDeleted: false });

const deletepost = async (email) =>
  mongoclient
    .db("internship-todolist")
    .collection("todo")
    .updateOne(
      { $and: [{ email }, { isDeleted: false }] },
      { $set: { isDeleted: true } }
    );

const updatepost = (email, title, description, status) =>
  mongoclient
    .db("internship-todolist")
    .collection("todo")
    .updateOne(
      { $and: [{ email }, { isDeleted: false }] },
      { $set: { title, description, status, lastupdatedate: new Date() } }
    );

const viewpost = async (email) =>
  mongoclient
    .db("internship-todolist")
    .collection("todo")
    .find({ $and: [{ email: email }, { isDeleted: false }] })
    .toArray();

const deleteaccount = async (email) =>
  mongoclient
    .db("internship-todolist")
    .collection("todo")
    .deleteMany({ email });

const deleteaccountfrom = async (email) =>
  mongoclient
    .db("internship-todolist")
    .collection("signuptable")
    .deleteOne({ email });

const getlist = async (skip, limit) =>
  mongoclient
    .db("internship-todolist")
    .collection("todo")
    .find({})
    .limit(limit)
    .skip(skip);

const searchpost = async (keyword) =>
  mongoclient
    .db("internship-todolist")
    .collection("todo")
    .find({
      $or: [
        { title: { $regex: `${keyword}` } },
        { description: { $regex: `${keyword}` } },
      ],
    })
    .toArray();

module.exports = {
  isEmailindb,
  insertsignupdata,
  logindata,
  updatedata,
  findusername,
  createpost,
  findemail,
  deletepost,
  updatepost,
  viewpost,
  deleteaccount,
  deleteaccountfrom,
  getlist,
  searchpost,
};
