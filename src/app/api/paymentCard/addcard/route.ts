import {Connect} from "@/dbConfig/dbConfig";
import paymentCardModel from "@/models/paymentCardModel";
import { NextRequest, NextResponse } from "next/server";


Connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {  number, expiry,name,cvv} = reqBody

        console.log(reqBody);

        const newUser = new paymentCardModel({
            number, expiry,name,cvv
        })

        const savedUser = await newUser.save()
        console.log(savedUser);


        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
      } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}