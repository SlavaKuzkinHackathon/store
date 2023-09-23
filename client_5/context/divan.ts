import { createDomain } from 'effector-next'
import { IDivan } from '../types/divans'

const divan = createDomain()

export const setDivan = divan.createEvent<IDivan>()

export const $divan = divan
  .createStore<IDivan>({} as IDivan)
  .on(setDivan, (_, divan) => divan)