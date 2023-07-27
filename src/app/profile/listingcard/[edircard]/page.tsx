"use client"
import React, { useState,useEffect } from "react";
import axios from"axios"
import { useRouter } from "next/navigation";




interface CardType {
    id: string;
    number: number;
    expiry: Date;
    name: string;
    cvv: number;
}

function EditPaymentCard({params}: any) {
    const router =useRouter();
 
    const [formData, setFormData] = useState({
        number: '',
        expiry: '',
        name: '',
        cvv: ''
    })

    console.log(params,"id",formData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const  id =params?.edircard
                const response = await axios.post("/api/paymentCard/getcardbyid",{cardId:id});
                console.log("update success", response.data);
                setFormData(response.data?.data);
            } catch (error) {
                console.log("updated failed", error);
                // You can handle the error here, for example, display an error message
                // toast.error(error.message);
            }
        };

        fetchData();
    }, []);




    const inputHandler = (event: any) => {
        setFormData((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value, // Use square brackets for dynamic property assignment
            };
        });
    };

    const onSubmit = async() => {
      
        try {
            const response = await axios.post("/api/paymentCard/updatebyid", formData);
            console.log("add success", response.data);
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
            <div className="bacground-img">
                <form className="payment-container">
                    <div className="container-card-form">
                        <div className=" pull-center">
                            <div className="col-md-4">
                                <h1 className="title1">Edit Credit Card Details</h1>
                                <div className="row-fluid">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label>Credit Card Number </label>
                                            <input defaultValue={formData?.number} onChange={(e) => inputHandler(e)} type="text" name="number" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Expiration</label>
                                            <input  defaultValue={formData?.expiry} onChange={(e) => inputHandler(e)} type="text" placeholder="MM/YY" name="expiry" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row-fluid">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input  defaultValue={formData?.name} onChange={(e) => inputHandler(e)} type="text" name="name" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">

                                            <label>CVV </label>

                                            <input  defaultValue={formData?.cvv} onChange={(e) => inputHandler(e)} type="text" name="cvv" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row ">

                                    <div className="col-md-12 text-right">
                                        <button type="button" onClick={onSubmit} className="btn btn-success">Submit</button>
                                        <button type="button" className="btn btn-info">Clear</button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>



                </form>

            </div>
        </>
    )
}

export default EditPaymentCard;