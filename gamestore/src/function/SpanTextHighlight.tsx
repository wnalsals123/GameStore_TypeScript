interface IProps {
  className?: string,
  str: string,
  highlightText: string,
  highlightColor: string
}

/* 글자색 강조 */
const SpanTextHighlight = (props: IProps) => {
  const { className, str, highlightText, highlightColor } = props
  const strSplite = str.split(highlightText)

  return(
    <div className={className}>
     <span>{strSplite[0]}</span>
     <span className={highlightColor}>{highlightText}</span>
     <span>{strSplite[1]}</span>
    </div>
  )
}

export default SpanTextHighlight