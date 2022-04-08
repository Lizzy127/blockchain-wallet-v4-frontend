type ArgumentsType<HOOK> = HOOK extends (...args: infer ARGS) => any ? ARGS : never

export type MockConfig<HOOK> = {
  [key: string]: HOOK
}

export type HookMock<HOOK extends (...args: any) => any = (...args: any) => any> = jest.Mock<
  ReturnType<HOOK>,
  ArgumentsType<HOOK>
>
