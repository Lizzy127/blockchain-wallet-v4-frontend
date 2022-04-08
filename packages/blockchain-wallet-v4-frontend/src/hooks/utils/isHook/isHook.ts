export const isHook = <T extends unknown = unknown>(hook: T | Function): hook is Function => {
  return hook instanceof Function
}
