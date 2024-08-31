const GroupList = require("../models/groupModel");


const createGroup = async (req, res, next) => {
  const { groupName, groupCode, groupStatus, groupMembers, groupType} = req.body;

  let existingGroup;

  if (!groupName || !groupCode || !groupStatus || !groupMembers || !groupType) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    existingGroup = await GroupList.findOne({ groupCode: groupCode});
  } catch (error) {
    console.log(error, "errorrrrr");
  }
  if (existingGroup) {
    return res.status("400").json({ message: "group already exists" });
  } else {
    const group = new GroupList({
      groupName,
      groupCode,
      groupStatus,
      groupMembers,
      groupType
    });
    try {
      await group.save();
    } catch (error) {
      console.log(error,"Group Creation Fail");
    }
    return res.status(201).json({ message: group });
  }
};
const updateGroup = async (req, res, next) => {
  try {
    const {
      groupName,
      groupCode,
      groupStatus,
      groupMembers,
      groupType
    } = req.body;


    await GroupList.findOneAndUpdate(
      { _id: req.params.id },
      {
        groupName,
        groupCode,
        groupStatus,
        groupMembers,
        groupType
      }
    );
    return res.status(200).json({ message: "Group Updated Successfully..!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteGroup = async (req, res, next) => {
  try {
    await GroupList.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Group Deleted Successfully...!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneGroup = async (req, res, next) => {
  try {
    const singleGroup = await GroupList.findById(req.params.id);
    return res.json(singleGroup);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllGroups = async (req, res, next) => {
  const { pageNo = 1, pageSize = 8, search = '' } = req.body;
  console.log(req.body,"reqBodyGroup")

  try {
      const skip = (pageNo - 1) * pageSize;

      // Search query for eventTitle or eventDescription
      const query = {
          $or: [
              { groupName: { $regex: search, $options: 'i' } }, 
              { groupCode: { $regex: search, $options: 'i' } } 
          ]
      };
      console.log(query,"queryquerygroup")

      // Fetch events with pagination and search
      const allGroups = await GroupList.find(query)
                                       .skip(skip)
                                       .limit(pageSize);

      const totalGroups = (await GroupList.find({})).length;

      res.json({
          totalPages: Math.ceil(totalGroups / pageSize),
          currentPage: pageNo,
          groups: allGroups,
          totalElements: totalGroups
      });
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

const groupBasedCount = async (req, res, next) => {
  try {
    const allGroups = await GroupList.find({});
    
    let activeCount = allGroups.filter(group => group.groupStatus === "Active").length;
    let inactiveCount = allGroups.filter(group => group.groupStatus === "Inactive").length;
    let totalCount = activeCount + inactiveCount;

    res.json({ 
      activeCount: activeCount,
      inactiveCount: inactiveCount, 
      totalCount: totalCount
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


  

exports.createGroup = createGroup;
exports.updateGroup = updateGroup;
exports.deleteGroup = deleteGroup;
exports.getOneGroup = getOneGroup;
exports.getAllGroups = getAllGroups;
exports.groupBasedCount = groupBasedCount;
