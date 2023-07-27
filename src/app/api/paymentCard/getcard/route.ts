import {Connect} from "@/dbConfig/dbConfig";
import paymentCardModel from "@/models/paymentCardModel";
import { NextResponse } from "next/server";


Connect()

export async function GET(){

    try {
        const cards = await paymentCardModel.find();
        return NextResponse.json({
            mesaaage: "Fetch all payment card",
            data: cards
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}