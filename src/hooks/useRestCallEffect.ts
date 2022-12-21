import { useEffect, useRef } from 'react'

const useRestCallEffect = (func: any, dep: any, unmounth?: any) => {
  const isFirst = useRef(false)

  useEffect(() => {
    if (!isFirst.current) {
      isFirst.current = true
      return
    }

    func()

    return () => {
      unmounth && unmounth()
    }
  }, dep)
}

export default useRestCallEffect
