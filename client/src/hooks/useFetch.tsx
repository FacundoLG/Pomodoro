import { useEffect, useState } from "react"


interface FetchProps {
    url: string
    method: string
    body?: BodyInit
    headers?: HeadersInit
}

const useFetch = (props:FetchProps) => {
  const [data,setData] = useState<any | null>(null)
  const [loading,setLoading] = useState<boolean>(false)
  const [error,setError] = useState(null)
  const Clean = () => {
      setData(null)
      setLoading(false)
      setError(null)
  }
  const Exec = (params:{body?: BodyInit, headers?: HeadersInit,method?: string ,callback?: () => void}) => {
      const {body,headers,method,callback} = params
      setLoading(true)
      fetch(props.url,{
          method: method || props.method,
          body: body || props.body,
          headers: headers || props.headers,

      }).then((res:Response) => res.json())
      .then(res => {
          setData(res)
      }).catch((err) => {
          setError(err)    
      }).finally(() => {
          setLoading(false)
          callback && callback()
      })
  }
  return {data,loading,error,Exec,Clean}
}

export default useFetch