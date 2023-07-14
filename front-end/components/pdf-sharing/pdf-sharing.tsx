"use client"
import React, { useEffect, useRef, useState } from "react"
import "./pdf-sharing.css"
import Response from "../omnigpt/response"
import OutputBox from "./output-box"

const PdfShare = ({ prompt, setResponse }: any) => {
  const divRef = useRef(null)
  const fileInputRef = useRef(null)
  const textInputRef = useRef(null)
  const [textValue, setTextValue] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [outputText, setOutputText] = useState("")

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleFileInputChange = async event => {
    // const files = event.target.files
    // setSelectedFile(files[0]) // Store the selected file
    // console.log(files)

    const formData = new FormData()
    //@ts-ignore
    formData.append("file", fileInputRef.current!.files![0])

    console.log("before")

    const res = await fetch("http://localhost:3000/api/v1/ocr", {
      method: "POST",
      body: formData,
    })

    console.log("after")
    const prompt = await res.text()
    setResponse(prompt)
    setOutputText(prompt)
    console.log(prompt)
  }

  const handleGenerateResults = async () => {
    if (selectedFile) {
      // Use the selected file here for generating results
      console.log(selectedFile)
      console.log(textValue)
    } else {
      console.log("No file selected")
    }

    const res = await fetch(`http://localhost:3000/api/v1/resourceWithImage?prompt=${prompt}`)
    const { pdf } = await res.json()

    const link = document.createElement("a")
    link.innerHTML = "Your download link is ready!"
    link.href = pdf

    //@ts-ignore
    divRef.current?.appendChild(link)
  }

  const handleTextChange = () => {
    setTextValue(textInputRef.current.value)
  }

  return (
    <>
    <div ref={divRef} className="flex flex-row items-center">
      <button className="btn btn-custom mx-4" onClick={handleButtonClick}>
        <img src="./button-image.png" className="h-6 w-6" />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
      <button className="btn btn-cust1" onClick={handleGenerateResults}>
        Generate PDF
      </button>
    </div>
        {/* outputText && <div className="alert alert-success">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>Your purchase has been confirmed!</span>
</div> */}
    </>
    
  )
}

export default PdfShare
