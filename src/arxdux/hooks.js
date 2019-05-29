import { useContext } from 'react';
import { ArxduxContext } from './context';

export const useDispatch = () => useContext(ArxduxContext).dispatch;
