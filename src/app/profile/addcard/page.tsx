"use client"
import React, { useState } from "react";
import axios from"axios"
import { useRouter } from "next/navigation";

import toast, { Toaster } from 'react-hot-toast';

function AddPaymentCard() {
    const ToastContainer = () => <Toaster />;
    const router =useRouter();
    const [formData, setFormData] = useState({
        number: 0,
        expiry: '',
        name: '',
        cvv: 0
    })

    const inputHandler = (event: any) => {
        setFormData((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value, // Use square brackets for dynamic property assignment
            };
        });
    };

    const onSubmit = async() => {
        console.log(formData, "formData")
        try {
            const response = await axios.post("/api/paymentCard/addcard", formData);
            toast.success('Payment card added successfuly');
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
           <ToastContainer />
           <div className="bacground-img">
                <form className="payment-container">
                    <div className="container-card-form">
                        <div className=" pull-center">
                            <div className="col-md-4">
                                <h1 className="title1">Add Credit Card Details</h1>
                                <div className="row-fluid">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label>Credit Card Number </label>
                                            <input onChange={(e) => inputHandler(e)} type="text" name="number" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Expiration</label>
                                            <input onChange={(e) => inputHandler(e)} type="text" placeholder="MM/YY" name="expiry" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row-fluid">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input onChange={(e) => inputHandler(e)} type="text" name="name" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">

                                            <label>CVV </label>

                                            <input onChange={(e) => inputHandler(e)} type="text" name="cvv" className="form-control" />
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

export default AddPaymentCard