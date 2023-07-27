// Assuming you have properly set up the Mongoose connection and the paymentCardModel

import { Connect } from "@/dbConfig/dbConfig";
import paymentCardModel from "@/models/paymentCardModel";
import { NextRequest, NextResponse } from "next/server";

Connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { number, _id, expiry, name, cvv } = reqBody;

    console.log(reqBody);

    // Define the update to be applied to the document
    const update = {
      number,
      expiry,
      name,
      cvv,
    };

    // Use findOneAndUpdate with the query and the update
    const updatedUser = await paymentCardModel.findOneAndUpdate(
      { _id }, // The query to find the document to update
      update, // The update to apply
      { new: true } // To get the updated document in the result
    );

    console.log(updatedUser);

    return NextResponse.json({
      message: "User updated successfully",
      success: true,
      updatedUser, // Corrected to use updatedUser instead of savedUser
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}






