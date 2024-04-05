const ChatModel = require('../models/chatModel')
module.exports = {
    saveMessage: async (msgObj, users) => {
        console.log(msgObj, users);
        try {
            let pair = await ChatModel.findOne({
                users: {
                    $all: [users.user1, users.user2]
                }
            })
            let res
            console.log(pair);
            if (pair) {
                res = await ChatModel.updateOne({
                    users: {
                        $all: [users.user1, users.user2]
                    }
                }, {
                    $push: {
                        chats: msgObj
                    }
                })
            } else {
                const chat = new ChatModel({
                    users: [users.user1, users.user2],
                    chats: [msgObj]
                })
                await chat.save()
            }

            // const chat = new ChatModel(msgObj)
            // chat.save()
            console.log(res, "jjjj");
            return res
        } catch (error) {
            console.log(error);
        }
    },
    chatList: async (id) => {
        try {
            const chatList = await ChatModel.aggregate([
                {
                    $match: {
                        users: {
                            $elemMatch: { "$eq": id } // Assuming 'id' is the value you're matching
                        }
                    }
                }, {
                    $unwind: "$users"
                },
                {
                    $match: {
                        users: {
                            "$ne": id
                        }
                    }
                }, {
                    $lookup: {
                        from: "users",
                        localField: "users",
                        foreignField: "_id",
                        as: "userData"
                    }
                },
                {
                    $unwind: "$userData"
                },
                {
                    $project: {
                        sender: "$users",
                        senderName: "$userData.firstName"
                    }
                }
            ]);
            console.log(chatList);
            return chatList


        } catch (error) {
            console.log(error);
        }
    },
    fetchMessage: async (user1, user2) => {
        console.log(user1, user2);
        const messageList = await ChatModel.aggregate([
            {
                $match: {
                    users: {
                        $elemMatch: { "$eq": user2 } // Assuming 'id' is the value you're matching
                    }
                }
            }, {
                $unwind: "$users"
            },
            {
                $match: {
                    users: {
                        "$ne": user2,
                        "$eq": user1
                    }
                }
            },

        ]);
        console.log(messageList);
        return messageList
    }
}