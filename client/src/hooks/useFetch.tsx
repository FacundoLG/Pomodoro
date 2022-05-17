import { useEffect, useState } from "react"


interface FetchProps {
    url: string
    method: string
    body?: BodyInit
    headers?: HeadersInit
}

const useFetch = (props:FetchProps) => {
  const [data,setData] = useState<any | null>(null)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const Exec = (params:{body?: BodyInit, headers?: HeadersInit}) => {
      const {body,headers} = params
      setLoading(true)
      fetch(props.url,{
          method: props.method,
          body: body || props.body,
          headers: headers || props.headers,

      }).then((res:Response) => res.json())
      .then(res => {
          setData(res)
      }).catch((err) => {
          setError(err)    
      }).finally(() => {
          setLoading(false)
      })
  }
  return {data,loading,error,Exec}
}

export default useFetch