import { useEffect, useState } from "react"


interface FetchProps {
    url: string
    method: string
    body?: Object
    headers?: Object
}

const useFetch = (props:FetchProps) => {
  const [data,setData] = useState<any | null>(null)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  const Exec = () => {
      setLoading(true)
      fetch(props.url,{
          method: props.method
      }).then((res:Response) => {
          setData(res)
      }).catch((err) => {
          setError(err)    
      }).finally(() => {
          setLoading(false)
      })
  }
  useEffect(() => {
    Exec()
  })
  return {data,loading,error}
}

export default useFetch