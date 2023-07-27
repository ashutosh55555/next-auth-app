import {Connect} from "@/dbConfig/dbConfig";
import paymentCardModel from "@/models/paymentCardModel";
import { NextRequest, NextResponse } from "next/server";


Connect()


  
  export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { cardId} = reqBody
  
      const card = await paymentCardModel.findById(cardId);
  
      if (!card) {
        return NextResponse.json({ message: 'Payment card not found' }, { status: 404 });
      }
  
      return NextResponse.json({
        message: 'Fetch one payment card',
        data: card,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }