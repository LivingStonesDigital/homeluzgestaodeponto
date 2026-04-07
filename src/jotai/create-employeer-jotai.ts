import {atom, useAtom} from 'jotai'

export const employeeAtomModal = atom({
  isOpen: false,
  employeeId: null as string | null,
})