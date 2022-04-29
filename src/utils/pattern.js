export function singleton(fn) {
    let instance = null
    return function() {
      if(instance) {
        return instance
      }else{
        instance = fn.apply(this,arguments)
        return instance
      }
    }
  }