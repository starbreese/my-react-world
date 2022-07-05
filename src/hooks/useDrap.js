import { useRef, useMemo, useLayoutEffect, useState } from 'react'
/* 移动端 -> 拖拽自定义效果(不使用定位) */
var sUserAgent = navigator.userAgent.toLowerCase()
const ifMobile = (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent))
function useDrapDrop() {
  /* 保存上次移动位置 */
  const lastOffset = useRef({
    x: 0, /* 当前x 值 */
    y: 0, /* 当前y 值 */
    X: 0, /* 上一次保存X值 */
    Y: 0 /* 上一次保存Y值 */
  })
  
  /* 获取当前的元素实例 */
  const currentDom = useRef(null)
  /* 更新位置 */
  const [, foceUpdate] = useState({})
  /* 监听开始/移动事件 */
  const [ontouchstart, ontouchmove, ontouchend] = useMemo(() => {
    /* 保存left right信息 */
    const currentOffset = {}
    /* 开始滑动 */
    const touchstart = function(e) {
      const targetT = ifMobile ? e.targetTouches[0] : e
      currentOffset.X = targetT.clientX
      currentOffset.Y = targetT.clientY
      if (!ifMobile) {
        document.addEventListener('mousemove', touchmove, false)
        document.addEventListener('mouseup', touchend, false)
      }
    }
    /* 滑动中 */
    const touchmove = function(e) {
      const targetT = ifMobile ? e.targetTouches[0] : e
      const x = lastOffset.current.X + targetT.clientX - currentOffset.X
      const y = lastOffset.current.Y + targetT.clientY - currentOffset.Y
      lastOffset.current.x = x
      lastOffset.current.y = y
      foceUpdate({
        x, y
      })
    }
    /* 监听滑动停止事件 */
    const touchend = () => {
      lastOffset.current.X = lastOffset.current.x
      lastOffset.current.Y = lastOffset.current.y
      if (!ifMobile) {
        document.removeEventListener('mousemove', touchmove, false)
        document.removeEventListener('mouseup', touchend, false)
      }
    }
    return [touchstart, touchmove, touchend]
  }, [])
  useLayoutEffect(() => {
    const dom = currentDom.current
    if (ifMobile) {
      dom.ontouchstart = ontouchstart
      dom.ontouchmove = ontouchmove
      dom.ontouchend = ontouchend
    } else {
      dom.onmousedown = ontouchstart
    }
  }, [ontouchend, ontouchmove, ontouchstart])
  return [{ x: lastOffset.current.x, y: lastOffset.current.y }, currentDom]
}

export default useDrapDrop
