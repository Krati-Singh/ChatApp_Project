import { useEffect } from "react";
import useAppStore from "../../store/index.js";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner";
import { LOGIN_ROUTE } from "../../utils/constants";
import { GET_USER_INFO } from "@/utils/constants";

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if(userInfo && !userInfo.profileSetup) {
      toast("Please setup your profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate])
  if (!userInfo) return null;
  return (
    <div>
      Chat
      <div>Email:
        {userInfo.email}</div>
    </div>
  )
}

export default Chat