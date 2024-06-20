const BASE_URL = process.env.REACT_APP_BASE_URL

export const authEndPoint = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",

    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",

}

export const userEndPoint = {
    SENDFORGOTEPASSTOKEN_API: BASE_URL + "/user/sendForgotePasswordToken",
    VERIFYFORGOTEPASSOTP_API: BASE_URL + "/user/verifyForgoteOtp",
    FORGOTEPASSWORDUPDATE_API: BASE_URL + "/user/forgotePasswordUpdate",
    
    // err check
    GETUSERBYSEARCH_API: BASE_URL + "/user/getallusers",
    GETUSERARRAY_API: BASE_URL + "/user/getAllOfUsersArr",

    UPDATEPROFILE_API: BASE_URL + "/user/updateProfile",
    DELETEACCOUNT_API: BASE_URL + "/user/deleteAccount",

    GETUSERDETAILS_API: BASE_URL + "/user/getAllUserDetails",

    GETUSERBYTOKEN_API: BASE_URL + "/user/getUserByToken"
}


export const chatEndPoint = {
    CREATECHAT_API: BASE_URL + "/chat/chatrouter",
    GETCHATOFUSER_API: BASE_URL + "/chat/getchat",
    CREATGROUP_API: BASE_URL + "/chat/groupcreation",
    UPDATEGROUPICON_API: BASE_URL + "/chat/updategroupicon",
    UPDATEGROUPNAME_API: BASE_URL + "/chat/updategroupname",
    REMOVEFROMGROUP_API: BASE_URL + "/chat/removefromgroup",
    EXITFROMGROUP_API: BASE_URL + "/chat/exitfromgroup",
    DELETECHAT_API: BASE_URL + "/chat/deleteChat",
    SHOWUSERFORADD_API: BASE_URL + "/chat/showUserForAdd",
    ADDTOGROUP_API: BASE_URL + "/chat/addtogroup"
}

export const MessageEndPoint = {
    SENDMESSAGE_API: BASE_URL + "/message/sendMessage",
    GETALLMESSAGE_API: BASE_URL + "/message/getAllMessages",
    GETCHATDETAILS_API : BASE_URL + '/message/getchatdetails'
}