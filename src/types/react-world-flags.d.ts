declare module 'react-world-flags' {
  interface FlagProps {
    code: string | undefined
    height?: number | string
    width?: number | string
    className?: string
    style?: React.CSSProperties
  }

  const Flag: React.FC<FlagProps>
  export default Flag
}
