import Background from '/logo.jpeg'
import Victory from '@/assets/victory.png' 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { Button } from "@/components/ui/button" 
import { toast } from "sonner";
import { SIGNUP_ROUTE } from "@/utils/constants";
import {LOGIN_ROUTE} from "@/utils/constants"
import apiClient from '@/lib/api-client';
import { useNavigate } from 'react-router-dom';
import useAppStore from "../../store/index.js";


const Auth = () => {
  const navigate = useNavigate("")
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const validateLogin = () => {
    if(!email.length){
      alert(email.length);
      toast.error("Email is required.");
      return false;
    }
    if(!email.length){
      toast.error("Email is required.");
      return false;
    }
    if(!password.length){
      toast.error("Password is required.");
      return false;
    }
    return true;
  };
  const validateSignup = () => {
    if(!email.length){
      alert(email.length);
      toast.error("Email is required.");
      return false;
    }
    if(!email.length){
      toast.error("Email is required.");
      return false;
    }
    if(!password.length){
      toast.error("Password is required.");
      return false;
    }
    if(password != confirmPassword){
      toast.error("Password and confirm password should be same.");
      return false;
    }
    return true;
  };

  const handleLogin = async() => {
    if(validateLogin()){
      const response = await apiClient.post("/api/auth/login", {email, password},{withCredentials: true});
      console.log({response});
      if(response.data.user.id) {
        setUserInfo(response.data.user);
        if(response.data.user.profileSetup){
          navigate("/chat"); 
        }
        else{
          navigate("/profile");
        }
      }
    }
  };
  const handleSignup = async() => {
    if(validateSignup()){
      const response = await apiClient.post("/api/auth/signup", {email, password},{withCredentials: true});
      console.log(response.data.userData);
      if(response.status === 201){
        setUserInfo(response.data.user);
        toast.success("Signup successful.");
        navigate("/profile");
      }
    }
  };
 
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-pink-200">
      <div className="h-[80vh] text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 bg-cyan-100">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-bold md:text-3xl ">Welcome Yapper!</h1>
            <img src={Victory} alt="Victory" className="h-[50px]"></img>
          </div>
          <p className="text-1xl font-weight:500 text-center">Fill in the details to get started & yap non-stop!</p>
        </div>
        <div className="flex items-center justify-center w-full">
          <Tabs className="w-3/4" defaultValue='login'>
            <TabsList className="bg-transparent rounded-none w-full">
              <TabsTrigger 
                value="login"
                className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 ">
                Login</TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 ">
                Signup</TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-col gap-5 mt-10" value="login">
              <Input 
              placeholder="Email" 
              type="email" 
              className="rounded-full p-6" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}>
             </Input>
              <Input 
                placeholder="Password" 
                type="password" 
                className="rounded-full p-6" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}>
              </Input>
              <Button className="rounded-full w-full p-6" onClick={handleLogin}>Login</Button>
            </TabsContent>
            
            <TabsContent className="flex flex-col gap-5 " value="signup"> 
              <Input 
              placeholder="Email" 
              type="email" 
              className="rounded-full p-6" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}>
            </Input>
            <Input 
              placeholder="Password" 
              type="password" 
              className="rounded-full p-6" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}>
            </Input>
            <Input 
              placeholder="Confirm Password" 
              type="password" 
              className="rounded-full p-6" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}>
            </Input>
            <Button className="rounded-full w-full p-6 " onClick={handleSignup}>Signup</Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
       <div className="flex items-center justify-center">
          <img src={Background} alt="background login" className="h-[400px] w-[400px] object-contain" />
        </div>
    </div>
  )
};

export default Auth