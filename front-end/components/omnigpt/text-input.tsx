"use client"
import * as React from "react"

export interface ITextInputProps {
  setTextInput: React.Dispatch<React.SetStateAction<string>>
}

export default function TextInput(props: ITextInputProps) {
  const { setTextInput } = props

  const handleInput = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value)
  }, [])

  return (
    <textarea
      className="textarea border-2  rounded-lg textarea-bordered
      text-black w-full mx-4  text-lg bg-[#EFF4FF]
      "
      onChange={handleInput}
    ></textarea>
  )
}
