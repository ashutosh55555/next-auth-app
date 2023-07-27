"use client"
import React, { useState, useEffect } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';


interface CardType {
    id: string;
    number: number;
    expiry: Date;
    name: string;
    cvv: number;
}

export default function ListingCard() {
  
    const [cardList, setCardList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router =useRouter();

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/paymentCard/getcard");
            console.log("add success", response.data);
            setCardList(response.data?.data);
        } catch (error) {
            console.log("add failed", error);
            // You can handle the error here, for example, display an error message
            // toast.error(error.message);
        } finally {
            setIsLoading(false); // Set loading state to false, regardless of success or failure
        }
    };
    useEffect(() => {

        fetchData();
    }, []);

    console.log(cardList, "cardList");


    const editHandler = async (data: any) => {
        router.push(`/profile/listingcard/${data?._id}`);
    }

    const deleteHandler = async (data: any) => {
        
        const cardId= data?._id;
         
        try {
            toast('Here is your toast.')
            const response = await axios.post("/api/paymentCard/deletebyid/",{cardId});
            console.log("add success", response.data);
            fetchData()
             router.push("/profile/listingcard");
            
        } catch (error:any) {
            console.log("add failed", error.message);
            
            // toast.error(error.message);
        }finally {
            // setLoading(false);
        }

    }


    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="bacground-img">
                    <div className="payment-container-listing">
                        <div className="container-card-form">
                            <h1 className="title1">Listing Credit Card Details</h1>
                            <div className="container">
                                <h1>Estimates between the years 1950 and 1980 (in thousands)</h1>
                                <div className="table-wrapper">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sr.No</th>
                                                <th>Card number</th>
                                                <th>expiry</th>
                                                <th>Holder name</th>
                                                <th>cvv</th>
                                                <th style={{ width: "30%" }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cardList?.map((ele, i) =>
                                            (<tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{ele?.number}</td>
                                                <td>{ele?.expiry}</td>
                                                <td>{ele?.name}</td>
                                                <td>{ele?.cvv}</td>
                                                <td>
                                                    <button type="button" onClick={() => {
                                                        editHandler(ele)
                                                    }} className="bg-blue-500 hover:bg-blue-600 mx-2 text-white font-bold py-2 px-4 rounded">edit</button>
                                                    <button onClick={() => {
                                                        deleteHandler(ele)
                                                    }}  type="button" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">delete</button>
                                                </td>
                                            </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <p className="table-credits">
                                    Table info by{" "}
                                    <a
                                        href="https://en.wikipedia.org/wiki/List_of_countries_by_past_and_projected_future_population"
                                        target="_blank"
                                    >
                                        Wikipedia
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}