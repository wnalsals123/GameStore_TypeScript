import { useRef } from 'react';

/* 페이지 이동 시 스크롤 이동 */
function useMoveScrool() {
  const element = useRef<null | HTMLDivElement>(null);
  const onMoveToElement = () => {
    element.current?.scrollIntoView();
  };
  return [element, onMoveToElement];
}

export default useMoveScrool;