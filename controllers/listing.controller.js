import listingModel from "../models/listing.model.js";

export const createlisting = async function (req, res, next) {
  const list = listingModel(req.body);
  list.save();
  res.send(list._id);
};
export const getListedItem = async function (req, res, next) {
  const item = await listingModel.findById(req.params.id);
  res.status(201).json(item);
};

export const getUserItems = async function (req, res, next) {
  const items = await listingModel.find({ userRef: req.params.id });
  res.send(items);
};
export const deleteUserItem = async (req, res, next) => {
  const item = await listingModel.findById(req.params.id);

  if (!item) {
    res.status(404).send({ message: "item not found " });
  } else {
    const userItem = await listingModel.findByIdAndDelete(req.params.id);
    res.send({ message: "item deleted successfully" });
  }
};
export const updateItem = async (req, res) => {
  const exist = await listingModel.findById(req.params.id);
  if (exist) {
    const item = await listingModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(item);
  } else {
    res.status(404).send({ message: "item not found" });
  }
};
export const searchItems = async (req, res) => {
  let searchTerm = req.query.searchTerm;
  if (searchTerm === undefined || searchTerm == "null") {
    searchTerm = "";
  }
  let offer = req.query.offer;
  if (offer === undefined || offer === "false") {
    offer = { $in: [false, true] };
  }
  let parking = req.query.parking;
  if (parking === undefined || parking === "false") {
    parking = { $in: [false, true] };
  }
  let type = req.query.type;
  if (type === undefined || type === "all" || type == "null") {
    type = { $in: ["sell", "rent"] };
  }
  let furnished = req.query.furnished;
  if (furnished === undefined || furnished === "false") {
    furnished = { $in: [false, true] };
  }
  let limit = parseInt(req.query.limit) || 9;
  let startIndex = parseInt(req.query.startIndex) || 0;
  // console.log(req.query.sort, req.query.order);
  let sort = req.query.sort;
  // console.log(sort);
  if (sort === undefined || sort == "null") {
    sort = "createdAt";
  }
  let order = req.query.order;
  if (order === undefined || order == "null") {
    order = "desc";
  }
  try {
    const list = await listingModel
      .find({
        name: { $regex: searchTerm, $options: "i" },
        offer,
        furnished,
        type,
        parking,
      })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    res.status(200).send({ list });
  } catch (error) {
    res.status(400).send(error);
  }
};
