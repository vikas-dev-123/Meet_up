import  { DefaultSession } from "next-auth"   // yeah wali file me auth.ts ke types han inko krna important hai
declare module "next-auth"{

// Yahan par hamne Session naam ka interface create kiya hai jisme hamne Defult Sesssion ko user ko diya hua hai! 

interface Session {
    user:{
        id: string
    } & DefaultSession["user"]
}

}