import React, {createRef} from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createRef<NavigationContainerRef>()

export interface Parameters {
  name: string,
  params: any
}

export function navigate({name, params} : Parameters) {
  navigationRef.current?.navigate(name, params);
}
