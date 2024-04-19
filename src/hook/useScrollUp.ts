import { useEffect, useState } from 'react'

const useScrollUp = () => {
  const [scrollUp, setScrollUp] = useState(false)

  useEffect(() => {
    ;(function () {
      const throttle = function (type: string, name: string, obj?: any) {
        obj = obj || window
        let running = false
        const func = function () {
          if (running) {
            return
          }
          running = true
          obj.requestAnimationFrame(function () {
            obj.dispatchEvent(new CustomEvent(name))
            running = false
          })
        }
        obj.addEventListener(type, func)
      }

      throttle('scroll', 'optimizedScroll')
    })()

    let offSet = 0
    window.addEventListener('optimizedScroll', function () {
      if (offSet < window.scrollY || window.scrollY === 0) {
        setScrollUp(true)
        offSet = window.scrollY
        return
      }

      if (offSet > window.scrollY) {
        setScrollUp(false)
        offSet = window.scrollY
        return
      }
    })

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      window.removeEventListener('optimizedScroll', function () {})
    }
  }, [])

  return { scrollUp }
}

export default useScrollUp
