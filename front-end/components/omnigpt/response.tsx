"use client"
import * as React from "react"

export interface IResponseProps {
  responseType: "text" | "speech" | null
  respose: string | null
  output: "text" | "speech"
  setOutput: React.Dispatch<React.SetStateAction<"text" | "speech">>
  setResponse: React.Dispatch<React.SetStateAction<string | null>>
  setResponseType: React.Dispatch<React.SetStateAction<"text" | "speech" | null>>
}

export default function Response(props: IResponseProps) {
  const { respose, output, responseType } = props
  return (
    <div className=" flex justify-evenly rounded-lg text-black w-full m-4 p-6 bg-[#EFF4FF] ">
      {responseType === null ? (
        <>
          <button
            className="btn"
            style={{
              backgroundColor: output === "text" ? "black" : "#444444",
            }}
            onClick={() => props.setOutput("text")}
          >
            Text
          </button>
          <button
            className="btn"
            style={{
              backgroundColor: output === "speech" ? "black" : "#444444",
            }}
            onClick={() => props.setOutput("speech")}
          >
            Audio
          </button>
        </>
      ) : responseType === "text" ? (
        <div className="text-lg">{respose}</div>
      ) : (
        <audio controls autoPlay src={respose ?? ""} />
      )}
      <button
        className="btn btn-error"
        onClick={() => {
          props.setResponse(null)
          props.setResponseType(null)
        }}
      >
        Clear
      </button>
    </div>
  )
}
