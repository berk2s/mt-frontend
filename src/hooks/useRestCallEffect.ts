import { useEffect, useRef } from 'react'

const useRestCallEffect = (func: any, dep: any) => {
  const isFirst = useRef(false)

  useEffect(() => {
    if (!isFirst.current) {
      isFirst.current = true
      return
    }

    func()
  }, dep)
}

export default useRestCallEffect
