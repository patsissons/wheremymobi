import {ReactNode, useContext, useLayoutEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {GoogleMapContext} from '@googlemap-react/core';
import {useGoogleNamespace} from 'utils/google';

interface Props {
  bindingPosition: keyof typeof google.maps.ControlPosition;
  children?: ReactNode;
  onMounted?(container: HTMLDivElement): void;
}

export function CustomControl({
  bindingPosition = 'RIGHT_TOP',
  children,
  onMounted = onContainerMounted,
}: Props) {
  const {state} = useContext(GoogleMapContext);
  const [mounted, setMounted] = useState(false);
  const [container] = useState(document.createElement('div'));
  const [google] = useGoogleNamespace();
  useLayoutEffect(() => {
    if (state && state.map && !mounted) {
      state.map.controls[google.maps.ControlPosition[bindingPosition]].push(
        container,
      );

      onMounted(container);

      setMounted(true);
    }
  }, [
    bindingPosition,
    container,
    google.maps.ControlPosition,
    mounted,
    onMounted,
    state,
    state.map,
  ]);

  return typeof document === 'undefined'
    ? null
    : ReactDOM.createPortal(children, container);
}

export function onContainerMounted(container: HTMLDivElement) {
  container.style.margin = '10px 10px 23px';
}
