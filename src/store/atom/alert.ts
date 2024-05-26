import {atom} from "recoil";

export const alertAtom = atom({
  key: 'alertAtom',
  default: {
    isShow: false,
    content: ''
  }
})
