interface IProps {
  visble: boolean,
  children: React.ReactNode
}

/* 드롭다운 메뉴 */
const Dropdown = (props: IProps) => {
  const { visble, children } = props

  return (
    <div>
      {visble && children}
    </div>
  )
};

export default Dropdown;