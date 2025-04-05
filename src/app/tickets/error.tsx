"use client"

import Placeholder from "@/components/placeholder"

function Error({error}: {error: Error}) {

  return (
    <div><Placeholder label={error.message || "Something went wrong!"}/></div>
  )
}

export default Error