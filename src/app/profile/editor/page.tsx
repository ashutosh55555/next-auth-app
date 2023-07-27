"use client"
import React, { useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';



export default function Editor() {
    const [text, setText] = useState('# Hello Editor');

    console.log(text,"text")
    return (<MdEditor   language="en-US" theme='dark' modelValue={text} onChange={setText} />)

}
