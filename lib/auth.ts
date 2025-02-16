// sabse important file hai credentialsProviser ki.

import  {NextAuthOptions}  from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcryprt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                 email:{label:"Email", type:"text"},
                 password:{label:"Password", type:"Password"}
            },
           async authorize(credentials){
          
            if(!credentials?.email || !credentials?.password){
                throw new Error ("Missing email or Password");
            }

            try {
                await connectToDatabase()
                const user = await User.findOne({email:credentials.email})

                if(!user){
                    throw new Error ("User not found");
                }

             const isValid = await bcryprt.compare(
                    credentials.password,
                    user.password
                )
           
            if(!isValid){
                throw new Error("Invalid Password");
            }

            return{
                id: user._id.toString(),
                email: user.email
            }
            }  catch (error) {
                throw error
            }
            

           }
        })
    ],

     // callbacks ke andar JWT aur  Session karna hi hota hain.
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.id = user.id
            }
            return token
        },
// yeah toh  ******* important hai aur yeh toh karn hi karna hai.
        async session({session, token}){

            if(session.user){
                session.user.id = token.id as string    // is line ka matlab hai ki session me ek object bana douser aur usme token ki id daal do.
            }

            return session
           


        }
    },
    // pages banate hain isme signin aur signout hote hain.
    pages:{
        signIn:"/login",
        error:"/login"
    },
    session:{
        strategy: "jwt",
        maxAge: 30 * 24 * 60 *60 // 30 days ka session.
    },
    secret:process.env.NEXTAUTH_SECRET
};