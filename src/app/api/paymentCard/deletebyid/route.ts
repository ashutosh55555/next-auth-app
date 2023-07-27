// Assuming correct import paths for dbConfig and paymentCardModel
import { Connect } from "@/dbConfig/dbConfig";
import paymentCardModel from "@/models/paymentCardModel";
import { NextRequest, NextResponse } from "next/server";

// Make sure to call the Connect function to establish a database connection
Connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { cardId } = reqBody;

    // Use findOneAndDelete to find and delete the card
    const card = await paymentCardModel.findOneAndDelete({ _id: cardId });

    if (!card) {
      return NextResponse.json({ message: 'Payment card not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Payment card successfully deleted',
      data: card,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}